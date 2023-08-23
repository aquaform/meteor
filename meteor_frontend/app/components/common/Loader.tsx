import { CircularProgress } from "@mui/material";
import React from "react";

type Props = {
  isActive: boolean;
};

export default function Loader({ isActive }: Props) {
  return (
    <div
      className={`absolute w-full h-full flex justify-center items-center bg-gray-400 bg-opacity-75 ${
        !isActive && "hidden"
      }`}
    >
      <CircularProgress />
    </div>
  );
}
