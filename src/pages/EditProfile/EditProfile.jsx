import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './EditProfile.scss'
import Footer from '../../components/Footer/footer.jsx'
import Menu from '../../components/Menu/Menu.jsx'
import NavBar from '../../components/NavBar/navbar.jsx'

/*check console log for form values*/
const EditProfile = () => {
  return (
    <div className="main">
      <NavBar />
      <div className="content-container">
        <h2> Welcome, userName!</h2>
        <div className="item">
        <span> Personal Information </span>
        </div>
      </div>
      <Footer />
    </div>
  )

}

export default EditProfile;