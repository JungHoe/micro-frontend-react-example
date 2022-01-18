import React, { useEffect } from "react";
import { Layout } from "antd";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import "antd/dist/antd.css";
import Test1 from "./component/Test1";
import Test2 from "./component/Test2";

const StyledLayOut = styled(Layout)`
  #layoutHeader {
    height: 49px;
  }
`;
function App({ basicPath, ...props }) {
  /*
  react-router-dom v6 버전에서 nasted route 패치로 인해 basicPath가 필요없게됨
  */
  console.log("app1 Props", props);
  return (
    <div className="App">
      <ul>
        <li>
          <Link to={`test1`}>링크1</Link>
        </li>
        <li>
          <Link to={`test2`}>링크2</Link>
        </li>
      </ul>
      <Routes>
        <Route path={`test1`} element={<Test1 />} />
        <Route path={`test2`} element={<Test2 />} />
      </Routes>
    </div>
  );
}
export default { App };
