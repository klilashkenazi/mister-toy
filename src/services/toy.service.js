
// import { storageService } from './async-http.service.js'
// import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

// const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

// _createToys()
export const toyService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    getEmptyToy,
    addToyMsg
}

function query(filterBy = {}) {
    console.log(filterBy)
    return httpService.get(BASE_URL, filterBy)
        // .then(toysToReturn => {
        //     if (filterBy.txt) {
        //         const regExp = new RegExp(filterBy.txt, 'i')
        //         toysToReturn = toysToReturn.filter(toy => regExp.test(toy.name))
        //     }

        //     if (filterBy.price) {
        //         toysToReturn = toysToReturn.filter(toy => +toy.price <= filterBy.price)
        //     }

        //     if (filterBy.inStock) {
        //         toysToReturn = toysToReturn.filter(toy => toy.inStock)
        //     }
        //     if (filterBy.label){
        //         toysToReturn=toysToReturn.filter(toy=>toy.labels.includes(filterBy.label))
        //     }
        //     return toysToReturn
        // })
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}
function remove(toyId) {
    // return Promise.reject('Oh no!')
    return httpService.delete(BASE_URL + toyId)
}
function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function addToyMsg(toyId, txt){
    return httpService.post(BASE_URL + toyId +'/msg', {txt})
}

function getDefaultFilter() {
    return { txt: '', price: 0 , inStock:false, label:[], sortBy:''}
}
function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        // createdAt: Date.now(),
        inStock: true,
    }
}
// function _createToys() {
//     let toys = utilService.loadFromhttp(BASE_URL)
//     if (!toys || !toys.length) {
//         toys = [
//             {
//                 _id: 't101',
//                 name: 'Talking Doll',
//                 price: 123,
//                 labels: ['Doll', 'Battery Powered', 'Baby'],
//                 createdAt: 1631031801011,
//                 inStock: true,
//             }
//         ]

//     }
//     utilService.saveTohttp(BASE_URL, toys)
// }
// TEST DATA
// httpService.post(BASE_URL, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


