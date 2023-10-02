
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { addToyMsg } from "../store/actions/toy.actions.js"
import { ToyMsgsList } from "../cmps/ToyMsgsList.jsx"
import { ToyReviews } from "../cmps/ToyReviews.jsx"
import { addReview, loadReviews } from "../store/actions/review.actions.js"
import { useSelector } from "react-redux"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [msgToEdit, setMsgToEdit] = useState('')
    const [reviewToEdit, setReviewToEdit] = useState({ txt: '' })
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedinUser)
    // const [filterBy, setFilterBt] = useState({})

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
        loadReviews({aboutToyId: toyId})

    }, [toyId, msgToEdit])

    // useEffect(() => {
    //     let filterBy
    //     if (toy) filterBy = { aboutToyId: toy._id }
    //     else filterBy = { byUserId: loggedInUser._id }
    //     // loadUsers()

    // }, [loggedInUser])
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
    function handleReviewChange(ev) {
        const { name, value } = ev.target
        setReviewToEdit({ ...reviewToEdit, [name]: value })
    }

    async function onAddReview(ev) {
        ev.preventDefault()
        if (!reviewToEdit.txt || !reviewToEdit.aboutToyId) return alert('All fields are required')
        try {

            await addReview(reviewToEdit)
            showSuccessMsg('Review added')
            setReviewToEdit({ txt: '', aboutToyId: toy._id })
        } catch (err) {
            showErrorMsg('Cannot add review')
        }
    }
    if (!toy ) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Name: {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <Link to="/toy">Back</Link>
            <form className="add-msg">
                <label htmlFor="add-msg">Add a message:</label>
                <textarea type="text" id="add-msg" onChange={handleChange} value={msgToEdit}></textarea>
                <button className="btn" onClick={onAddMsg}>Publish</button>
            </form>
            <ToyMsgsList toy={toy} />
            <ToyReviews toy={toy} />
            {loggedInUser &&
                <form onSubmit={onAddReview}>
                    <textarea
                        name="txt"
                        onChange={handleReviewChange}
                        value={reviewToEdit.txt}
                    ></textarea>
                    <button>Add</button>
                </form>}
        </section>
    )
}