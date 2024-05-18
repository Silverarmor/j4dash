# j4dash

Dashboard for the J^4 flat.
Runs on a flask python backend. No frameworks used - raw html, css, js.

![dashboard example image](./static/images/dashboard_example.png)

## Quickstart Guide

### Generate Credentials

Duplicate `example_credentials.py` and rename to `credentials.py`. Fill out fields as comments describe.

Ensure colour JavaScript file is also completed.

### Publish website on Google App Engine

Once setup, simply run `gcloud app deploy` in the root directory and the website will publish!

## Features

- Include `[ALL]` anywhere in an event (on combined calendar) to duplicate event to all calendars, with unique colour
- Include `[NA]` in any event to NOT render it on the dashboard. (i.e. skip), *N*OT *A*TTENDING
- Multiperson events are constructed with `AA & BB: event name`, `CC & DD & EE : Event`, using the ampersand operator. These events MUST use a dash or colon to separate initials from event name.

## Credit

- [@Excigma](https://github.com/Excigma) for constant support, rubber duckying, and JS & CSS mentoring.
- [Clean Start](https://cleanstart.page/) for inspiration
- My flatmates for putting up with this weird software running on a raspberry pi, always displaying on the screen! I'm not renowned for my aesthetic skills, but I've done my best so it's not an eyesore.
