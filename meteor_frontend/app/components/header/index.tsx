"use client";

import { faMessage } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faCircleHalfStroke,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Avatar, Drawer, Tooltip } from "@mui/material";
import Image from "next/image";

import useAppStore from "@/app/store/appStore";
import useAuth from "@/app/hooks/auth";
import logo from "@/public/icons/logo.svg";
import { useTheme } from "next-themes";
import CustomDrawer from "../drawer";
import pages from "./pages";
import LanguagePicker from "./LanguagePicker";
import Modal from "../common/Modal";

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);
  const { theme, setTheme } = useTheme();
  // const user = useAuth({ middleware: "auth" });

  return (
    <header className="px-6 border-solid border-b border-gray-100 flex justify-between h-[65px] items-center bg-white shrink-0 dark:bg-black dark:border-dark">
      <div className="flex">
        <Link href="/">
          <Image className="h-10 w-10 mr-3" src={logo} alt="logo" />
        </Link>
        <div className="hidden md:flex">
          {pages.map((page) => (
            <Link
              key={page.title}
              href={page.to}
              className={`flex font-medium items-center py-[.65rem] px-[1.1rem] rounded mx-1 first:ml-0 hover:bg-light-gray hover:text-primary ${
                pathname === page.to
                  ? "bg-light-gray text-primary"
                  : "text-graytext"
              }`}
            >
              {page.title}
            </Link>
          ))}
          <button
            type="button"
            className="flex font-medium items-center py-[.65rem] px-[1.1rem] rounded mx-1 first:ml-0 hover:bg-light-gray hover:text-primary text-graytext"
            onClick={() => setModalOpen(true)}
          >
            О программе
          </button>
        </div>
      </div>
      <div className="items-center hidden md:flex">
        <LanguagePicker />
        <div className="w-11 h-11 hover:bg-gray-100 cursor-pointer flex items-center justify-center rounded mx-1">
          <Tooltip title="Уведомления">
            <FontAwesomeIcon icon={faMessage} className="w-6 h-6" />
          </Tooltip>
        </div>
        <Tooltip title="Сменить тему">
          <button
            type="button"
            className="w-11 h-11 hover:bg-gray-100 cursor-pointer flex items-center justify-center rounded mx-1"
            onClick={() => {
              toggleDarkMode();
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          >
            <FontAwesomeIcon icon={faCircleHalfStroke} className="w-6 h-6" />
          </button>
        </Tooltip>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => {
              setOpen(true);
            }}
            className="text-muted font-medium flex items-center hover:bg-[#f3f6f9] rounded p-2"
          >
            Привет,
            <span className="font-bold text-appgray mr-3 ml-1">
              Администратор
            </span>
            <Avatar
              variant="rounded"
              className="bg-[#c9f7f5] text-success h-[35px] w-[35px] text-xl font-medium"
            >
              A
            </Avatar>
          </button>
          <Drawer
            className="hidden md:block"
            anchor="right"
            onClose={() => setOpen(false)}
            open={open}
          >
            <CustomDrawer>
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-medium">Профиль пользователя</h2>
                <button
                  className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-300"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              <span className="text-lg">Права: администратор</span>
            </CustomDrawer>
          </Drawer>
        </div>
      </div>
      <button type="button" onClick={() => setOpen(true)} className="md:hidden">
        <FontAwesomeIcon className="w-7 h-7 hover:text-primary" icon={faBars} />
      </button>
      <Drawer
        anchor="left"
        onClose={() => setOpen(false)}
        open={open}
        className="md:hidden"
      >
        <CustomDrawer>
          {pages.map((page) => (
            <Link
              key={page.title}
              href={page.to}
              className={`flex font-medium items-center py-[.65rem] px-[1.1rem] rounded mx-1 first:ml-0 hover:bg-light-gray hover:text-primary ${
                pathname === page.to
                  ? "bg-light-gray text-primary"
                  : "text-graytext"
              }`}
              onClick={() => setOpen(false)}
            >
              {page.title}
            </Link>
          ))}
        </CustomDrawer>
      </Drawer>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="О программе"
      >
        <span>
          Разработка и исключительное авторское право: ООО &quot;Краммерти&quot;
        </span>
        <br />
        <span>Телефон поддержки: +7 (922) 343-76-77</span>
        <br />
        <span>Версия: v.2023.1.07</span>
        <br />
        <span>
          Web:{" "}
          <a href="https://krammerti.ru" target="_blank" rel="noreferrer">
            {" "}
            https://krammerti.ru
          </a>
        </span>
      </Modal>
    </header>
  );
}
