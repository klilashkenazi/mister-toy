
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { addToyMsg } from "../store/actions/toy.actions.js"
import { ToyMsgsList } from "../cmps/ToyMsgsList.jsx"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [msgToEdit, setMsgToEdit] = useState('')
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId, msgToEdit])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }

    function handleChange({ target }) {
        let value = target.value
        setMsgToEdit(value)
    }
    async function onAddMsg(ev) {
        ev.preventDefault()
        try {
            await addToyMsg(toy._id, msgToEdit)
            setMsgToEdit('')
        } catch (err) {
            console.log('Cannot update toy msg', err)
            showErrorMsg('Cannot update toy msg')
        }
    }
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Name: {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <Link to="/toy">Back</Link>
            <form>
                <label htmlFor="add-msg">Add a message:</label>
                <textarea type="text" id="add-msg" onChange={handleChange} value={msgToEdit}></textarea>
                <button onClick={onAddMsg}>Publish</button>
            </form>
            <ToyMsgsList toy={toy} />
        </section>
    )
}