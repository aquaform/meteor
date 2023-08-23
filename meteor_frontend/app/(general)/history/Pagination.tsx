import React from "react";

type PaginationLink = {
  active: boolean;
  label: string;
  url: string | null;
};

type Props = {
  links: PaginationLink[];
  handleClick: (pageUrl: string) => void;
  pageIndex: number;
};

export default function Pagination({ links, handleClick, pageIndex }: Props) {
  return (
    <div>
      {links?.map((link, index) => (
        <button
          key={link.label + index}
          type="button"
          className="py-3 px-4 rounded bg-gray-200 text-base hover:bg-gray-300 mr-2 last:mr-0 disabled:bg-gray-400"
          onClick={() => link.url && handleClick(link.url)}
          disabled={!link.url || pageIndex === +link.label}
        >
          {(() => {
            if (index === 0) return "Прошлая";
            if (index === links.length - 1) return "Следующая";
            return link.label;
          })()}
        </button>
      ))}
    </div>
  );
}
