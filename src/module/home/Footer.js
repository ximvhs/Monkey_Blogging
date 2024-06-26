import React from "react";
import styled from "styled-components";

const FooterStyles = styled.div`
  position: static;
  bottom: 0;
  right: 0;
  left: 0;
  min-height: 220px;
  padding: 40px 0 20px 0;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  p {
    color: white;
  }
  .footer {
    &-top {
      border-bottom: solid 2px white;
      &-item {
        margin-bottom: 20px;
        & > p {
          line-height: 26px;
        }
      }
      &-header {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-bottom: 12px;
        img {
          height: 40px;
        }
        p {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    &-bottom {
      display: flex;
      justify-content: center;
      p {
        margin-top: 18px;
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterStyles>
      <div className="container">
        <div className="footer">
          <div className="footer-top layout-footer grid grid-cols-4 gap-x-10">
            <div className="footer-top-item">
              <div className="footer-top-header">
                <img src="./monkey.png" alt="#" />
                <p>XimVHS Blogging</p>
              </div>
              <p>Tel: 033 647 5713</p>
              <p>Email: ximvhs26092002@gmail.com</p>
              <p>
                46Y tổ 9C khu phố 12, Phường An Bình, TP.Biên Hòa, Tỉnh Đồng Nai
              </p>
            </div>
            <div className="footer-top-item">
              <div className="footer-top-header">
                <p>Về XimVHS Blogging</p>
              </div>
              <p>Introduce</p>
              <p>Contact</p>
              <p>Security</p>
              <p>Rules</p>
            </div>
            <div className="footer-top-item">
              <div className="footer-top-header">
                <p>Follow me on</p>
              </div>
              <p>Facebook</p>
              <p>instagram</p>
              <p>Linkedln</p>
            </div>
            <div className="footer-top-item">
              <div className="footer-top-header">
                <p>Project</p>
              </div>
              <p>Blog</p>
              <p>Clone Shoppe</p>
              <p>Clone Page</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 XimVHS blogging. A place to share quality blogs.</p>
          </div>
        </div>
      </div>
    </FooterStyles>
  );
};

export default Footer;
