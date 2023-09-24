import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadToys, removeToy, saveToy } from '../store/actions/toy.actions'
import { toyService } from '../services/toy.service'
import { ToyList } from '../cmps/ToyList'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { ToyFilter } from '../cmps/ToyFilter'
import { SET_FILTER_BY } from '../store/reducers/toy.reducer'

export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const labels=useSelector(storeState => storeState.toyModule.labels)
        useEffect(() => {
            loadToys()
                .catch(err => {
                    console.log('err:', err)
                    showErrorMsg('Cannot load toys')
                })
        }, [filterBy])


    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        saveToy(toyToSave)
            .then(savedToy => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                console.log('Cannot add toy', err)
                showErrorMsg('Cannot add toy')
            })
    }
    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    return (
        <div>
            <button onClick={onAddToy}>Add toy</button>
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} labels={labels}/>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
        </div>
    )
}