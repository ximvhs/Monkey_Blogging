import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import styled from "styled-components";

const AuthorBoxStyles = styled.div`
  .author-desc {
    line-height: 24px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    overflow: hidden;
    text-align: justify;
  }
`;

const AuthorBox = ({ userId = "" }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUserData() {
      const docRef = doc(db, "users", userId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.data()) {
        setUser(docSnapshot.data());
      }
    }
    fetchUserData();
  }, [userId]);
  if (!userId || !user.username) return null;
  return (
    <AuthorBoxStyles>
      <div className="author p-[20px]">
        <div className="author-image">
          <img src={user?.avatar} alt="" />
        </div>
        <div className="author-content">
          <h3 className="author-name">{user?.fullname}</h3>
          <p className="author-desc">{user?.description}</p>
        </div>
      </div>
    </AuthorBoxStyles>
  );
};

export default AuthorBox;
