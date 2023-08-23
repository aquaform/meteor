"use client";

// TODO: currently, columns are being added/removed every time
// instead we should use tanstack table functionality for
// hiding/showing columns.

import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

import useHistoryStore from "@/app/store/historyStore";
import parseData from "@/app/helpers/renameMe";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Loader from "@/app/components/common/Loader";
import fetchPoints from "@/app/hooks/fetch/fetchPoints";
import Pagination from "./Pagination";
import DateTimeRangePicker from "./DateTimeRangePicker";

const fetchPointHistory: (options: {
  pageIndex: number;
  pageSize: number;
  selectedPointId: number | null;
  indicatorsCount: number;
  from: string | null;
  to: string | null;
}) => Promise<{ [key: string]: string | number }[]> = async ({
  pageIndex,
  pageSize,
  selectedPointId,
  indicatorsCount,
  from,
  to,
}) => {
  const urlToFetch = `/api/points/${selectedPointId ?? 1}?count_per_page=${
    pageSize * indicatorsCount
  }&page=${pageIndex}${from ? `&start_date=${from}&` : ""}${
    to ? `end_date=${to}` : ""
  }`;

  const res = await fetch(urlToFetch);
  const data = await res.json();

  return {
    tableData: parseData(data, indicatorsCount),
    meta: {
      pageCount: data.last_page,
      links: data.links,
    },
  };
};

export default function History() {
  const selectedPointId = useHistoryStore((state) => state.selectedPointId);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });

  const pointsQuery = useQuery(["points"], () => fetchPoints(), {
    keepPreviousData: true,
  });
  const indicatorsCount = pointsQuery.data?.find(
    (point) => point.id === selectedPointId
  )?.current_values?.length;

  const setPoints = useHistoryStore((state) => state.setPoints);
  const columns = useHistoryStore((state) => state.columns);
  const setColumns = useHistoryStore((state) => state.setColumns);
  const [from, setFrom] = useState<string | null>();
  const [to, setTo] = useState<string | null>();
  const fetchDataOptions = {
    pageIndex,
    pageSize,
    selectedPointId,
    indicatorsCount,
    from,
    to,
  };

  useEffect(() => {
    setColumns(
      pointsQuery.data?.at(0)?.current_values?.reduce(
        (accumulator, currentValue) => {
          accumulator[currentValue.name] = {
            active: true,
            unit: currentValue.unit,
          };

          return accumulator;
        },
        { Время: { active: true, unit: "" } } as {
          [key: string]: { active: boolean; unit: string };
        }
      ) ?? {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointsQuery.data]);

  const pointHistoryQuery = useQuery(
    ["pointHistory", fetchDataOptions],
    () => fetchPointHistory(fetchDataOptions),
    { keepPreviousData: true }
  );

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: pointHistoryQuery.data?.tableData ?? [],
    columns,
    pageCount: pointHistoryQuery.data?.pageCount ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  useEffect(() => {
    fetch("/api/points")
      .then((response) => response.json())
      .then((responseData) => {
        setPoints(responseData);
        return responseData;
      })
      // TODO: DRY - finding stuff for setColumns is used in HistoryActions too
      .then((responsePoints: Point[]) => {
        setColumns(
          responsePoints[0].current_values?.reduce(
            (accumulator, currentValue) => {
              accumulator[currentValue.name] = {
                active: true,
                unit: currentValue.unit,
              };

              return accumulator;
              // TODO: key can be changed from string to some measurement type
              // also that || is stupid :)
            },
            { Время: { active: true, unit: "" } } as {
              [key: string]: { active: boolean; unit: string };
            }
          ) || {}
        );
      });
  }, []);

  const handlePageClick = (pageUrl: string) => {
    const newPageIndex = pageUrl.split("=").pop()!;
    table.setPageIndex(+newPageIndex);
  };

  const handleDateTimeRangePick = (
    fromDateTime: DateTime | null,
    toDateTime: DateTime | null
  ) => {
    setFrom(
      fromDateTime &&
        fromDateTime
          .toUTC()
          .startOf("second")
          .toISO({ suppressMilliseconds: true })!
    );
    setTo(
      toDateTime &&
        toDateTime
          .toUTC()
          .startOf("second")
          .toISO({ suppressMilliseconds: true })!
    );
  };

  const selectedPoint = pointsQuery.data?.find(
    (point) => point.id === selectedPointId
  );

  return (
    <div className="flex flex-col m-6 bg-white rounded p-9 w-full dark:bg-black">
      <h2 className="font-bold text-2xl mb-4">
        {`${selectedPoint?.name} ${selectedPoint?.coord.lat} ${selectedPoint?.coord.lon}`}
      </h2>
      <DateTimeRangePicker handleDateTimeRangePick={handleDateTimeRangePick} />
      <div className="relative">
        <Loader isActive={pointHistoryQuery.isFetching} />
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 py-4 px-3"
                    align="left"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="odd:bg-gray-300">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 p-3"
                    align="left"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <Pagination
          links={pointHistoryQuery.data?.meta.links}
          handleClick={handlePageClick}
          pageIndex={pageIndex}
        />
        <FormControl className="w-[100px] h-[40px]">
          <InputLabel id="item-count-label">Показать</InputLabel>
          <Select
            labelId="item-count-label"
            value={pageSize}
            onChange={(event) => {
              table.setPageSize(+event.target.value);
              table.setPageIndex(1);
            }}
            className="h-[40px]"
            label="Показать"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
