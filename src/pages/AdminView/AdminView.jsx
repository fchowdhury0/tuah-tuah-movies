import React, { useEffect, useState } from 'react';
import './AdminView.scss'
import ManageMovies from './ManageMovies.jsx'
import Footer from '../../components/Footer/footer.jsx'
import Menu from '../../components/Menu/Menu.jsx'
import NavBar from '../../components/NavBar/navbar.jsx'

/*check console log for form values*/
const AdminView = () => {
  return (
    <div style={{justifyContent:"center"}}className="admin-view"> 
    <span> Welcome, Admin!</span>
    </div>
  )

}

export default AdminView;
