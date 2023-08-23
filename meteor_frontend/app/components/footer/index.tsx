import React from "react";

export default function Footer() {
  return (
    <div className="py-3 px-6 flex items-center justify-between bg-white h-[65px] shrink-0 box-border dark:bg-black">
      <div>
        <span className="text-muted mr-2 font-medium">2023 &nbsp;©&nbsp;</span>
        <a
          href="https://krammerti.ru"
          className="text-gray-700 hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Krammerti
        </a>
      </div>
    </div>
  );
}
