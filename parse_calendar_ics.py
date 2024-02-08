from ics import Calendar, Event
import requests

url = """https://calendar.google.com/calendar/ical/32a186606419cde3c5c431d091479763564787e374f940340711da9daede3a1c%40group.calendar.google.com/private-73e5c4c22ed6694cf9d11f0f53f121dd/basic.ics"""
# test calendar

def download_calendar():
    cal = Calendar(requests.get(url).text)

    return cal


def parse_calendar():
    cal = download_calendar()
    events = []

    for event in cal.events:
        events.append(event)

    # print(events)
    for item in events:
        if item.name == "CIVIL 203":
            print(item.begin)
            print(item.end)
            print(item)
            break


    # e = cal.timeline

    # print(type(e))
    # print(list(e.today)[0])

    # for event in cal.events:
    #     print(event.name)
    #     print(event.begin)
        # print(event.end)
        # print(event.description)
        # print(event.location)
        # break


parse_calendar()