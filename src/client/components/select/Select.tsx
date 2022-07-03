import React from 'react'
import './select.scss'

export const Select = ({
    options,
    emitChange,
}: {
    options: any[]
    emitChange: any
}) => {
    const handleChange = (evt: any) => {
        emitChange({
            id: evt.target.value,
        })
    }
    return (
        <div className={'custom-select'}>
            <select
                onChange={handleChange}
                name="cityDropdown"
                id="cityDropdown"
            >
                {options.map((option, index) => {
                    return (
                        <option key={index} value={option.id}>
                            {option.name}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}
