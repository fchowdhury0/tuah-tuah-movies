// src/components/Menu/Menu.jsx
import { Link } from "react-router-dom";
import feesIcon from "../../assets/icons/fees.svg";
import movieIcon from "../../assets/icons/movie.svg";
import pricesIcon from "../../assets/icons/prices.svg";
import promoIcon from "../../assets/icons/promo.svg";
import scheduleIcon from "../../assets/icons/schedule.svg";
import usersIcon from "../../assets/icons/users.svg";
import "./Menu.scss";

const Menu = () => {
  return (
    <div className="menu">
      <div className="item">
        <span className="title">MOVIES</span>
        <Link to="/admin/managemovies" className="list-item">
          <img src={movieIcon} alt="manage movies" />
          <span className="listItemTitle">Manage Movies</span>
        </Link>
        <Link to="/admin/schedulemovie" className="list-item">
          <img src={scheduleIcon} alt="schedule movies" />
          <span className="listItemTitle">Schedule Movies</span>
        </Link>
        <Link to="/admin/managepromotions" className="list-item">
          <img src={promoIcon} alt="manage promotions" />
          <span className="listItemTitle">Manage Promotions</span>
        </Link>
      </div>
      <div className="item">
        <span className="title">USERS</span>
        <Link to="/admin/manageusers" className="list-item">
          <img src={usersIcon} alt="manage users" />
          <span className="listItemTitle">Manage Users</span>
        </Link>
      </div>
      <div className="item">
        <span className="title">PRICES & FEES</span>
        <Link to="/admin/manageprices" className="list-item">
          <img src={pricesIcon} alt="manage prices" />
          <span className="listItemTitle">Manage Prices</span>
        </Link>
        <Link to="/admin/managefees" className="list-item">
          <img src={feesIcon} alt="manage fees" />
          <span className="listItemTitle">Manage Fees</span>
        </Link>
      </div>
    </div>
  );
};

export default Menu;