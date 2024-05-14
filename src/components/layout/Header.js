import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../button";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import Contact from "./Contact";
import { useContact } from "./Contact-context";

// const menuLinks = [
//   {
//     url: "/",
//     title: "Home",
//   },
//   {
//     url: "/blog",
//     title: "Blog",
//   },
//   {
//     url: "/contact",
//     title: "Contact",
//     onclick: () => {
//       setContact(true);
//     },
//   },
// ];

const HeaderStyles = styled.header`
  padding: 20px 0;
  .header-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    .logo {
      max-width: 50px;
    }
    .menu {
      display: flex;
      gap: 20px;
      margin-left: 40px;
      .menu-item {
        position: relative;
        color: ${(props) => props.theme.primary};
        :hover {
          opacity: 0.8;
          :before {
            content: "";
            width: 110%;
            height: 3px;
            background-image: linear-gradient(
              to right bottom,
              ${(props) => props.theme.primary},
              ${(props) => props.theme.secondary}
            );
            position: absolute;
            top: 26px;
            left: 0;
            transform: translate(0, -150%);
            animation: light 0.3s ease-in;
          }
        }
        @keyframes light {
          from {
            opacity: 0;
            width: 0;
          }
          to {
            opacity: 1;

            width: 110%;
          }
        }
        .menu-link {
          font-weight: 600;
        }
      }
    }

    /*css của input  */
    /* .header-right {
      margin-left: auto;
      display: flex;
      gap: 20px;
      .header-right-input {
        position: relative;
        .search__input {
          border: 2px solid #ccc;
          padding: 15px 60px 15px 15px;
          width: 100%;
          max-width: 320px;
          border-radius: 8px;
          transition: all 0.3s linear;
          :focus {
            border: 2px solid ${(props) => props.theme.primary};
          }
        }
        .search-icon {
          position: absolute;
          right: 0;
          top: 50%;
          height: 100%;
          transform: translateY(-50%);
          border-radius: 0 8px 8px 0;
          cursor: pointer;
          padding: 20px;
          display: flex;
          align-items: center;
          background-color: ${(props) => props.theme.primary};
          transition: all 0.2s linear;
          opacity: 0.8;
          :hover {
            opacity: 1;
          }
        }
      }
      .header-auth {
        display: flex;
        align-items: center;
        color: ${(props) => props.theme.primary};
        font-weight: bold;
      }
    } */
  }
  .header-auth {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .header-avatar {
    display: inline;
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .logo {
      max-width: 30px;
    }
    .menu,
    .search,
    .header-button {
      display: none;
    }
  }
`;

const Header = () => {
  const { userInfo } = useAuth();
  const { show, setShow } = useContact();

  const menuLinks = [
    {
      url: "/",
      title: "Home",
    },
    {
      url: "/blog",
      title: "Blog",
    },
    {
      url: "/contact",
      title: "Contact",
      onClick: () => {
        setShow(!show);
      },
    },
  ];

  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <NavLink to="/">
            <img src="/monkey.png" alt="Monkey Blongging" className="logo" />
          </NavLink>
          <ul className="menu">
            {menuLinks.map((item) => {
              if (item.onClick)
                return (
                  <li
                    onClick={item.onClick}
                    className="menu-item"
                    key={item.title}
                  >
                    <div className="menu-link cursor-pointer">{item.title}</div>
                  </li>
                );
              return (
                <li className="menu-item" key={item.title}>
                  <NavLink to={item.url} className="menu-link">
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          {/* <div className="header-right">
            <div className="header-right-input">
              <input
                className="search__input"
                type="text"
                placeholder="Search post..."
              />
              <span className="search-icon">
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="7.66669"
                    cy="7.05161"
                    rx="6.66669"
                    ry="6.05161"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <path
                    d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
          </div> */}
          {!userInfo ? (
            <Button
              type="button"
              height="56px"
              className="header-button"
              to="/sign-in"
            >
              Login
            </Button>
          ) : (
            <div className="header-auth">
              {/* <Button
                type="button"
                height="56px"
                className="header-button"
                to="/dashboard"
              >
                Dashboard
              </Button> */}
              <Link to="/manage/profile" className="header-avatar">
                <img src={userInfo?.avatar} alt="" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
