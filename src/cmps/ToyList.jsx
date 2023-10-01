import { ToyPreview } from "./ToyPreview"
export function ToyList({ toys, onRemoveToy, loggedinUser}) {

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} onRemoveToy={onRemoveToy} loggedinUser={loggedinUser}/>
                </li>
            )}
        </ul>
    )
}