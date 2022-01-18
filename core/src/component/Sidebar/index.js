import React, { useMemo } from "react";
import { Menu } from "antd";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledMenu = styled(Menu)`
  width: 100%;
  height: 100%;
  #sidebarAppMenu > div {
    background: #01294f;
  }
`;
function Sidebar(props) {
  const local = useLocation();
  const navigate = useNavigate();
  const pathName = local.pathname;
  const selectedKey = useMemo(() => {
    switch (pathName) {
      case "/micro/app1":
        return ["1"];
      case "/micro/app2":
        return ["2"];
      case "/home":
        return ["0"];
      default:
        return [""];
    }
  }, [pathName]);
  const handleClick = (item) => {
    const itemKey = item.key;
    switch (itemKey) {
      case "1":
        navigate("micro/app1");
        break;
      case "2":
        navigate("micro/app2");
        break;
      default:
        navigate("home");
    }
  };
  const { SubMenu } = Menu;
  return (
    <StyledMenu
      theme="dark"
      onClick={handleClick}
      selectedKeys={selectedKey}
      defaultOpenKeys={["sub1"]}
      mode="inline"
    >
      <SubMenu key="sub1" title="메뉴">
        <Menu.ItemGroup key="g1" title="Applications" id="sidebarAppMenu">
          <Menu.Item key="0">Home</Menu.Item>
          <Menu.Item key="1">App1</Menu.Item>
          <Menu.Item key="2">App2</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </StyledMenu>
  );
}

export default Sidebar;
