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

      <div className="admins-list flex justify-center w-[95%] mt-20 pt-4">
        <table className="border-2 border-collapse border-gray-700 text-sm w-[95%] sm:w-[600px]">
          <tr>
            <th className="border-2 min-w-5 px-4 py-1 bg-green-500 border-gray-700">
              Admin
            </th>
            <th className="border-2 min-w-5 px-4 py-1 bg-green-500 border-gray-700">
              mail
            </th>
          </tr>

          {adminList.map((admin) => {
            return (
              <tr key={admin._id}>
                <td className="border-2 border-gray-700 min-w-5 px-4 py-1 bg-green-300 text-center">
                  {admin.username}
                </td>
                <td className="border-2 border-gray-700 min-w-5 px-4 py-1 bg-green-300 text-center">
                  {admin.email}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};
