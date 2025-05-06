/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import axios from "axios";

const AllUsersTable = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_SERVER_API_BASE_URL;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/users`);
      // console.log("Fetched users:", res.data);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user); // Set the user to delete
    setShowPopup(true); // Show the popup
  };

  const confirmDelete = async () => {
    if (!userToDelete || !userToDelete.id) {
      console.error("No user selected for deletion");
      return;
    }

    try {
      console.log("Deleting user:", userToDelete);
      await axios.delete(`${API_BASE_URL}/users/${userToDelete.id}`);
      setUsers(users.filter((u) => u.id !== userToDelete.id));
      setShowPopup(false);
      setUserToDelete(null);
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setUserToDelete(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5 px-4">
      <p className="text-2xl text-[#173a96] mb-5 font-bold border-b-2 pb-2 border-[#173a96]">
        All Users
      </p>

      {loading ? (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      ) : users.length === 0 ? (
        <p className="text-gray-500 mt-4 text-center">No users available.</p>
      ) : (
        <div className="overflow-x-auto h-[calc(100vh-100px)] md:h-auto overflow-y-auto border border-gray-500 rounded ">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Created Date</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">First Name</th>
                <th className="border border-gray-300 px-4 py-2">Last Name</th>
                <th className="border border-gray-300 px-4 py-2">Role</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
  {(users || []).map((user) => (
    <tr key={user.id} className="text-center">
      <td className="border border-gray-300 px-4 py-2 text-center">
        {new Date(user.created_at).toLocaleDateString()}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        {user.email_addresses[0]?.email_address}
      </td>
      <td className="border border-gray-300 px-4 py-2">{user.first_name}</td>
      <td className="border border-gray-300 px-4 py-2">{user.last_name}</td>
      <td className="border border-gray-300 px-4 py-2">{user.unsafe_metadata?.role}</td>
      <td className="border border-gray-300 px-4 py-2">
        <button
          onClick={() => handleDeleteClick(user)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white p-5 rounded shadow-lg w-full max-w-md">
            <p className="text-lg mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={confirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsersTable;













