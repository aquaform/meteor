"use client";

import InputRow from "@/app/components/common/InputRow";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function Device() {
  const router = useRouter();

  return (
    <div className="bg-white w-full m-6 rounded p-[2.25rem]">
      <form
        onSubmit={(event) => {
          event.preventDefault();

          router.push("/");
        }}
      >
        <InputRow
          type="text"
          label="Имя"
          handleChange={() => {}}
          className="mb-4"
          required
        />
        <InputRow
          type="text"
          label="Широта"
          handleChange={() => {}}
          className="mb-4"
          required
        />
        <InputRow
          type="text"
          label="Долгота"
          handleChange={() => {}}
          className="mb-4"
          required
        />
        <InputRow
          type="text"
          label="MAC адрес"
          handleChange={() => {}}
          className="mb-4"
          required
        />
        <InputRow
          type="text"
          label="IP адрес"
          handleChange={() => {}}
          className="mb-4"
          required
        />
        <button
          type="submit"
          className="float-right rounded bg-gray-100 p-4 hover:bg-gray-300"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}
