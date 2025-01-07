import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (<>
        <div>Dashboard</div>
        <Link to={'/'}>Sign in</Link>
        <Link to={'/signup'}>Sign up</Link>
    </>
    )
}

export default Dashboard