import React, { useState } from 'react'
import Button from './Button'

import './FileUpload.css'

function FileUpload({children, handleDrop, formHeading, handleInputChange, handleInputFileClick}) {

    const [boxStyle, setBoxStyle] = useState({})    

    function handleDragOver(e){
        e.preventDefault()
        e.stopPropagation()
        setBoxStyle({backgroundColor: '#b3b3b3'})
    }

    function handleDragLeave(e){
        e.preventDefault()
        e.stopPropagation()
        setBoxStyle({backgroundColor: '#e8e8e8'})
    }

    return (
        <div className='file-upload-container'>
            <h1>{formHeading}</h1>
            <div className='dragzone' style={boxStyle}>
                <div className='inner' onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>     
                        <span className="material-icons-outlined" style={{fontSize: '100px', fontWeight: 'light', marginBottom: '20px'}}>file_upload</span>
                        <div>
                            <input id='inputfile' accept='image/*' type="file" multiple="false" name="file" onChange={handleInputChange} />
                            <span><Button className="btn-upload" type="button" onClick={handleInputFileClick}>Choose a file</Button> or drag it here</span>
                        </div>
                </div>
            </div>
            <div className='preview'>
                {children}
            </div>
        </div>
    )
}

export default FileUpload