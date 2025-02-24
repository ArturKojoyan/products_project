import { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../NavBar";

const Layout: FC<PropsWithChildren> = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
