import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import slugify from "slugify";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 16px;
    }

    &-title {
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
    gap: 6px;
  }
`;

const PostItem = ({ data, className = "" }) => {
  if (!data) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostItemStyles className={className}>
      <PostImage url={data.image} alt="" to={data.slug}></PostImage>
      <PostCategory to={data.category?.slug}>
        {data.category?.name}
      </PostCategory>
      <PostTitle to={data.slug} size="normal">
        {data.title}
      </PostTitle>
      <PostMeta
        to={slugify(data.user?.username || "", { lower: true })}
        authorName={data.user.fullname}
        date={formatDate}
      ></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
