import React, { useEffect } from "react";
import { Layout } from "antd";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router";
import styled from "styled-components";
import "./App.css";
import "antd/dist/antd.css";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import Home from "./component/Home";
import ErrorPage from "./component/ErrorPage";
import DynamicRouter from "./container/DynamicRouter";

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
          <Content>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/micro/:appName/*" element={<DynamicRouter />} />

              {/* <Route path="*" element={<ErrorPage />} /> */}
            </Routes>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </StyledLayOut>
    </div>
  );
}

export default App;
