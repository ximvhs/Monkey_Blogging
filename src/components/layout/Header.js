import React from "react";
import styled from "styled-components";
import { Button } from "../button";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useContact } from "./Contact-context";
import Menu from "../menu/Menu";

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
            width: 100%;
            height: 2px;
            background-image: linear-gradient(
              to right bottom,
              ${(props) => props.theme.primary},
              ${(props) => props.theme.secondary}
            );
            position: absolute;
            top: 28px;
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
          font-size: 18px;
        }
      }
    }
  }
  .header-auth {
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
    :hover .header-auth-menu {
      display: block;
    }
    .header-auth-menu {
      position: absolute;
      bottom: -300px;
      left: -200px;
      animation: Grow ease 0.3s;
      transform-origin: calc(100% - 10px) top;
      display: none;
      z-index: 5;

      :after {
        content: "";
        position: absolute;
        top: -32px;
        right: 4px;
        border-width: 16px 20px;
        border-style: solid;
        z-index: 2;
        border-color: transparent transparent #f4f1f1 transparent;
      }
      :before {
        content: "";
        position: absolute;
        top: -40px;
        right: 0;
        width: 40%;
        height: 40px;
        z-index: 1;
      }
    }
    @keyframes Grow {
      from {
        opacity: 0;
        transform: scale(0);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
  .header-avatar {
    display: inline;
    width: 52px;
    height: 52px;
    z-index: 10;
    border: solid 3px ${(props) => props.theme.primary};
    border-radius: 100%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;

    :hover .header-auth-menu {
      display: block;
    }
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
  console.log("userInfo: ", userInfo);
  const { show, setShow } = useContact();

  const menuLinks = [
    {
      url: "/",
      title: "Home",
    },
    {
      url: "/all-blogging",
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
          {!userInfo ? (
            <div className="flex gap-5">
              <Button
                type="button"
                height="56px"
                className="header-button"
                to="/sign-in"
                kind="ghost"
              >
                Log in
              </Button>
              <Button
                type="button"
                height="56px"
                className="header-button"
                to="/sign-up"
              >
                Sign up
              </Button>
            </div>
          ) : (
            <div className="header-auth">
              <Link to="/manage/profile" className="header-avatar">
                <img
                  src={userInfo.avatar ? userInfo.avatar : "./NoAvatar.png"}
                  alt="avatar"
                />
              </Link>
              <Menu className="header-auth-menu"></Menu>
            </div>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
