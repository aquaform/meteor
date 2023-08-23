import React from "react";
import { Modal as MuiModal } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ open, onClose, children, title }: Props) {
  return (
    <MuiModal open={open} onClose={onClose}>
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-6 rounded max-w-sm min-w-[400px]">
        <div className="flex justify-between">
          {title && <h3 className="font-bold text-xl mr-8 mb-4">{title}</h3>}
          <button
            type="button"
            onClick={onClose}
            className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-300"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        {children}
      </div>
    </MuiModal>
  );
}
