import { Link } from "react-router-dom";

export function ToyPreview({ toy, onRemoveToy, loggedinUser }) {
    return (
        <article>
            <img src="https://www.munchkin.co.uk/media/catalog/product/cache/7f5eb207d77bc8d83eb75e53b96086ab/s/m/small_72_dpi_jpg-30028_143.jpg" alt="" />
            <h1>{toy.name}</h1>
            <h5>${toy.price}</h5>
            <ul>Labels:
                {toy.labels.map(label => <li key={label}>{label}</li>)}
            </ul>
            {!toy.inStock && <h4 className="out-of-stock">Out of stock</h4>}
            <div className="preview-btn">
                <button className="btn"><Link to={`/toy/${toy._id}`}>Details</Link></button>
                {loggedinUser?.isAdmin && <button className="btn" onClick={() => { onRemoveToy(toy._id) }}>x</button>}
                {loggedinUser?.isAdmin && <button className="btn"> <Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>}
            </div>
        </article>
    )
}