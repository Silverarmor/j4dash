"""
parse_calendar.py

This file is responsible for parsing the calendar data from the icalendar format to a json format.

"""


import icalendar
import recurring_ical_events
import requests
from datetime import date
import json
from credentials import *


def download_calendar(url):
    cal = icalendar.Calendar.from_ical(requests.get(url).text)
    
    return cal


def parse_singular_calendar(url: str) -> str:
    cal = download_calendar(url)

    # events = recurring_ical_events.of(cal).between(start_date, end_date)
    
    
    # events_today = recurring_ical_events.of(cal).at(date.today())
    #! TESTING LINE
    events_today = recurring_ical_events.of(cal).at((2024,2,29))

    # Initialise empty json string
    json_user_list = []

    for event in events_today:
        # print(event)

        print(event['SUMMARY'])
        print(event['DTSTART'].dt)
        print(event['DTEND'].dt)

        # if 'LOCATION' in event:
        #     print(event['LOCATION'])
        
        # if 'DESCRIPTION' in event:
        #     print(event['DESCRIPTION'])

        print("\n")
        
        duration = event['DTEND'].dt - event['DTSTART'].dt

        # prepare json data
        event_data = {
            "name": str(event['SUMMARY']),
            "start": str(event['DTSTART'].dt),
            "end": str(event['DTEND'].dt),
            "location": str(event['LOCATION']) if 'LOCATION' in event else "",
            "description": str(event['DESCRIPTION']) if 'DESCRIPTION' in event else "",
            "duration": str(duration)
        }

        json_user_list.append(event_data)

    
    return json_user_list

def parse_all_calendars():
    """
    Iterate through all calendars available in credentials.py and parse them into json format
    Example format in example.json
    """
    # init
    json_data = []

    # loop through url dictionary
    for name in calendar_links:
        # print(name)
        # print(calendar_links[name])

        # Construct each json
        user_json_data = {
            "user": name,
            "events": parse_singular_calendar(calendar_links[name])
        }

        # Append to json list
        json_data.append(user_json_data)

    # Create into json format
    json_data = json.dumps(json_data)
    
    print(json_data)

    return json_data


# parse_all_calendars()