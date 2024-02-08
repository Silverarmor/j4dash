from datetime import datetime, date, timedelta
import pytz
import requests
import credentials

# Set timezone for all datetime.now() requests
tz = pytz.timezone('Pacific/Auckland')

def getDate() -> str:
# get date in format Monday, 3rd January 2023
    day_of_week = datetime.now(tz).strftime("%A")

    # https://stackoverflow.com/questions/3644417/python-format-datetime-with-st-nd-rd-th-english-ordinal-suffix-like
    def get_ordinal_suffix(day: int) -> str:
        return {1: 'st', 2: 'nd', 3: 'rd'}.get(day % 10, 'th') if day not in (11, 12, 13) else 'th'
    
    day = int(datetime.now(tz).strftime("%d"))
    ordinal_suffix = get_ordinal_suffix(day)

    month_year = datetime.now(tz).strftime("%B %Y")

    date = f"{day_of_week}, {day}{ordinal_suffix} {month_year}"

    return date

def getQuote() -> tuple[str, str]:
    # Get quote
    response = requests.get(credentials.quote_url)
    data = response.json()
    # print(data)
    quote = data[0]["q"]
    author = data[0]["a"]

    return quote, author

def decide_day_check():
    # If past 8:30pm, check tomorrow's events
    if datetime.now(tz).hour >= 20 and datetime.now(tz).minute >= 30:
        check_date = date.today() + timedelta(1)
    else:
        check_date = date.today()

    return check_date
