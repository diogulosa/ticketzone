import React from 'react'

import './AdminContent.css'

function AdminContent({children}) {

  return (
    <div className='admin-content'>{children}</div>
  )
}

export default AdminContent