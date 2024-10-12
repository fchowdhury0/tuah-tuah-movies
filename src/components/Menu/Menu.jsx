import { Link } from "react-router-dom"
import "./Menu.scss"

const Menu = () =>{
  return (
    <div className="menu">
      <div className="item">
        <span className="title">MOVIES</span>
        <Link to="/" className="list-item">
         <img src = "public/home.svg" alt = "" />
         <span className="listItemTitle">Manage Movies</span>
        </Link>
        <Link to="/" className="list-item">
         <img src = "public/home.svg" alt = "" />
         <span className="listItemTitle">Schedule Movies</span>
        </Link>
        <Link to="/" className="list-item">
         <img src = "public/home.svg" alt = "" />
         <span className="listItemTitle">Manage Promotions</span>
        </Link>
      </div>
      <div className="item">
        <span className="title">USERS</span>
        <Link to="/" className="list-item">
         <img src = "public/home.svg" alt = "" />
         <span className="listItemTitle">Manage Users</span>
        </Link>

      </div>
    </div>
  )

}
export default Menu;