import React from 'react'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import FileUpload from '../../components/ui/FileUpload'

function Details({children, onChangeDescription, descValue, onChangeURL, valueURL, src, handleImageDrop, handleInputFileClick, handleInputChange}) {

  return (
    <section className='form-section'>
        <h2 className='heading'>Details</h2>
        <h3>Main image</h3>
        <p>This is the first image attendees will see at the top of your listing. Use a high quality image: 2000x1500px (4:3 ratio). JPEG or PNG, no larger than 10MB</p>
        <FileUpload 
          handleDrop={handleImageDrop} 
          handleInputFileClick={handleInputFileClick} 
          handleInputChange={handleInputChange} 
          >
            {children}
        </FileUpload>
        <h3>Description</h3>
        <p>Add more details to your event like your schedule, sponsors, or featured guests.</p>
        <Textarea name="description" label="Description" onChange={onChangeDescription} value={descValue} required />
        <Input type="url" label="Event URL" name="eventURL" onChange={onChangeURL} value={valueURL} />
    </section>
  )
}

export default Details