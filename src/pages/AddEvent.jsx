import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addEvent.css'

export default function AddEvent({ addEvent }){
    const navigate = useNavigate();

    // For state
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [sport, setSport] = useState("");
    const [homeTeam, setHomeTeam] = useState("");
    const [awayTeam, setAwayTeam] = useState("");
    const [stage, setStage] = useState("");
    const [status, setStatus] = useState("scheduled");
    const [error, setError] = useState(null);

    // Generate a unique ID for each new event
    const generateId = () => {
        if(typeof crypto !== "undefined" && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    };

    // Ensure time always includes seconds
    const normalizeTimeToSeconds = (time) => {
        if(!time) return "";
        // if time is "HH:MM" append :00
        if(/^\d{2}:\d{2}$/.test(time)) return `${time}:00`;
        return time;
    };

    // Combine date and time into an ISO string
    const toDateTimeISO = (date, time) => {
        const normalizedTime = normalizeTimeToSeconds(time);
        if(!date || !normalizedTime) return null;
        return `${date}T${time}Z`;
    };

    // Validate form fields before submission
    const validate = () => {
        if (!date) return "Please enter a date!";
        if (!time) return "Please enter a time!";
        if (!homeTeam?.trim()) return "Please enter a home team!";
        if (!awayTeam?.trim()) return "Please enter an away team!"
        if(homeTeam?.trim() === awayTeam?.trim()) return "Home and away teams should be different!";
        return null;
    }

    // Handle submission
    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);

        const validateError = validate();
        if (validateError) {
            setError(validateError);
            return;
        }
    

        const id = generateId();
        const normalizedTime = normalizeTimeToSeconds(time);
        const dateTimeISO = toDateTimeISO(date, time);

        // Build new event object
        const newEvent = {
            id,
            date,
            time: normalizedTime,
            dateTimeISO,
            status: status || 'scheduled',
            homeTeam: homeTeam.trim() || "Not yet defined",
            awayTeam: awayTeam.trim() || "Not yet defined",
            stage: stage.trim() || '',
            sport: sport.trim() || "General"
        }

        addEvent(newEvent);

        navigate('/');
    }

    return (
        <section className='add-event'>
            <h2 className="page-title">Add event</h2>

            <form onSubmit={handleSubmit} className="add-event-form">
                {error && <div className='form-error' role='alert'>{error}</div>}

                <label className="form-row">
                    <span className='form-label'>Date</span>
                    <input type="date" className='input' value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required />
                </label>

                <label className="form-row">
                    <span className='form-label'>Time (UTC)</span>
                    <input type="time" className='input' value={time}
                    onChange={(event) => setTime(event.target.value)}
                    required />
                </label>

                <label className="form-row">
                    <span className='form-label'>Sport</span>
                    <input type="text" className='input' value={sport}
                    onChange={(event) => setSport(event.target.value)}
                    required />
                </label>

                <label className="form-row">
                    <span className='form-label'>Home Team</span>
                    <input type="text" className='input' value={homeTeam}
                    onChange={(event) => setHomeTeam(event.target.value)}
                    required />
                </label>

                <label className="form-row">
                    <span className='form-label'>Away Team</span>
                    <input type="text" className='input' value={awayTeam}
                    onChange={(event) => setAwayTeam(event.target.value)}
                    required />
                </label>

                <label className="form-row">
                    <span className='form-label'>Stage (optional)</span>
                    <input type="text" className='input' value={stage}
                    placeholder="e.g. Group Stage"
                    onChange={(event) => setStage(event.target.value)} />
                </label>

                <label className="form-row">
                    <span className='form-label'>Status</span>
                    <select className='input' value={status} onChange={(event) => setStatus(event.target.value)}>
                        <option value="scheduled">scheduled</option>
                        <option value="played">played</option>
                        <option value="cancelled">cancelled</option>
                    </select>
                </label>
                
                <div className="form-submit">
                    <button type='submit' className="submit-btn">Add Event</button>
                </div> 
            </form>
        </section>
    )
}