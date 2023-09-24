
import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { LabelFilter } from "./LabelFilter.jsx"


export function ToyFilter({ filterBy, onSetFilter, labels }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)

    }, [filterByToEdit])

    function handleChange({ target }) {
        console.log(target.value)
        let value = target.value
        const field = target.name
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="price">Price:</label>
                <input type="number"
                    id="price"
                    name="price"
                    placeholder="By max price"
                    value={filterByToEdit.price}
                    onChange={handleChange}
                />
                <label htmlFor="inStock">In stock:</label>
                <input type="checkbox"
                    id="inStock"
                    name="inStock"
                    value={filterByToEdit.inStock}
                    onChange={handleChange} />

                {/* <label htmlFor="labels">Labels:</label>
                <select id="labels"
                    name="label"
                    value={filterByToEdit.label}
                    onChange={handleChange}>
                    <option value="">All</option>
                    {labels.map(label => {
                        return <option key={label} value={label}>{label}</option>
                    })}
                </select> */}
                <label htmlFor="sort">Sort by:</label>
                <select id="sort"
                    name="sortBy"
                    value={filterByToEdit.sortBy}
                    onChange={handleChange}>
                    <option value="">Default</option>
                    <option value="price">Price</option>

                </select>
                <LabelFilter labels={labels} setFilterByToEdit={setFilterByToEdit}/>
            </form>

        </section>
    )
}