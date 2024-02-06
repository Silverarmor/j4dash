from flask import Flask, render_template
from datetime import datetime
import parse_calendar


##* WEB APP ##
app = Flask(__name__)
# app.config.from_object('config')


@app.route("/")
def home():
    # get date in format Monday, 3rd January 2023
    day_of_week = datetime.now().strftime("%A")

    # https://stackoverflow.com/questions/3644417/python-format-datetime-with-st-nd-rd-th-english-ordinal-suffix-like
    def get_ordinal_suffix(day: int) -> str:
        return {1: 'st', 2: 'nd', 3: 'rd'}.get(day % 10, 'th') if day not in (11, 12, 13) else 'th'
    
    day = int(datetime.now().strftime("%d"))
    ordinal_suffix = get_ordinal_suffix(day)

    month_year = datetime.now().strftime("%B %Y")

    date = f"{day_of_week}, {day}{ordinal_suffix} {month_year}"





    return render_template("index.html", date=date)

@app.route("/more")
def more():
    return render_template("more.html")

@app.route("/api/cal")
def cal():
    # return parse_calendar.parse_all_calendars()
    #! TESTING LINE
    import json
    with open("dash/example.json") as file:
        data = json.load(file)
    return data


if __name__ == "__main__":
    app.run(debug=True)