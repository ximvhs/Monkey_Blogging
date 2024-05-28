import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import slugify from "slugify";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 20px;
      height: 372px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 16px;
    }
    &-meta {
      color: ${(props) => props.theme.gray98};
    }
    &-title {
      margin-bottom: 12px;
      font-weight: bold;
    }
  }
  @media screen and (max-width: 1023.98px) {
    &-image {
      height: 250px;
    }
  }
`;

const PostNewestLarge = ({ data, className = "" }) => {
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (!data.id) return null;
  return (
    <div className={className}>
      <PostNewestLargeStyles>
        <PostImage url={data?.image} alt="" to={data?.slug}></PostImage>
        <PostCategory to={data?.category?.slug}>
          {data?.category?.name}
        </PostCategory>
        <PostTitle to={data?.slug} size="big">
          {data?.title}
        </PostTitle>
        <PostMeta
          className="post-meta"
          to={slugify(data?.user?.username || "", { lower: true })}
          authorName={data?.user?.fullname}
          date={formatDate}
        ></PostMeta>
      </PostNewestLargeStyles>
    </div>
  );
};

export default PostNewestLarge;