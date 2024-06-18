"""
parse_calendar.py

This file is responsible for parsing the calendar data from the icalendar
format to a json format.

"""
import icalendar
import recurring_ical_events
from datetime import timedelta

import requests
import json

import credentials
import helper


def download_calendar(url):
    """
    Downloads a calendar from the specified URL
    Args: url (str): The URL of the calendar to download.
    returns icalendar.Calendar object
    """
    cal = icalendar.Calendar.from_ical(requests.get(url).text)

    return cal


def get_events_today(cal) -> list:
    """
    Retrieves a list of events happening today from the given calendar.

    Args:
        cal (Calendar): The calendar object to retrieve events from.

    Returns:
        list: A list of events happening today.
    """

    check_date = helper.decide_day_check()

    events_today = recurring_ical_events.of(cal).at(check_date)

    if credentials.testing_date is not None:
        events_today = recurring_ical_events.of(
            cal).at(credentials.testing_date)
    return events_today


def boundary_checks(event):
    """
    Perform boundary checks on the given event.

    Args:
        event (dict): The event to be checked.

    Returns:
        tuple: A tuple containing the modified event and a boolean indicating
        if the event is valid.
    """

    valid = True
    if hasattr(event['DTSTART'].dt, 'hour'):

        # continue if event starts before 8am and stops before 8am
        if event['DTSTART'].dt.hour < 8 and event['DTEND'].dt.hour <= 8:
            valid = False

        # continue if event starts after 9pm and stops after 9pm
        if event['DTSTART'].dt.hour >= 21 and event['DTEND'].dt.hour >= 21:
            valid = False

        # if event ends after the start date
        # set end to start date then set time to 9pm
        # NOTE this means multiday events w/ times only work on day 1
        if event['DTEND'].dt.day > event['DTSTART'].dt.day:
            event['DTEND'].dt = event['DTEND'].dt.replace(
                day=event['DTSTART'].dt.day)
            event['DTEND'].dt = event['DTEND'].dt.replace(
                hour=21, minute=0, second=0)

        # Set event end to 9pm if later
        if event['DTEND'].dt.hour >= 21 and event['DTEND'].dt.minute > 0:
            event['DTEND'].dt = event['DTEND'].dt.replace(
                hour=21, minute=0, second=0)

        # If event starts before 8am but stops after 8:30am, set start to 8am
        if event['DTSTART'].dt.hour < 8 and event['DTEND'].dt.hour >= 9:
            event['DTSTART'].dt = event['DTSTART'].dt.replace(
                hour=8, minute=0, second=0)

    return event, valid


def check_empty(json_data):
    """
    If a user has no events, append a "No events" event to their list
    """

    today = helper.getDateToday()

    for user in json_data:
        if len(user["events"]) == 0:
            user["events"].append({
                "name": "No events",
                "start": str(today),
                "end": str(today+timedelta(1)),
                "location": "",
                "description": "",
                "duration": "1 day, 0:00:00"
            })

    return json_data


def determine_user_index(user: str) -> int:
    match user:
        case "Jayden":
            user_index = 0
        case "Joshua_T":
            user_index = 1
        case "Jacob":
            user_index = 2
        case "Joshua_AC":
            user_index = 3
        case "Everyone":  # default
            user_index = 4
        case _:  # Case of error/doesnt match
            user_index = 4

    return user_index


def parse_single_timetable_calendar(url: str) -> str:
    """
    Parse users' timetable calendar into json format
    This creates the 4 user jsons for the calendar,
    preparing for further data to be added
    """
    cal = download_calendar(url)

    events_today = get_events_today(cal)

    # Initialise empty json string
    json_user_list = []

    for event in events_today:
        # print(event)

        # print(event['SUMMARY'])
        # print(event['DTSTART'].dt)
        # print(event['DTEND'].dt)

        # if 'LOCATION' in event:
        #     print(event['LOCATION'])

        # if 'DESCRIPTION' in event:
        #     print(event['DESCRIPTION'])

        # Run boundary checks for events during the day
        event, valid = boundary_checks(event)

        # If event is invalid, i.e. out of bounds, skip to next event
        if not valid:
            continue

        # Clean event summary by removing any text after a colon if present
        # note we keep 1 word after the colon
        if ":" in event['SUMMARY']:
            event['SUMMARY'] = event['SUMMARY'].split(
                ':')[0] + ': ' + event['SUMMARY'].split(':')[1].split()[0]

        # Calculate duration of event
        duration = event['DTEND'].dt - event['DTSTART'].dt

        # prepare json data
        event_data = {
            "name": str(event['SUMMARY']),
            "start": str(event['DTSTART'].dt),
            "end": str(event['DTEND'].dt),
            "location": str(event['LOCATION']) if 'LOCATION' in event else "",
            "description": str(event['DESCRIPTION']) if 'DESCRIPTION' in event
            else "",
            "duration": str(duration)
        }

        json_user_list.append(event_data)

    return json_user_list


def parse_combined_calendar(url: str, json_data: list) -> list:
    """
    Parses a combined calendar by downloading the calendar from the given URL,
    extracting today's events, applying boundary checks, and organizing the
    events based on the person associated with each event.

    Args:
        url (str): The URL of the calendar to download.
        json_data (list): The JSON data containing the parsed events.

    Returns:
        list: The updated JSON data with the parsed events.
    """

    cal = download_calendar(url)

    events_today = get_events_today(cal)

    # Loop through today's events
    for event in events_today:
        # print(event['SUMMARY'])

        # Verify valid event, and apply boundaries
        event, valid = boundary_checks(event)

        # If event is invalid, i.e. out of bounds, skip to next event
        if not valid:
            continue

        # Strip leading and trailing whitespace
        event['SUMMARY'] = event['SUMMARY'].strip()

        # * Determine whose event this is

        user_index_list = []

        # Process initials
        while True:

            # Default
            user = "Everyone"

            # Loop through initials dictionary, checking start of event summary
            for inits in credentials.initials:
                if event['SUMMARY'].startswith(inits):
                    # Identify the user, then append this to the index list.
                    user = credentials.initials[inits]

                    # Remove those initials from event summary
                    event['SUMMARY'] = event['SUMMARY'][len(inits):].strip()

                    break

            # Update list with user index
            user_index_list.append(determine_user_index(user))

            # Check if multiperson event
            if event['SUMMARY'].startswith("&"):
                # Remove "&" from event summary
                event['SUMMARY'] = event['SUMMARY'][1:].strip()
                # reruns the loop
            else:
                # No more initials to process
                break

        # Calculate duration of event
        duration = event['DTEND'].dt - event['DTSTART'].dt

        # print(user_index_list)

        # Loop through user indexes for event
        for user_index in user_index_list:

            # Clean event summary, where format is JK - EVENT or JK: EVENT
            if user_index != 4:
                # if dash present, remove text before it. Note split once only
                if "-" in event['SUMMARY']:
                    event['SUMMARY'] = event['SUMMARY'].split('-', 1)[1]
                elif ":" in event['SUMMARY']:
                    event['SUMMARY'] = event['SUMMARY'].split(':', 1)[1]

                # Strip leading and trailing whitespace
                event['SUMMARY'] = event['SUMMARY'].strip()

            # prepare json data
            event_data = {
                "name": str(event['SUMMARY']),
                "start": str(event['DTSTART'].dt),
                "end": str(event['DTEND'].dt),
                "location": str(event['LOCATION']) if 'LOCATION' in event
                else "",
                "description": str(event['DESCRIPTION']) if 'DESCRIPTION' in
                event else "",
                "duration": str(duration)
            }

            # Attempt to update JSON data

            # Check if user is "Everyone"
            if user_index == 4:
                user = "Everyone"

                # Check for EVERYONE events. If event summary contains "[ALL]"
                if "[ALL]" in event_data["name"]:
                    # [ALL] is removed in JS.

                    # Place into everyone's calendar
                    for user_data in json_data:
                        user_data["events"].append(event_data)

                    continue
                    # Skips rest of the loop

                else:
                    try:
                        json_data[4]
                    except IndexError:
                        # If "everyone" 5th element doesn't exist, create it
                        json_data.append({"user": "Everyone", "events": []})

            else:
                # If not everyone, get user from user index
                user = list(credentials.initials.values())[user_index]

            # Append event to json data
            # print(user)
            for user_data in json_data:
                if user_data["user"] == user:
                    user_data["events"].append(event_data)

    # Return updated json data.
    return json_data


def parse_personal_calendars(json_data: list) -> list:
    """
    Parse personal calendars into json format
    """

    for url in credentials.personal_cals:
        cal = download_calendar(url)

        events_today = get_events_today(cal)

        # Loop through today's events
        for event in events_today:

            # Verify valid event, and apply boundaries
            event, valid = boundary_checks(event)

            # If event is invalid, i.e. out of bounds, skip to next event
            if not valid:
                continue

            # Calculate duration of event
            duration = event['DTEND'].dt - event['DTSTART'].dt

            # Determine whose event this is
            user = credentials.personal_cals[url]

            # Check for EVERYONE events. If event summary ends in "EVERYONE"
            # then set user to everyone
            if event['SUMMARY'].endswith("EVERYONE"):
                user = "Everyone"

                # Remove "- EVERYONE" from end of event summary
                # and remove leading/trailing whitespace
                event['SUMMARY'] = event['SUMMARY'].replace(
                    "- EVERYONE", "").strip()

                # If "everyone" element doesn't exist, create it
                try:
                    json_data[4]
                except IndexError:
                    json_data.append({"user": "Everyone", "events": []})

            # prepare json data
            event_data = {
                "name": str(event['SUMMARY']),
                "start": str(event['DTSTART'].dt),
                "end": str(event['DTEND'].dt),
                "location": str(event['LOCATION']) if 'LOCATION' in event
                else "",
                "description": str(event['DESCRIPTION']) if 'DESCRIPTION' in
                event else "",
                "duration": str(duration)
            }

            # Append event to json data
            for user_data in json_data:
                if user_data["user"] == user:
                    user_data["events"].append(event_data)

    return json_data


def parse_all_calendars():
    """
    Iterate through all calendars available in credentials.py
    and parse them into json format
    Example format in example.json
    """
    # init
    json_data = []

    # loop through url dictionary for timetables
    for name in credentials.timetable_links:

        # Construct each json
        user_json_data = {
            "user": name,
            "events": parse_single_timetable_calendar(
                credentials.timetable_links[name])
        }

        # Append to json list
        json_data.append(user_json_data)

    # loop through additional calendars.

    # Parse combined calendar and update json_data
    json_data = parse_combined_calendar(credentials.combined_cal, json_data)

    # Parse personal calendars and update json_data
    json_data = parse_personal_calendars(json_data)

    # Check if events are empty
    json_data = check_empty(json_data)

    # Create into json format
    json_data = json.dumps(json_data)

    # print(json_data)

    return json_data


# Only run if this file is run directly
if __name__ == '__main__':
    parse_all_calendars()
