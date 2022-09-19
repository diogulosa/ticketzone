import React from 'react'
import { Link } from 'react-router-dom'
import './DataList.css'


function DataList({ inputValue, initialOptions=[], filteredOptions =[], onChangeInput, onClickOption, inputName, dataListId, onClickInput, onClickAll}) {    


    function showOptions(e){
        let el = document.getElementById(dataListId)
        el.style.display = 'block'
    }

    function hideOptions(e){
        let el = document.getElementById(dataListId)
        el.style.display = 'none'
    }

    return (
        <div className='data-list-control'>
            <div className='fe-element no-margin'>
            <label>by category:</label>
            <input className='input-list' onClick={onClickInput} value={inputValue} type="text" onChange={onChangeInput} name={inputName} id={inputName} onFocus={showOptions} />
            </div>
            <ul className='datalist' id={dataListId} onMouseLeave={hideOptions} onBlur={hideOptions}>
                <li><Link to="" onClick={onClickAll}>All</Link></li>
                {filteredOptions.length === 0 || !filteredOptions ? initialOptions.map((item, index) => <li key={index}><Link to={item._id}  onClick={onClickOption}>{item.name}</Link></li>) : filteredOptions.map((item, index) => <li key={index} ><Link to={item._id} onClick={onClickOption}>{item.name}</Link></li>)}
            </ul>
            
        </div>
        
    )
}

export default DataList