from flask import Flask, render_template
import parse_calendar
import helper


##* WEB APP ##
app = Flask(__name__)
# app.config.from_object('config')


@app.route("/")
def home():
    date = helper.getDateReadable()

    quote, author = helper.getQuote()

    return render_template("index.html", date=date, quote=quote, author=author)

@app.route("/more")
def more():
    return render_template("more.html")

@app.route("/api/cal")
def cal():
    return parse_calendar.parse_all_calendars()

    #! TESTING LINE
    import json
    with open("example.json") as file:
        data = json.load(file)
    return data


# Run as flask app (locally only) for testing.
# Production level runs gunicorn (WSGI server)
if __name__ == "__main__":
    app.run(debug=True)