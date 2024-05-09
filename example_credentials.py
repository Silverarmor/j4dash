# Calendar links

# Timetable
timetable_links = {
    ### NOTE THE ORDER OF NAMES IN DICT MUST STAY THE SAME! ###
    # Must USE _ UNDERSCORES, NO SPACES
    "Name1": "",
    "Name_Two": "",
    "Name_Three": "",
    "Name_Four": "",
}

initials = {
    "AB": "Name1",
    "CD": "Name_Two",
    "EFG": "Name_Three",
    "H": "Name_Four"
}

# Ensure to fill out /static/js/colour_data.js with the same initials.

# This calendar will be split by events starting wtih initials.
combined_cal = ""

personal_cals = {
    "Link": "Name1",
    "Link": "Name_Two",
}

quote_url = "https://zenquotes.io/api/today"


# Set a testing date if you want the calendar to render a different date.
# NOTE this doesn't affect date display/percentage etc.
testing_date = False
# testing_date = (2024,2,29)
