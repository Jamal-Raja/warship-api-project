/** @format */

import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import Header from "../components/Header";
import NavBar from "@/components/JJNavBar";

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <Header /> */}
      <div className="font-oswald bg-surface-light flex min-h-screen w-full antialiased">
        <NavBar className="bg-brand-dark min-h-16 text-white">
          <Link to="/">Wows API</Link>
        </NavBar>
          <Outlet />
      </div>
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
});
