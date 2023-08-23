"use client";

import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPencil } from "@fortawesome/free-solid-svg-icons";

import useDashboardStore from "@/app/store/dashboardStore";
import CustomMenu from "@/app/components/common/Menu";
import { useRouter } from "next/navigation";
import useNewWidgetStore from "@/app/store/newWidgetStore";
import WidgetChart from "./WidgetChart";

import "@/node_modules/react-grid-layout/css/styles.css";
import "@/node_modules/react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Desktop() {
  const router = useRouter();
  const widgets: Widget[] = JSON.parse(
    typeof window !== "undefined"
      ? (localStorage && localStorage.getItem("widgets")) ?? "[]"
      : "[]"
  );
  const {
    setEditedWidgetName,
    setPointId,
    setIndicators,
    setCustomIndicators,
    setChartType,
  } = useNewWidgetStore((state) => state);

  return (
    <ResponsiveGridLayout
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
      className="m-6 w-full"
    >
      {widgets.map((widget, index) => (
        <div
          className="bg-white rounded p-2 flex flex-col dark:bg-black"
          key={widget.name}
          data-grid={{
            x: (index * 4) % 12,
            y: index / 3,
            w: 4,
            h: 3,
            minW: 3,
            minH: 2,
          }}
        >
          <div className="text-xl font-bold block text-center h-[60px] leading-[60px] hover:cursor-move flex justify-between px-6 items-center">
            <span>{widget.name}</span>
            <CustomMenu
              buttonClassName="w-10 h-10 flex items-center justify-center rounded hover:text-primary hover:bg-[#e1f0ff]"
              buttonContent={<FontAwesomeIcon icon={faEllipsis} />}
              isOpenStyles="bg-[#e1f0ff] text-primary"
              menuItems={[
                <button
                  type="button"
                  onClick={() => {
                    setEditedWidgetName(widget.name);
                    setChartType(widget.chartType);
                    setIndicators(widget.indicators);
                    setCustomIndicators(widget.customIndicators);
                    setPointId(widget.pointId);

                    router.push("/dashboard/widget");
                  }}
                >
                  <FontAwesomeIcon icon={faPencil} className="mr-2" />
                  Редактировать
                </button>,
              ]}
            />
          </div>
          <div className="grow shrink basis-[auto] min-w-0 min-h-0">
            <WidgetChart widget={widget} />
          </div>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}
