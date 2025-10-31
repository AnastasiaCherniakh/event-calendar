import './dayCell.css';

export default function DayCell({
    date,
    y_m_d,
    thisMonth=true,
    eventsCount=0,
    eventsForDay=[],
    onClick=undefined,
    isToday=false
 }) {
    const dayNumber = date.getDate();
    const hasEvent = eventsCount > 0;

    // Human readable date label
   const humanLabel = date.toLocaleDateString(undefined, {
     weekday: "long",
     year: "numeric",
     month: "long",
     day: "numeric",
   });

   // Accessibility label for screen readers
   const ariaLabel = hasEvent ? `${humanLabel} — ${eventsCount || "1"} event${eventsCount > 1 ? "s" : ""}` : humanLabel;

   // Dynamic CSS classes
    const classes = [
        "day-cell",
        thisMonth ? 'in-month' : 'out-month',
        hasEvent ? 'has-event' : '',
        isToday ? "today" : "",
    ].join(' ').trim();

    return (
        <button type="button" 
        className={classes} 
        onClick={() => onClick && onClick(y_m_d, eventsForDay)}
        aria-label={ariaLabel}
        title={ariaLabel}
        >
            <div className="day-number">{dayNumber}</div>
            {eventsCount === 1 && <span className="event-dot" aria-hidden="true" />}

            {eventsCount > 1 && (
                <span className="event-count" aria-hidden="true">{eventsCount}</span>
                )}
        </button>
    )
}