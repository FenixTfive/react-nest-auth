import React from "react";
import { LayoutProps } from "./interfaces";

const MainLayout: React.FC<LayoutProps> = (props) => {
  return <div>{props.children}</div>;
};

export default MainLayout;
