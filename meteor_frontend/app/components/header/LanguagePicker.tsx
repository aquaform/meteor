"use client";

import { Menu, MenuItem, Tooltip } from "@mui/material";
import Image from "next/image";
import React from "react";
import russianFlag from "@/public/icons/russian.svg";
import usFlag from "@/public/icons/english.svg";
import useAppStore from "@/app/store/appStore";

export default function LanguagePicker() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Tooltip title="Сменить язык">
      <div className="w-[40px] h-[40px] hover:bg-gray-100 cursor-pointer flex items-center justify-center rounded mx-1">
        <button onClick={handleClick} type="button">
          <Image
            src={language === "ru" ? russianFlag : usFlag}
            alt="Russian flag"
            className="rounded"
            width={22}
            height={22}
          />
        </button>
        <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
          <MenuItem onClick={() => setLanguage("ru")}>
            <Image
              src={russianFlag}
              alt="Russian flag"
              className="mr-4 rounded"
              width={22}
              height={22}
            />
            Русский
          </MenuItem>
          <MenuItem onClick={() => setLanguage("en")}>
            <Image
              src={usFlag}
              alt="US flag"
              className="mr-4 rounded"
              width={22}
              height={22}
            />
            English
          </MenuItem>
        </Menu>
      </div>
    </Tooltip>
  );
}
