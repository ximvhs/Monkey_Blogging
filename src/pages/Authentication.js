import React from "react";
import styled from "styled-components";

const AuthenticationStyle = styled.div`
  min-height: 100vh;
  padding: 40px;
  form {
    max-width: 800px;
    margin: 0 auto;
  }
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .nav-link {
    width: 100%;
    display: flex;
    justify-content: end;
    a {
      color: ${(props) => props.theme.primary};
      text-decoration: underline;
    }
  }
`;

const Authentication = ({ children }) => {
  return (
    <AuthenticationStyle>
      <img srcSet="/monkey.png 2x" alt="monkey-blogging" className="logo" />
      <h1 className="heading">Monkey Blogging</h1>
      {children}
    </AuthenticationStyle>
  );
};

export default Authentication;
