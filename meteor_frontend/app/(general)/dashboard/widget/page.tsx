"use client";

import { Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import useNewWidgetStore from "@/app/store/newWidgetStore";
import { createNewWidget } from "@/app/helpers/helpers";
import { useRouter } from "next/navigation";
import PointPick from "./PointPick";
import ChartPick from "./ChartPick";
import IndicatorPick from "./IndicatorPick";

const steps = ["Выберите устройство", "Виджет", "Параметры"];

export default function WidgetWizard() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const chartType = "line";
  const {
    customIndicators,
    setCustomIndicators,
    pointId,
    setPointId,
    indicators,
    setIndicators,
    name,
    setName,
    editedWidgetName,
    setEditedWidgetName,
  } = useNewWidgetStore((state) => state);

  const renderActiveStep = () => {
    switch (activeStep) {
      case 0:
        return <PointPick />;
      case 1:
        return <ChartPick />;
      default:
        return <IndicatorPick />;
    }
  };

  const handleGoingBack = () => {
    if (activeStep) {
      setActiveStep(activeStep - 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handleGoingForward = () => {
    if (activeStep < 2) {
      setActiveStep(activeStep + 1);
    } else {
      const newWidget = createNewWidget(
        pointId,
        chartType,
        indicators,
        name || editedWidgetName,
        customIndicators
      );

      const localStorageWidgets: Widget[] = JSON.parse(
        localStorage.getItem("widgets") || "[]"
      );

      if (editedWidgetName)
        localStorageWidgets[
          localStorageWidgets.findIndex(
            (widget) => widget.name === editedWidgetName
          )
        ] = newWidget;
      else localStorageWidgets.push(newWidget);

      localStorage.setItem("widgets", JSON.stringify(localStorageWidgets));

      setCustomIndicators([]);
      setIndicators([]);
      setPointId(0);
      setEditedWidgetName("");
      setName("");

      router.push("/dashboard");
    }
  };

  return (
    <div className="m-6 p-4 bg-white w-full rounded">
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderActiveStep()}
      <hr className="w-[800px] block m-auto my-8" />
      <div className="w-[800px] m-auto flex justify-between">
        <button
          type="button"
          className="py-3 px-4 rounded bg-gray-200 text-base hover:bg-gray-300 mr-2 last:mr-0 disabled:bg-gray-400"
          onClick={handleGoingBack}
        >
          {activeStep ? "Назад" : "Отмена"}
        </button>
        <button
          type="button"
          className="py-3 px-4 rounded bg-gray-200 text-base hover:bg-gray-300 mr-2 last:mr-0 disabled:bg-gray-400"
          onClick={handleGoingForward}
          // TODO: or if same name as other widget
          disabled={activeStep === 1 && !name && !editedWidgetName}
        >
          {activeStep < 2 ? "Следующий шаг" : "Завершить"}
        </button>
      </div>
    </div>
  );
}
