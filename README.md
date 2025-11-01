# 🗓️ Event Calendar App

## Overview 
This is a simple event calendar web application built with React and Vite.
It allows users to view a calendar for the current month, check details for each event and add new events manually during runtime.
- **Calendar View:** Displays all days in a grid format for the current month. Days with events are clearly marked with a dot or a count to indicate the number of events.
- **Event Detail Page:** Clicking on the day with events opens a page showing all the relevant information such as date, time (UTC and local), sport, teams, stage and status.
- **Add Event Page:** Users can add events via a form. New events are added to the calendar immediately but exist only during the current session; there is no persistent storage.
- **Responsiveness:** The app is designed to work well on mobile, tablet and desktop devices.
- **Navigation** A simple navigation bar allows users to switch between the calendar and add event page.


## How to run the Application
To run the project locally (using **Vite**):
1. **Clone the repository**
```bash
git clone https://github.com/AnastasiaCherniakh/event-calendar
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```
4. Open the browser at the address shown in the terminal (usually http://localhost:5173/)

## Assumptions and Decisions
- The data is loaded from a local JSON file (events.json); no backend or database is used.
- Event's times are stored in UTC and converted to local time for display.
- For validation partly relies on browser validation (required attribute) and custom validation for logical errors (home and away teams must be different).
- Days with events are marked with a dot or count for clarity.
- New events added via the form exist only during runtime, they are not saved persistently.
- The project uses React Router for navigation and a modular component structure for clarity and maintainability.
- The app is designed with accessibility in mind (aria-labels, semantic HTML).

