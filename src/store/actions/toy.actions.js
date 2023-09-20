import { toyService } from "../../services/toy.service.js";
import { ADD_TOY, REMOVE_TOY, SET_TOYS, UPDATE_TOY } from "../reducers/toy.reducer.js";
import { store } from "../store.js";
export function loadToys() {
    const { filterBy } = store.getState().toyModule

    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys: toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId: toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}


export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(toyToSave => {
            store.dispatch({ type, toy: toyToSave })
            return toyToSave
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}