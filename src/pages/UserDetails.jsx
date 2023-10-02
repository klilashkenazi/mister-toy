import { useSelector } from "react-redux";
import { ToyReviews } from "../cmps/ToyReviews";
import { useEffect } from "react";
import { loadReviews } from "../store/actions/review.actions";
export function UserDetails() {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedinUser)
   console.log(loggedInUser)
    useEffect(() => {
        loadReviews({byUserId:loggedInUser._id})
        
    }, [])
    return (
        <ToyReviews />
    )
}