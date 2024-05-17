import styled from "styled-components";
import Heading from "../components/layout/Heading";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import PostItem from "../module/post/PostItem";

const AllBloggingStyles = styled.div`
  .header-line {
    display: block;
    width: 100vw;
    height: 2px;
    background-image: linear-gradient(
      to right bottom,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    );
  }
  .sc-dIouRR.hSFREz {
    padding: 20px;
    border-radius: 16px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    a {
      width: 100%;
    }
  }
  .grid-layout {
    display: grid;
    grid-auto-columns: 235px;
    gap: 20px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 40px;
    }
    @media screen and (max-width: 1023.98px) {
      grid-auto-flow: column;
      scroll-snap-type: x mandatory;
      overflow-x: auto;
    }

    & > * {
      scroll-snap-align: start;
    }
  }
  .post-title {
    font-weight: bold;
  }
  .post-image {
    height: 270px;
  }
  .post-meta {
    color: ${(props) => props.theme.gray6D};
  }
`;

const AllBlogging = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const docRef = collection(db, "posts");
      onSnapshot(docRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
    fetchData();
  }, []);
  if (posts.length <= 0)
    return (
      <Layout>
        <AllBloggingStyles>
          <div className="container">
            <div className="pt-10"></div>
            <Heading>Tất cả bài viết</Heading>
            <div className="grid-layout grid-layout--primary">
              Chưa có bài viết nào cả
            </div>
          </div>
        </AllBloggingStyles>
      </Layout>
    );
  return (
    <Layout>
      <AllBloggingStyles>
        <span className="header-line"></span>
        <div className="pt-10"></div>
        <div className="container">
          <Heading>Tất cả bài viết</Heading>
          <div className="grid-layout">
            {posts.map((item) => (
              <PostItem key={item.id} data={item}></PostItem>
            ))}
          </div>
        </div>
      </AllBloggingStyles>
    </Layout>
  );
};

export default AllBlogging;
