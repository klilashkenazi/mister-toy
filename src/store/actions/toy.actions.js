import { toyService } from "../../services/toy.service.js";
import { ADD_TOY, ADD_TOY_MSG, REMOVE_TOY, SET_TOYS, UPDATE_TOY } from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export async function loadToys() {
    const { filterBy } = store.getState().toyModule
    try {
        const toys = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys: toys })
        return toys
    } catch (err) {
        console.log('toy action -> Cannot load toys', err)
        throw err
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId: toyId })
    } catch (err) {
        console.log('toy action -> Cannot remove toy', err)
        throw err
    }
}


export async function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    try {
        const toy = await toyService.save(toy)
        store.dispatch({ type, toy })
        return toy
    } catch (err) {
        console.log('toy action -> Cannot save toy', err)
        throw err
    }
}

export async function addToyMsg(toyId, txt) {
    try {
        const msg = await toyService.addToyMsg(toyId, txt)
        store.dispatch({ type: ADD_TOY_MSG, toyId, msg })

    } catch (err) {
        console.log('toy action -> Cannot add toy message', err)
        throw err
    }
}