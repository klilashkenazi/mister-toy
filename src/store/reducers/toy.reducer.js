import { toyService } from "../../services/toy.service"
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const ADD_TOY_MSG = 'ADD_TOY_MSG'

export const SET_FILTER_BY = 'SET_FILTER_BY'



const initialState = {
    toys: [],
    filterBy: toyService.getDefaultFilter(),
    labels: ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']
}

export function toyReducer(state = initialState, action = {}) {
    let toys
    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case REMOVE_TOY:
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys: toys }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys: toys }

        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys: toys }

        case ADD_TOY_MSG:
            toys = state.toys.map(toy => toy._id === action.toyId ? { ...toy, msgs: action.msg } : toy)
            return { ...state, toys: toys }


        case SET_FILTER_BY:
            return { ...state, filterBy: { ...action.filterBy } }

        default:
            return state;
    }
}