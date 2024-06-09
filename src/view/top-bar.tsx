import React, { ReactNode } from "react";
// import reactLogo from '/icons/logo.svg';// load at runtime from public
// import logo from '../assets/react.svg';// embedded in the bundle at build

interface Props {
  children?: ReactNode;
}

export function TopBar({ children }: Props) {
  return (
    <div className="top-bar">
      <h1>{children}</h1>
      <img className="logo" src="./icons/logo.svg" alt="logo" />
      {/* <img className="logo" src={reactLogo} alt="logo" /> */}
      {/* <img className="logo" src={logo} alt="logo" /> */}
    </div>
  );
}
