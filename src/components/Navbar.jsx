import { NavLink } from "react-router-dom"

export default function Navbar() {
    return (
        <nav>
            <NavLink to='/' end>Calendar</NavLink>
            <NavLink to='/add-event'>Add Event</NavLink>
        </nav>
    )
}