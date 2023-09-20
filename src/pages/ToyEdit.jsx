import { toyService } from "../services/toy.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { showErrorMsg ,showSuccessMsg} from "../services/event-bus.service.js"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(params.toyId)
            .then(setToyToEdit)
            .catch((err) => {
                console.log('Had issues in toy edit', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }
    function handleChange({ target }) {
        const value = target.value
        const field = target.name
        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
        .then(() => {
            navigate('/toy')
            setToyToEdit(toyService.getEmptyToy())
        })
            .catch(err => {
                console.log('Cannot update toy', err)
                showErrorMsg('Cannot update toy')
            })

    }


    const { name, price } = toyToEdit

    return (
        <section className="toy-edit">
            {toyToEdit._id ? <h2> Edit Toy</h2> : <h2>Add Toy:</h2>}
            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name:</label>
                <input onChange={handleChange} type="text" name="name" value={name} id="name" />
                <label htmlFor="price">Price:</label>
                <input onChange={handleChange} type="text" name="price" value={price} id="price" />

                {toyToEdit._id ? <button>Save</button> : <button>Add</button>}
            </form>
        </section>
    )
}