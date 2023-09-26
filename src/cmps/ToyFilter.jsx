
import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { LabelFilter } from "./LabelFilter.jsx"
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
        <section className="toy-filter">
            <h2>Filter</h2>
            <form >
                {/* <h4>Name</h4>
                <input type="text"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                /> */}
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        value={filterByToEdit.txt}
                        onChange={handleChange}
                        name="txt"
                    />
                    <TextField
                        id="outlined-number"
                        label="Price"
                        type="number"
                        value={filterByToEdit.price}
                        onChange={handleChange}
                        name="price"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />


                    {/* <h4>Price</h4>
                <input type="number"
                    name="price"
                    placeholder="By max price"
                    value={filterByToEdit.price}
                    onChange={handleChange}
                /> */}
                    <label className="in-stock" htmlFor="inStock">In stock:</label>
                    <input type="checkbox"
                        className="in-stock-input"
                        id="inStock"
                        name="inStock"
                        value={filterByToEdit.inStock}
                        onChange={handleChange} />


                    <LabelFilter labels={labels} setFilterByToEdit={setFilterByToEdit} />
                    {/* <label htmlFor="sort">Sort by:</label> */}
                    {/* <select id="sort"
                    name="sortBy"
                    value={filterByToEdit.sortBy}
                    onChange={handleChange}>
                    <option value="">Default</option>
                    <option value="price">Price</option>

                </select> */}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filterByToEdit.sortBy}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value="">Default</MenuItem>
                            <MenuItem value="price">Price</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </form>

        </section>
    )
}