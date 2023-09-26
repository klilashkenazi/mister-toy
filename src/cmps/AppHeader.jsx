import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function AppHeader() {
    const navigate= useNavigate()
    const dispatch = useDispatch()



    return (
        <header className="app-header">
            {/* <img src='https://i.pinimg.com/originals/67/ee/a4/67eea4a373464dff0960c1ba26e20036.png'/> */}
            <img src='https://theonlinetoyshop.co.uk/cdn/shop/files/Copy_of_Red_blue_illustration_Kids_Toys_logo_NO_BACKGROUNF.png?v=1667935317'
            onClick={()=>{navigate("/toy")}}/>
            {/* <h1>Mister Toy</h1> */}
            <nav className='nav-links'>
                {/* <NavLink to="/">Home</NavLink>  */}
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About us</NavLink>

            </nav>
        </header>
    )
}

