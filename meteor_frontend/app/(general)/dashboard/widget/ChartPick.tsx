import InputRow from "@/app/components/common/InputRow";
import useNewWidgetStore from "@/app/store/newWidgetStore";
import React from "react";

export default function ChartPick() {
  const name = useNewWidgetStore((state) => state.name);
  const editedWidgetName = useNewWidgetStore((state) => state.editedWidgetName);
  const setName = useNewWidgetStore((state) => state.setName);

  return (
    <div className="w-[800px] m-auto my-[50px]">
      <InputRow
        label="Название виджета"
        type="text"
        handleChange={(event) => setName(event.target.value.trim())}
        defaultValue={name || editedWidgetName}
      />
    </div>
  );
}
