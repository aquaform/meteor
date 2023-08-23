import fetchPoints from "@/app/hooks/fetch/fetchPoints";
import useNewWidgetStore from "@/app/store/newWidgetStore";
import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, useEffect } from "react";

export default function PointPick() {
  const storePointId = useNewWidgetStore((state) => state.pointId);
  const editedWidgetName = useNewWidgetStore((state) => state.editedWidgetName);
  const setStorePointId = useNewWidgetStore((state) => state.setPointId);
  const pointsQuery = useQuery(["points"], () => fetchPoints(), {
    keepPreviousData: true,
  });

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStorePointId(+event.target.value);
  };

  useEffect(() => {
    if (!editedWidgetName) setStorePointId(pointsQuery.data?.at(0)?.id || 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointsQuery.data]);

  return (
    <div className="w-[800px] m-auto my-[50px]">
      <div className="flex justify-between items-center mb-4">
        <span className="basis-1/6">Устройство</span>
        <select
          onChange={handleChange}
          className="pt-3 pr-8 pb-3 pl-4 h-[40px] bg-white border border-secondary rounded focus:border-[#69b3ff] grow"
          value={storePointId}
        >
          {pointsQuery.data?.map((point) => (
            <option key={point.name} value={point.id}>
              {point.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between items-center">
        <span className="basis-1/6">Группировка данных</span>
        <select className="pt-3 pr-8 pb-3 pl-4 h-[40px] bg-white border border-secondary rounded focus:border-[#69b3ff] grow">
          <option value="hour">Час</option>
          <option value="day">День</option>
          <option value="week">Неделя</option>
          <option value="month">Месяц</option>
        </select>
      </div>
    </div>
  );
}
