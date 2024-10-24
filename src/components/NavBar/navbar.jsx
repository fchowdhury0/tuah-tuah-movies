import { Link } from 'react-router-dom';
import "./NavBar.scss";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/admin/home"className="links">userName</Link>
      </div>
      <div className="links">
        <Link className="links" to="/editprofile">Edit Profile</Link>
      </div>
    </div>
  )
}

export default NavBar;
