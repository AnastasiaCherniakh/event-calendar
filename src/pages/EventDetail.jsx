import { useParams, useNavigate } from 'react-router-dom';
import './eventDetail.css';

export default function EventDetail( { events } ){
    const { date } = useParams();
    const navigate = useNavigate();

    // Filter all events for this date
    const eventsForDate = events.filter(event => event.date === date);

    // Convert an ISO date-time string into the user's local time format
    const toLocalTime = (isoString) => {
        return new Date(isoString).toLocaleString();
    }

     // Display teams for an event
    const displayTeams = (homeTeam, awayTeam) => {
        return (
            <div className="teams">
                <span className="team-home">{homeTeam}</span>
                <span className="vs">vs</span>
                <span className="team-away">{awayTeam}</span>
            </div>
        )
    }

    // If there are no events
    if(eventsForDate.length === 0){
        return (
            <section className='event-detail'>
                <button className="go-back-btn" onClick={() => navigate(-1)}>← Go back</button>
                <p className="no-events">No events for this day</p>
            </section>
        );
    }

    // If single event
    if(eventsForDate.length === 1){
        const event = eventsForDate[0];
        return (
            <section className="event-detail">
                <button className="go-back-btn" onClick={() => navigate(-1)}>← Go back</button>

                <article className="single-event">
                    <h2 className="event-title">{event.sport}</h2>
                    <div className="event-info">
                        <p><span className="label">Stage: </span>{event.stage || "N/A"}</p>
                        <p><span className="label">Date: </span>{event.date}</p>
                        <p><span className="label">Time (UTC): </span>{event.time}</p>
                        <p><span className="label">Time (Local): </span>{toLocalTime(event.dateTimeISO)}</p>
                        <p><span className="label">Status: </span>{event.status}</p>

                        {displayTeams(event.homeTeam, event.awayTeam)}
                    </div>
                </article>
            </section>
        )
    }

    // If multiple events
    return (
        <section className="event-detail">
            <button className="go-back-btn" onClick={() => navigate(-1)}>← Go back</button>

            <h2 className="multiple-event-title">Events on {date}</h2>
            <div className="event-list">
                {eventsForDate.map((event) => (
                    <article key={event.id} className="multiple-event">
                        <h3 className="event-title">{event.sport}</h3>
                        <p><span className="label">Stage: </span>{event.stage || "N/A"}</p>
                        <p><span className="label">Time (UTC): </span>{event.time}</p>
                        <p><span className="label">Time (Local): </span>{toLocalTime(event.dateTimeISO)}</p>
                        <p><span className="label">Status: </span>{event.status}</p>

                        {displayTeams(event.homeTeam, event.awayTeam)}
                    </article>
                ))}
            </div>
        </section>
    )
}