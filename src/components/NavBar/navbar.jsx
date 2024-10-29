import { Link } from 'react-router-dom';
import "./navbar.scss";

const NavBar = () => {
    return (
	<div className="navbar">
	    <div className="logo">
		<Link to="/admin/home" className="links">Hawk Tuah Movies</Link>
	    </div>
	    <div className="links">
		
		<Link to="/editprofile" className="links">Edit Profile</Link>
		<Link to="/home" className="links">Movies</Link>
		<Link to="/login" className="links">Login</Link>
		<Link to="/register" className="links">Register</Link>
		<Link to="/logout" className="links">Logout</Link>
	    </div>
	</div>
    );
};

export default NavBar;
