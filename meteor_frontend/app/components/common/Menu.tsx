import { Menu, MenuItem } from "@mui/material";
import React, { ReactElement, useState } from "react";

interface Props {
  buttonContent: ReactElement;
  menuItems: ReactElement[];
  buttonClassName?: string;
  isOpenStyles?: string;
}

export default function CustomMenu({
  buttonContent,
  menuItems,
  buttonClassName = "",
  isOpenStyles = "",
}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);

  return (
    <>
      <button
        type="button"
        className={`${buttonClassName} ${isOpen ? isOpenStyles : ""}`}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        {buttonContent}
      </button>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        {menuItems.map((menuItem) => (
          <MenuItem key={menuItem.key} className="flex items-center">
            {menuItem}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
