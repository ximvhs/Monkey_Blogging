import React, { useEffect, useRef, useState } from "react";
import Heading from "../../components/layout/Heading";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import PostItem from "./PostItem";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const PostRelatedStyles = styled.div`
  padding-bottom: 40px;
  .post-item {
    padding: 20px;
    border-radius: 16px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    a {
      width: 100%;
    }
  }
  button {
    transition: all 0.2s linear;
    :hover {
      opacity: 0.8;
    }
    :active {
      transform: scale(0.8);
    }
  }
`;
const PostRelated = ({ categoryId = "" }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("categoryId", "==", categoryId)
    );
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
  }, [categoryId]);

  // start swiper sileder
  const swiperRef = useRef();
  const sliderSettings = {
    440: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    680: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 4, // Điều chỉnh lại số lượng slides tại breakpoint này
      spaceBetween: 30,
    },
  };
  // end swiper sileder

  console.log("posts.length: ", posts.length);
  if (!categoryId || posts.length < 4) return null;
  return (
    <PostRelatedStyles>
      <div className="post-related">
        <Heading>Bài viết liên quan</Heading>
        <div className="flex gap-5 justify-center items-center">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="h-12 w-12 rounded-full bg-[#2ec1d3] text-white flex justify-center items-center"
          >
            <div className="h-12 w-12 rounded-full  flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="4"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </div>
          </button>
          <Swiper
            spaceBetween={40}
            slidesPerView={4}
            className="h-[410px]"
            breakpoints={sliderSettings}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            <div className="grid-layout grid-layout--primary mt-5">
              {posts.length > 0 &&
                posts.map((item) => (
                  <SwiperSlide key={item.id} className="pl-3">
                    <PostItem data={item} className="post-item mt-5"></PostItem>
                  </SwiperSlide>
                ))}
            </div>
          </Swiper>
          <button onClick={() => swiperRef.current?.slideNext()}>
            <div className="h-12 w-12 rounded-full bg-[#2ec1d3] text-white flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="4"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </PostRelatedStyles>
  );
};

export default PostRelated;
