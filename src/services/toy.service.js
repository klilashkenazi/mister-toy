
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

const STORAGE_KEY = 'toyDB'
_createToys()
export const toyService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    getEmptyToy
}

function query(filterBy = {}) {

    return storageService.query(STORAGE_KEY)
        .then(toysToReturn => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toysToReturn = toysToReturn.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.price) {
                toysToReturn = toysToReturn.filter(toy => +toy.price <= filterBy.price)
            }

            if (filterBy.inStock) {
                toysToReturn = toysToReturn.filter(toy => toy.inStock)
            }
            if (filterBy.label){
                toysToReturn=toysToReturn.filter(toy=>toy.labels.includes(filterBy.label))
            }
            return toysToReturn
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    // return Promise.reject('Oh no!')
    return storageService.remove(STORAGE_KEY, toyId)
}
function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}


function getDefaultFilter() {
    return { txt: '', price: 0 , inStock:false, label:''}
}
function getEmptyToy() {
    return {
        name: 'toy',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: Date.now(),
        inStock: true,
    }
}
function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            {
                _id: 't101',
                name: 'Talking Doll',
                price: 123,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true,
            }
        ]

    }
    utilService.saveToStorage(STORAGE_KEY, toys)
}
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


