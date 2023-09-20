import { Link } from "react-router-dom";

export function ToyPreview({ toy, onRemoveToy }) {
    return (
        <article>
            <h1>Name: {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <ul>Labels:
                {toy.labels.map(label =>
                    <li key={label}>{label}</li>)}
            </ul>
            {!toy.inStock && <h3>Out of stock</h3>}
            <button><Link to={`/toy/${toy._id}`}>Details</Link></button>
            <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
            <button> <Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
        </article>
    )
}