from datetime import datetime, date, timedelta
import pytz
import requests
import credentials

# Set timezone for all datetime.now() requests
tz = pytz.timezone('Pacific/Auckland')


def get_ordinal_suffix(day: int) -> str:
    """
    Returns the ordinal suffix for a given day.

    Parameters:
    day (int): The day for which the ordinal suffix is needed.

    Returns:
    str: The ordinal suffix for the given day.
    """
    if 11 <= day <= 13:
        return 'th'
    else:
        return {1: 'st', 2: 'nd', 3: 'rd'}.get(day % 10, 'th')


def getDateReadable() -> str:
    """
    Get the current date in the format Monday, 3rd January 2023.

    Returns:
        str: The formatted date string.
    """
    day_of_week = datetime.now(tz).strftime("%A")

    day = int(datetime.now(tz).strftime("%d"))
    ordinal_suffix = get_ordinal_suffix(day)

    month_year = datetime.now(tz).strftime("%B %Y")

    date = f"{day_of_week}, {day}{ordinal_suffix} {month_year}"

    return date


def getDateToday() -> date:
    """
    Get the current date. in correct timezone.
    Format as a datetime.date object.

    Returns:
        date: The current date.
    """
    return datetime.now(tz).date()


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


def decide_day_check() -> date:
    """
    Helper function that decides what date to check for events.
    """

    # Get today's date
    check_date = datetime.now(tz).date()

    # If past 8pm, check tomorrow's events
    if datetime.now(tz).hour >= 20:
        check_date += timedelta(1)
    return check_date
