import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import React, { useState } from "react";
import { DateTime } from "luxon";

type Props = {
  handleDateTimeRangePick: (
    fromDateTime: DateTime | null,
    toDateTime: DateTime | null
  ) => void;
};

export default function DateTimeRangePicker({
  handleDateTimeRangePick,
}: Props) {
  const [fromDateTime, setFromDateTime] = useState<DateTime | null>(null);
  const [toDateTime, setToDateTime] = useState<DateTime | null>(null);

  return (
    <div className="mb-4 flex">
      <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ru">
        <DateTimePicker
          value={fromDateTime}
          onChange={(newFromDateTime) => setFromDateTime(newFromDateTime!)}
          disableFuture
          ampm={false}
          label="От"
          maxDateTime={toDateTime}
          className="mr-4"
        />
        <DateTimePicker
          value={toDateTime}
          onChange={(newToDateTime) => setToDateTime(newToDateTime!)}
          disableFuture
          ampm={false}
          label="До"
          minDateTime={fromDateTime}
          className="mr-4"
        />
        <button
          className="py-2 px-3 rounded bg-gray-200 text-sm hover:bg-gray-300 mr-4"
          type="button"
          onClick={() => handleDateTimeRangePick(fromDateTime, toDateTime)}
        >
          Применить фильтр
        </button>
        <button
          className="py-2 px-3 rounded bg-gray-200 text-sm hover:bg-gray-300"
          type="button"
          onClick={() => {
            setFromDateTime(null);
            setToDateTime(null);

            handleDateTimeRangePick(null, null);
          }}
        >
          Сбросить фильтр
        </button>
      </LocalizationProvider>
    </div>
  );
}
