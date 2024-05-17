import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth-context";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase/firebase-config";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import styled from "styled-components";
import { Button } from "../../components/button";
import LoadingSpinner from "../../components/loading/LoadingSpinner";

const ChangePassStyles = styled.div`
  input {
    width: 100%;
    padding: ${(props) =>
      props.hasIcon ? "16px 60px 16px 20px" : "16px 20px"};
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s linear;
    border: 1px solid transparent;
    &:focus {
      background-color: white;
      border: 1px solid ${(props) => props.theme.primary};
    }
  }

  .btn-change {
    :disabled {
      pointer-events: none;
    }
  }
  input::-webkit-input-placeholder {
    color: #b2b3bd;
  }
  input::-moz-input-placeholder {
    color: #b2b3bd;
  }
  label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
    cursor: pointer;
  }
`;

const UserChangePass = () => {
  const { userInfo } = useAuth();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function fetchDate() {
      if (!userInfo || !userInfo.email) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList(results);
    }
    fetchDate();
  }, [userInfo.email, userInfo]);

  const [loading, setLoading] = useState(true);
  const [newPass, setNewPass] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [reNewPass, setReNewPass] = useState("");
  const handleNewPass = (e) => {
    setNewPass(e.target.value);
  };

  const handleCurrentPass = (e) => {
    setCurrentPass(e.target.value);
  };

  const handleReNewPass = (e) => {
    setReNewPass(e.target.value);
  };

  const handleUpdateFrofile = async (e) => {
    e.preventDefault();
    setLoading(false);
    try {
      // Đăng nhập lại người dùng
      const user = auth.currentUser;
      if (userInfo.password !== String(currentPass)) {
        toast.error("The current password is not correct");
        setLoading(true);
        return;
      } else {
        const credential = EmailAuthProvider.credential(
          user.email,
          userInfo.password
        );
        await reauthenticateWithCredential(user, credential);

        // Thay đổi mật khẩu
        if (newPass === reNewPass) {
          await updatePassword(user, newPass);
          const colRef = doc(db, "users", userList[0].id);
          await updatePassword(user, newPass);
          await updateDoc(colRef, {
            password: newPass,
            updatedAt: serverTimestamp(), // Cập nhật thời gian thay đổi
          });
          toast.success("Update user information successfully!");
          setLoading(true);
        } else {
          toast.error("The re-entered password does not match!");
          setLoading(true);
        }
      }
    } catch (error) {
      toast.error("Can not update user infomation");
    }
  };
  return (
    <ChangePassStyles>
      <form onSubmit={handleUpdateFrofile} className="flex flex-col gap-5">
        <div>
          <label htmlFor="current_password">Current password</label>
          <input
            id="current_password"
            type="text"
            placeholder="Enter your current password"
            onChange={handleCurrentPass}
          />
        </div>
        <div className="">
          <label htmlFor="new-password">New password</label>
          <input
            id="new-password"
            type="text"
            placeholder="Enter your new password"
            onChange={handleNewPass}
          />
        </div>
        <div className="">
          <label htmlFor="re-new-password">Re-new password</label>
          <input
            id="re-new-password"
            type="text"
            placeholder="Enter your re-new password"
            onChange={handleReNewPass}
          />
        </div>
        {loading ? (
          <Button
            kind="primary"
            className="btn-change mx-auto w-[200px] mt-10"
            type="submit"
          >
            Change
          </Button>
        ) : (
          <Button
            kind="primary"
            className="btn-change mx-auto w-[200px] mt-10 opacity-50 "
            type="submit"
            disabled
          >
            <LoadingSpinner></LoadingSpinner>
          </Button>
        )}
      </form>
    </ChangePassStyles>
  );
};

export default UserChangePass;
