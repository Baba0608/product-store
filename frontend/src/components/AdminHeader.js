import { Link } from "react-router-dom";

export const AdminHeader = () => {
  return (
    <div className="header">
      <div className="header-title">
        <p>Products Store</p>
      </div>

      <div className="nav-items">
        <ul>
          <li>
            <Link to="/admin/home">Home</Link>
          </li>
          <li>
            <Link to="/admin/admins-list">Admins</Link>
          </li>
          <li>
            <Link to="/admin/login">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
