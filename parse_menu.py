"""
parse_menu.py

Gets menu from google sheet, parses into json format, and returns it to the API

"""

import gspread
import helper
from datetime import date
from credentials import *
import json





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

    # Get today's row
    row = values[row_index]

    chef = row[1]
    dinner = row[2]
    notes = row[3]
    people_info = row[4]
    shopping = row[5]

    person = ""

    # check who is cooking (ALL, JAC, JP, JT, JK)
    for inits in initials:
        if chef.startswith(inits):
            person = initials[inits]
            break
    
    # Create the json object
    menu = {
        "chef": person,
        "dinner": dinner,
        "notes": notes,
        "people_info": people_info,
        "shopping": shopping
    }

    print(menu)
    json_menu = json.dumps(menu)

    return json_menu





if __name__ == '__main__':
    main()
