import React, { useEffect } from 'react'
import Page from '../../components/layout/Page'

import AdminMenu from '../../components/layout/Dashboard/AdminMenu'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminContent from '../../components/layout/Dashboard/AdminContent'
import { useAuthState } from '../../store/auth'

function Dashboard() {

    const {userData} = useAuthState()
    const navigate = useNavigate()
    

    useEffect(() => {
        if(!userData.auth_token){
            navigate('/log-in')
        }
    }, [userData, navigate])
    

    return (
            <Page className='flex-container' headerSimple>
                <AdminMenu />
                <AdminContent>
                        <Outlet />
                </AdminContent>
            </Page>        
    )
}

export default Dashboard