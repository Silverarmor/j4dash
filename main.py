from flask import Flask, render_template
import parse_calendar
import parse_menu
import helper
import json


##* WEB APP ##
app = Flask(__name__)
# app.config.from_object('config')


@app.route("/")
def home():
    date = helper.getDateReadable()

    quote, author = helper.getQuote()

    return render_template("index.html", quote=quote, author=author)

@app.route("/api/date")
def date():
    return json.dumps({"date": helper.getDateReadable()})

@app.route("/api/cal")
def cal():
    return parse_calendar.parse_all_calendars()

    #! TESTING LINE
    with open("example.json") as file:
        data = json.load(file)
    return data

@app.route("/api/menu")
def menu():
    return parse_menu.main()

    #! TESTING LINE
    with open("examplemenu.json") as file:
        data = json.load(file)
    return data

@app.route("/api/quote")
def quote():
    quote, author = helper.getQuote()
    return json.dumps({"quote": quote, "author": author})


# Run as flask app (locally only) for testing.
# Production level runs gunicorn (WSGI server)
if __name__ == "__main__":
    app.run(debug=True)