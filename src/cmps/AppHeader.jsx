import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'


import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export function AppHeader() {

    const dispatch = useDispatch()



    return (
        <header className="app-header">
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                {/* <NavLink to="/about">About</NavLink> | */}
            
            </nav>
            <h1>Mister Toy</h1>
        </header>
    )
}

