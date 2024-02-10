import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="header">
      <div className="title">
        <p>Products Store</p>
      </div>

      <div className="nav-items">
        <ul>
          <li>
            <Link to="/user/home">Home</Link>
          </li>
          <li>
            <Link to="/user/Orders">My Orders</Link>
          </li>
          <li>
            <Link to="/user/cart">Cart</Link>
          </li>
          <li>
            <Link to="/user/login">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
