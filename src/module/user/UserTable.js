import React, { useEffect, useState } from "react";
import { Table } from "../../components/table";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { ActionDelete, ActionEdit } from "../../components/action";
import { useAuth } from "../../contexts/auth-context";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { LabelStatus } from "../../components/label";
import { userRole, userStatus } from "../../utils/constants";

const UserTable = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList(results);
    });
  }, []);
  const renderRoleLabel = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Moderator";
      case userRole.USER:
        return "User";

      default:
        break;
    }
  };
  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">Rejected</LabelStatus>;

      default:
        break;
    }
  };
  const { userInfo } = useAuth();
  const handleDeleteUser = async (user) => {
    if (userInfo?.role !== userRole.ADMIN) {
      Swal.fire("Failed", "You have no right to do this action", "warning");
      return;
    }
    const colRef = doc(db, "users", user.id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        toast.success("Delete user successfully");
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      }
    });
  };

  const renderUserItem = (user) => {
    return (
      <tr key={user.id}>
        <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
        <td className="whitespace-nowrap">
          <div className="flex items-center gap-x-3">
            <img
              src={user?.avatar}
              alt=""
              className="flex-shrink-0 object-cover w-10 h-10 rounded-md"
            />
            <div className="flex-1">
              <h3>{user?.name}</h3>
              <time className="text-sm text-gray-300">
                {new Date(user?.createdAt?.seconds * 1000).toLocaleDateString(
                  "vi-VI"
                )}
              </time>
            </div>
          </div>
        </td>
        <td>{user?.username}</td>
        <td title={user.email}>{user?.email.slice(0, 5) + "..."}</td>
        <td>{renderLabelStatus(Number(user?.status))}</td>
        <td>{renderRoleLabel(Number(user.role))}</td>
        <td>
          <div className="flex items-center text-gray-500 gap-x-3">
            <ActionEdit
              onClick={() => navigate(`/manage/update-user?id=${user.id}`)}
            ></ActionEdit>
            <ActionDelete onClick={() => handleDeleteUser(user)}></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 && userList.map((user) => renderUserItem(user))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
