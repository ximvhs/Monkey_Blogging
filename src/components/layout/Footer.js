import React from "react";
import styled from "styled-components";

const FooterStyled = styled.div`
  min-height: 420px;
  margin-top: 40px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
`;

const Footer = () => {
  return <FooterStyled></FooterStyled>;
};

export default Footer;
