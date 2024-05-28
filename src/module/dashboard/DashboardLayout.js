import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import { useAuth } from "../../contexts/auth-context";
import NotFoundPage from "../../pages/NotFoundPage";
import { useContact } from "../../components/layout/Contact-context";
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 36px;
      color: ${(props) => props.theme.primary};
      letter-spacing: 1px;
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(100px, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
      @media screen and (max-width: 770px) {
        grid-template-columns: repeat(1, 1fr);
      }
      @media (min-width: 770.1px) and (max-width: 1023.98px) {
        display: grid;
        grid-template-columns: 250px minmax(100px, 1fr);
      }
    }
  }
`;
const DashboardLayout = ({ children }) => {
  const { userInfo } = useAuth();
  const { show } = useContact();
  if (!userInfo) return <NotFoundPage></NotFoundPage>;
  return (
    <DashboardStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        {/* <Sidebar></Sidebar> */}
        {!show && <Sidebar></Sidebar>}
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
