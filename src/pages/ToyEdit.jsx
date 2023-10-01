import { toyService } from "../services/toy.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { LabelPicker } from "../cmps/LabelPicker.jsx"

export function ToyEdit() {

    const labels = useSelector(storeState => storeState.toyModule.labels)
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.toyId) loadToy()
    }, [])

    async function loadToy() {
        try {
            const toy = await toyService.getById(params.toyId)
            setToyToEdit(toy)
        } catch (err) {
            console.log('Had issues in toy edit', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }

    function handleChange({ target }) {
        let value = target.value
        const field = target.name
        if (target.type === 'checkbox') value = target.checked
        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    async function onSaveToy(ev) {
        ev.preventDefault()
        try {
            await saveToy(toyToEdit)
            navigate('/toy')
            setToyToEdit(toyService.getEmptyToy())
        } catch (err) {
            console.log('Cannot update toy', err)
            showErrorMsg('Cannot update toy')
        }

    }

    console.log(toyToEdit)
    const { name, price, labels: toyLabels, inStock } = toyToEdit

    return (
        <section className="toy-edit">
            {toyToEdit._id ? <h2> Edit Toy</h2> : <h2>Add Toy:</h2>}
            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name:</label>
                <input onChange={handleChange} type="text" name="name" value={name} id="name" />
                <label htmlFor="price">Price:</label>
                <input onChange={handleChange} type="text" name="price" value={price} id="price" />
                <label htmlFor="inStock">In stock:</label>
                <input type="checkbox" id="inStock" name="inStock" checked={inStock ? 'checked' : ''} onChange={handleChange} />
                <LabelPicker labels={labels} setToyToEdit={setToyToEdit} toyLabels={toyLabels} />
                {toyToEdit._id ? <button>Save</button> : <button>Add</button>}
            </form>
        </section>
    )
}