import React, { useEffect } from "react";
import { Layout } from "antd";
import "./App.css";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import { useLocation } from "react-router";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import "antd/dist/antd.css";

const StyledLayOut = styled(Layout)`
  #layoutHeader {
    height: 49px;
  }
`;
const { Footer, Sider, Content } = Layout;
function App() {
  const local = useLocation();
  const navigation = useNavigate();
  const isHome = local.pathname === "/";
  console.log(local);
  useEffect(() => {
    if (isHome) {
      navigation("home");
    }
  }, []);
  return (
    <div className="App">
      <StyledLayOut>
        <Sider>
          <Sidebar></Sidebar>
        </Sider>
        <Layout>
          <Layout.Header id="layoutHeader">
            <Header></Header>
          </Layout.Header>
          <Content>컨텐츠가 들어갑니다</Content>
          <Footer>Footer</Footer>
        </Layout>
      </StyledLayOut>
    </div>
  );
}

export default App;
