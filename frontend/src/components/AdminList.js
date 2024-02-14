import { useState, useEffect } from "react";
import axios from "axios";

import { AdminHeader } from "./AdminHeader";
import { toastNotifyError, toastNotifySuccess } from "../utils/toast-notify";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

export const AdminList = () => {
  const [adminList, setAdminList] = useState(null);

  const fetchAdmins = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_API}/admin/admin-list`, {
        headers: { authorization: localStorage.getItem("store-token") },
      });

      setAdminList(data.admins);
    } catch (err) {
      console.log(err);
      toastNotifyError("Something went wrong.");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  if (!adminList) {
    return;
  }

  return (
    <div>
      <AdminHeader />

      <div className="admins-list">
        <table>
          <tr>
            <th>Admin</th>
            <th>mail</th>
          </tr>

          {adminList.map((admin) => {
            return (
              <tr key={admin._id}>
                <td>{admin.username}</td>
                <td>{admin.email}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};
