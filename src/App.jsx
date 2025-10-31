import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CalendarView from './pages/CalendarView';
import AddEvent from './pages/AddEvent';
import './App.css';

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path='/' element={<CalendarView />} />
          <Route path='/add-event' element={<AddEvent />} />
        </Routes>
      </main>
    </>
  )
}
