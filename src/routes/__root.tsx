/** @format */

import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools, ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import Header from "../components/Header";
import NavBar from "@/components/JJNavBar";
import { scrollToTop } from "@/util/MiscFunctions";

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <Header /> */}
      <div className="font-oswald bg-surface-light flex min-h-screen w-full antialiased">
        <NavBar className="bg-brand-dark min-h-16 text-white">
          <Link
            className="hover:scale-110 duration-300 ease-in-out active:scale-90"
            to="/">
            <img className="w-max h-18" src="/wow_logo.png" alt="" />
          </Link>
          <svg
            onClick={scrollToTop}
            className="h-10 w-10 text-amber-600 cursor-pointer hover:scale-110 duration-300 ease-in-out active:scale-90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
            />
          </svg>
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
          {
            name: "Tanstack Query",
            render: <ReactQueryDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
});

// 2) FIX NAVBAR MOUSE HOVER BUG
