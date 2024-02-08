from datetime import datetime, date, timedelta
import pytz
import requests
import credentials

# Set timezone for all datetime.now() requests
tz = pytz.timezone('Pacific/Auckland')

def getDate() -> str:
    """
    Get the current date in the format Monday, 3rd January 2023.

    Returns:
        str: The formatted date string.
    """
    day_of_week = datetime.now(tz).strftime("%A")

    def get_ordinal_suffix(day: int) -> str:
        return {1: 'st', 2: 'nd', 3: 'rd'}.get(day % 10, 'th') if day not in (11, 12, 13) else 'th'

    day = int(datetime.now(tz).strftime("%d"))
    ordinal_suffix = get_ordinal_suffix(day)

    month_year = datetime.now(tz).strftime("%B %Y")

    date = f"{day_of_week}, {day}{ordinal_suffix} {month_year}"

    return date

def getQuote() -> tuple[str, str]:
    """
    Retrieves a random quote from an API.

    Returns:
        A tuple containing the quote and the author.
    """
    # Get quote
    response = requests.get(credentials.quote_url)
    data = response.json()
    quote = data[0]["q"]
    author = data[0]["a"]

    return quote, author

def decide_day_check():
    """
    Helper function that decides what date to check for events.
    """

    # If past 8:30pm, check tomorrow's events
    if datetime.now(tz).hour >= 20 and datetime.now(tz).minute >= 30:
        check_date = date.today() + timedelta(1)
    else:
        check_date = date.today()

    return check_date
