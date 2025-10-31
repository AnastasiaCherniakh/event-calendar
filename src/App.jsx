import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CalendarView from './pages/CalendarView';
import AddEvent from './pages/AddEvent';
import './App.css';

export default function App() {
  const [events, setEvents] = useState([]);

  // Convert nested json into flat array of objects
  function simplifyData(rawData) {
    return rawData.map((event, index) => {
      return {
        id: index,
        date: event.dateVenue,
        time: event.timeVenueUTC,
        status: event.status,
        homeTeam: event.homeTeam?.name ?? "Not yet defined",
        awayTeam: event.awayTeam?.name ?? "Not yet defined",
        stage: event.stage?.name ?? "",
        sport: event.sport
      };
    });
  }

  // On component mount, fetch the events from JSON, simplify and store in state
  useEffect(() => {
    fetch('/events.json')
    .then(response => response.json())
    .then(rawData => {
      const simplified = simplifyData(rawData);
      setEvents(simplified);
    })
    .catch(err => console.log("Something went wrong! Failed to load the data.", err))
  }, []);
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path='/' element={<CalendarView events={events}/>} />
          <Route path='/add-event' element={<AddEvent />} />
        </Routes>
      </main>
    </>
  )
}
