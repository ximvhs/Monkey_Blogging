import React from "react";
import styled from "styled-components";
import HomeBanner from "../module/home/HomeBanner";
import Layout from "../components/layout/Layout";
import HomeFeature from "../module/home/HomeFeature";
import HomeNewest from "../module/home/HomeNewest";
import { useContact } from "../components/layout/Contact-context";
import Contact from "../components/layout/Contact";
import Footer from "../module/home/Footer";
import ListBlogging from "../module/home/ListBlogging";

const HomePageStyles = styled.div``;

const HomePage = () => {
  const { show } = useContact();
  return (
    <HomePageStyles>
      {show && <Contact></Contact>}
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
        <ListBlogging></ListBlogging>
        <Footer></Footer>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;
