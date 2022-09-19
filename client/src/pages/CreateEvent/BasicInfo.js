import React, { useEffect, useState, useCallback } from 'react'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'

function BasicInfo({ onChangeTitle, titleValue, onChangeOrganizer, organizerValue, onChangeCategory, categoryValue, tagList = [], tagInputValue, addTag, removeTag, handleTagChange}) {

    const [categories, setCategories] = useState('')

    const getCategories = useCallback(
      async () => {
        let res = await fetch('/categories')
        let data = await res.json()
        if(data.success){
            setCategories(data.categories)
        }
      },
      [],
    )
    
    useEffect(() => {
        getCategories()
    }, [getCategories])
    

    return (
        <section className='form-section' id="basic-info">
                <h2 className='heading'>Basic Info</h2>
                <Input type="text" name="title" label="Event Title *" onChange={onChangeTitle} value={titleValue} required/>
                <Input type="text" label="Organizer *" name="organizer" onChange={onChangeOrganizer} value={organizerValue} required />
                <Select label="Category *" name="category" options={categories} onChange={onChangeCategory} value={categoryValue} required/>
                <h3>Tags</h3>
                <p>Add relevant tags and help potential attendees to find your event</p>
                <Input type="text" name="tags" id="tags" label="Press Enter to add tag" onKeyDown={addTag} onChange={handleTagChange} value={tagInputValue} />
                <ul className='tag-pills' style={tagList.length === 0 ? {visibility: 'hidden'} : {visibility: 'visible'}}>{tagList.length > 0 ? tagList.map((i, k) => <li key={k}><span className='text'>{i}</span> <span className="material-icons" onClick={removeTag} style={{fontSize: "inherit", fontWeight: '600'}}>close</span></li>) : <li></li>}</ul>
        </section>
    )
}

export default BasicInfo