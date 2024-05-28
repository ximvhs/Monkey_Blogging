import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth-context";
import { Button } from "../../components/button";
import { useContact } from "../../components/layout/Contact-context";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .logo {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: 600;
    img {
      max-width: 40px;
    }
  }
  .header-avatar {
    width: 52px;
    height: 52px;
    border: solid 3px ${(props) => props.theme.primary};
    border-radius: 100%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .icon-bar {
    display: none;
  }
  @media (max-width: 768px) {
    .icon-bar {
      display: flex;
      cursor: pointer;
      padding: 10px;
    }
    .logo {
      display: none;
    }
  }
`;

const DashboardHeader = () => {
  const { userInfo } = useAuth();
  const { show, setShow } = useContact();
  const handleNavBar = () => {
    setShow(!show);
  };
  return (
    <DashboardHeaderStyles>
      <NavLink to="/" className="logo">
        <img srcSet="/monkey.png 2x" alt="monkey-blogging" className="logo" />
        <span className="hidden lg:inline-block">XimVHS Blogging</span>
      </NavLink>
      <button className="icon-bar" onClick={handleNavBar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </button>
      <div className="header-right">
        <Button to="/manage/add-post" className="header-button" height="52px">
          Write new post
        </Button>
        <Link to="manage/profile" className="header-avatar">
          <img
            src={userInfo.avatar ? userInfo.avatar : "../NoAvatar.png"}
            alt="avatar"
          />
        </Link>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
