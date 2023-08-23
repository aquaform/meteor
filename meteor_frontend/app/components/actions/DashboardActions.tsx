import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import useDashboardStore from "@/app/store/dashboardStore";

export default function DesktopActions() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const addNewWidget = useDashboardStore((state) => state.addNewWidget);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`py-2 px-3 rounded bg-gray-200 text-sm hover:bg-gray-300 ${
          isOpen && "bg-gray-300"
        }`}
      >
        Действия <FontAwesomeIcon icon={faAngleDown} />
      </button>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose}>
        <Link className="w-full h-full" href="/dashboard/widget">
          <MenuItem className="flex items-center">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Добавить новый виджет
          </MenuItem>
        </Link>
        <MenuItem className="flex items-center">
          <button
            type="button"
            onClick={() => {
              localStorage.setItem("widgets", "[]");
              // TODO(Vi): Doing this just to rerender
              addNewWidget({});
            }}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Очистить дашборд
          </button>
        </MenuItem>
      </Menu>
    </>
  );
}
