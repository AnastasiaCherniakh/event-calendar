import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DayCell from '../components/DayCell';

export default function CalendarView( { events }) {

    // Initialize the user's current date
    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());

    // Convert Date to String
    const convertToString = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // if less than 2 digits append 0
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Create a mapping from date string to events on that date
    const eventMap = useMemo(() => {
        const map = {};
        for (const event of events) {
            const date = event.date;
            if(!map[date]){
                map[date] = [];
            }
            map[date].push(event);
        }
        return map;
    }, [events]);

    // Build the calendar grid (42 cells) for the current display month
    const monthCells = useMemo(() => {
        const firstDayMonth = new Date(currentYear, currentMonth, 1);
        const firstDayStart = firstDayMonth.getDay();

        const totalCells = 42;
        const cells = [];

        //  Determine the date that should appear in the first cell (may belong to previous month)
        const firstCellDate = new Date(firstDayMonth);
        firstCellDate.setDate(firstDayMonth.getDate() - firstDayStart);

        for (let i = 0; i < totalCells; i++) {
            const cellDate = new Date(firstCellDate);
            cellDate.setDate(firstCellDate.getDate() + i);

            const thisMonth = cellDate.getMonth() === currentMonth; // check if the cell belongs to the current month
            cells.push({
                date: cellDate,
                y_m_d: convertToString(cellDate),
                thisMonth
            });
        }
        return cells;
    }, [currentYear, currentMonth]);

    // Label of the current month
    const monthLabel = new Date(currentYear, currentMonth, 1).toLocaleString(undefined, {
        month: 'long',
        year: 'numeric'
    });

    // Weekday Header
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const navigate = useNavigate();

    // Navigate to previous month
    const navPrevMonth = () => {
        if(currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(year => year - 1)
        }else {
            setCurrentMonth(month => month - 1)
        }
    }

    // Navigate to next month
    const navNextMonth = () => {
        if(currentMonth === 11){
            setCurrentMonth(0);
            setCurrentYear(year => year + 1)
        }else {
            setCurrentMonth(month => month + 1)
        }
    }


    return (
        <section className="calendar">
             <div className="calendar-header">
                <button className="navigation-btn" onClick={navPrevMonth} aria-label='Previous Month'>◁</button>
                <h2 className="month-label">{monthLabel}</h2>
                <button className="navigation-btn" onClick={navNextMonth} aria-label='Next Month'>▷</button>
            </div>
            <div className="calendar-grid">
                {/* Weekday Header */}
                {weekdays.map((day) => (
                    <div className="weekday" key={day}>{day}</div>
                ))}
                
                {/* Day Cells */}
                {monthCells.map((cell) => {
                    const eventsForDay = eventMap[cell.y_m_d] || [];
                    const eventsCount = eventsForDay.length;
                    return (
                        <DayCell
                        key={cell.y_m_d}
                        date={cell.date}
                        y_m_d={cell.y_m_d}
                        thisMonth={cell.thisMonth}
                        eventsCount={eventsCount}
                        eventsForDay={eventsForDay}
                        onClick={() => navigate(`/event/${cell.y_m_d}`)}
                        />
                    );
                })}
            </div>
        </section>
    )
}