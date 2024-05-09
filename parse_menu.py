"""
parse_menu.py

Gets menu from google sheet, parses into json format, and returns it to the API

"""

import gspread
import helper
from datetime import date, timedelta
from credentials import *
import json



def determine_chef(chef) -> str:
    # check who is cooking (ALL, JAC, JP, JT, JK)

    decoded_chef = "N/A" #default

    for inits in initials:
        if chef.startswith(inits):
            decoded_chef = initials[inits]
            break
    
    return decoded_chef


def main():
    # Authenticate with google
    gc = gspread.service_account(filename="service_account.json")

    # Open the sheet
    sh = gc.open_by_url("https://docs.google.com/spreadsheets/d/1Zck-jr2AarnekU2aEVZ2758NqdLvZ_zzRvqmzR2s704/edit#gid=1048819164")

    worksheet = sh.worksheet("Meal Plan")

    values = worksheet.get_all_values()

    # Remove the header row
    values.pop(0)

    # Get today's date 
    today_date = helper.getDateToday()

    # Calculate days since 13 Feb 2024 as a timedelta object
    row_index = (today_date - date(2024, 2, 13)).days 

    # create json list
    menu = []

    # Loop through 3 days
    for i in range(3):
        # Get the day's row
        row = values[row_index]

        chef = row[1]
        dinner = row[2]
        notes = row[3]
        people_info = row[4]
        shopping = row[5]

        person = determine_chef(chef)

        # Create the json object
        day_data = {
            "date": today_date.strftime("%A %d"),
            "chef": person,
            "dinner": dinner,
            "notes": notes,
            "people_info": people_info,
            "shopping": shopping,
        }

        menu.append(day_data)

        row_index+=1
        today_date += timedelta(1)

    print(menu)
    json_menu = json.dumps(menu)

    return json_menu



if __name__ == '__main__':
    json_menu = main()
    print(json_menu)
