// import { useEffect } from "react"
import { useSelector } from "react-redux"
// import { loadReviews } from "../store/actions/review.actions"
import { Link } from "react-router-dom"

export function ToyReviews() {
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    console.log(reviews)
    if (!reviews) return
    return (
        <section>
            {reviews && <ul className="review-list">
                {reviews.map(review => (
                    <li key={review._id}>
                        <p >
                            About:
                            <Link to={`/toy/${review.aboutToy._id}`}>
                                {review.aboutToy.name}
                            </Link>
                        </p>
                        <h3>{review.txt}</h3>
                        <p >
                            By:
                            <Link to={`/user/${review.byUser._id}`}>
                                {review.byUser.fullname}
                            </Link>
                        </p>
                    </li>
                ))}
            </ul>}

        </section>
    )
}