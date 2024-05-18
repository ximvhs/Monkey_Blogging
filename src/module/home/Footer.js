import React from "react";
import styled from "styled-components";

const FooterStyles = styled.div`
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
      border-bottom: solid 2px #c5c5c5;
      &-item {
        margin-bottom: 20px;
        & > p {
          /* color: #c5c5c5; */
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
          <div className="footer-top grid grid-cols-4 gap-x-10">
            <div className="footer-top-item">
              <div className="footer-top-header">
                <img src="./monkey.png" alt="#" />
                <p>XimVHS Blogging</p>
              </div>
              <p>Điện thoại: 033 647 5713</p>
              <p>Email: ximvhs26092002@gmail.com</p>
              <p>
                46Y tổ 9C khu phố 12, Phường An Bình, TP.Biên Hòa, Tỉnh Đồng Nai
              </p>
            </div>
            <div className="footer-top-item">
              <div className="footer-top-header">
                <p>Về XimVHS Blogging</p>
              </div>
              <p>Giới thiệu</p>
              <p>Liên hê</p>
              <p>Bảo mật</p>
              <p>Điều khoản</p>
            </div>
            <div className="footer-top-item">
              <div className="footer-top-header">
                <p>Theo dõi chúng tôi trên </p>
              </div>
              <p>Facebook</p>
              <p>instagram</p>
              <p>Linkedln</p>
            </div>
            <div className="footer-top-item">
              <div className="footer-top-header">
                <p>Dự án</p>
              </div>
              <p>Blog</p>
              <p>Clone Shoppe</p>
              <p>Clone Page</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 XimVHS blogging. Nơi chia sẻ những blog chất lượng.</p>
          </div>
        </div>
      </div>
    </FooterStyles>
  );
};

export default Footer;
