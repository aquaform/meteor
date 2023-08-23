"use client";

import React from "react";
import { usePathname } from "next/navigation";

import pages, { titles } from "../header/pages";
import Breadcrumbs from "./Breadcrumbs";
import DashboardActions from "../actions/DashboardActions";
import HistoryActions from "../actions/HistoryActions";

const getActions = (pathname: string) => {
  switch (pathname) {
    case "/dashboard":
      return <DashboardActions />;
    case "/history":
      return <HistoryActions />;
    default:
      return "";
  }
};

export default function SubHeader() {
  const pathname = usePathname();
  const { title } = titles.concat(pages).find((page) => page.to === pathname)!;

  return (
    <div className="h-[54px] bg-white py-4 px-[25px] flex justify-between dark:bg-black">
      <div className="flex items-center font-medium">
        <h5 className="mr-5 text-xl">{title}</h5>
        <Breadcrumbs />
      </div>
      <div>{getActions(pathname)}</div>
    </div>
  );
}
