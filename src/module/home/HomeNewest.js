import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import PostNewestLarge from "../post/PostNewestLarge";
import PostNewestItem from "../post/PostNewestItem";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    align-items: start;
  }
  .post_large {
    padding: 28px 20px;
    border-radius: 16px;
    background-image: linear-gradient(to right bottom, #2ebac13d, #a4d96c45);
  }
  .post-category {
    background-color: white;
  }
  .sidebar {
    padding: 28px 20px;
    background-image: linear-gradient(to right bottom, #2ebac13d, #a4d96c45);
    border-radius: 16px;
  }
  @media screen and (max-width: 1023.98px) {
    .layout {
      grid-template-columns: 100%;
    }
    .sidebar {
      padding: 14px 10px;
    }
  }
`;

const HomeNewest = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", false),
      limit(4)
    );
    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  });
  if (posts.length <= 0) return null;
  const [first, ...other] = posts;
  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Mới nhất</Heading>
        <div className="layout">
          <PostNewestLarge
            className="post_large"
            data={first}
          ></PostNewestLarge>
          {other.length > 0 && (
            <div className="sidebar">
              {other.length > 0 &&
                other.map((item) => (
                  <PostNewestItem key={item.id} data={item}></PostNewestItem>
                ))}
            </div>
          )}
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
