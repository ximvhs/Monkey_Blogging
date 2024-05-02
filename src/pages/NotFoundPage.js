import React from "react";
import styled from "styled-components";
import { Button } from "../components/button";
import { NavLink } from "react-router-dom";

const NotFoundPageStyles = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 20px;
  img {
    height: 200px;
  }
  h1 {
    font-size: 50px;
  }
  .container-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    .notfound-text {
      font-size: 100px;
    }
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundPageStyles>
      <NavLink to="/">
        <img src="/monkey.png" alt="Not Found" />
      </NavLink>
      <div className="container-text">
        <h1 className="notfound-text">404!</h1>
        <h1>Oops! Page not found</h1>
      </div>
      <Button>
        <NavLink to="/"> Back to home</NavLink>
      </Button>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
