from datetime import datetime
import requests
import credentials

def getDate() -> str:
# get date in format Monday, 3rd January 2023
    day_of_week = datetime.now().strftime("%A")

    # https://stackoverflow.com/questions/3644417/python-format-datetime-with-st-nd-rd-th-english-ordinal-suffix-like
    def get_ordinal_suffix(day: int) -> str:
        return {1: 'st', 2: 'nd', 3: 'rd'}.get(day % 10, 'th') if day not in (11, 12, 13) else 'th'
    
    day = int(datetime.now().strftime("%d"))
    ordinal_suffix = get_ordinal_suffix(day)

    month_year = datetime.now().strftime("%B %Y")

    date = f"{day_of_week}, {day}{ordinal_suffix} {month_year}"

    return date

def getQuote() -> tuple[str, str]:
    # Get quote
    response = requests.get(credentials.quote_url)
    data = response.json()
    print(data)
    quote = data[0]["q"]
    author = data[0]["a"]

    return quote, author