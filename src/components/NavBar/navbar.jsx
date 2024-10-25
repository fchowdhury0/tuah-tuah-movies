import { Link } from 'react-router-dom';
import "./navbar.scss";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/admin/home" className="links">userName</Link>
      </div>
      <div className="links">
        <Link to="/editprofile" className="links">Edit Profile</Link>
      </div>
    </div>
  )
}

export default NavBar;