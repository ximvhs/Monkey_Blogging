import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase/firebase-config";
import Heading from "../../components/layout/Heading";
import PostItem from "../post/PostItem";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

const ListBloggingStyles = styled.div`
  margin-bottom: 40px;
  .btn-active {
    transition: all 0.2s linear;
    :hover {
      opacity: 0.8;
    }
    :active {
      transform: scale(0.8);
    }
  }
  .link-all {
    font-weight: bold;
    font-size: 18px;
    color: ${(props) => props.theme.primary};
    transition: all 0.5s linear;
    :hover {
      text-decoration: underline;
    }
    span {
      display: inline-block;
      transition: transform 0.3s ease;
    }
    :hover span {
      transform: translateX(4px);
    }
  }
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
  .post-item {
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

const ListBlogging = () => {
  const [posts, setPosts] = useState([]);

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
      slidesPerView: 3, // Điều chỉnh lại số lượng slides tại breakpoint này
      spaceBetween: 30,
    },
  };
  // end swiper sileder

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const q = query(colRef, where("status", "==", 1));
      onSnapshot(q, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(result);
      });
    }
    fetchData();
  }, []);
  if (posts.length <= 4) return null;
  return (
    <ListBloggingStyles>
      <div className="container">
        <div className="flex justify-between items-center">
          <Heading>Tất cả bài viết</Heading>
          <Link
            className="flex gap-1 mb-[30px] justify-center items-center link-all"
            to="/all-blogging"
          >
            Xem tất cả
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 26 26"
                strokeWidth="3"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
          </Link>
        </div>
        <div className="flex gap-5 justify-center items-center">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="btn-active"
          >
            <div className="h-12 w-12 rounded-full bg-[#2ec1d3] text-white flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="4"
                stroke="currentColor"
                class="w-6 h-6"
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
            slidesPerView={3}
            breakpoints={sliderSettings}
            className="h-[480px]"
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            <div className="grid-layout">
              {posts.map((item) => (
                <SwiperSlide key={item.id} className="pl-3">
                  <PostItem
                    key={item.id}
                    data={item}
                    className="post-item"
                  ></PostItem>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
          <button
            className="btn-active"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <div className="h-12 w-12 rounded-full bg-[#2ec1d3] text-white flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="4"
                stroke="currentColor"
                class="w-6 h-6"
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
    </ListBloggingStyles>
  );
};

export default ListBlogging;
