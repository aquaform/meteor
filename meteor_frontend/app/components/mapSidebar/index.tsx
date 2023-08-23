import useMonitoringStore from "@/app/store/monitoringStore";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { MouseEvent } from "react";

interface Props {
  points: Point[];
  handlePointClick: (point: Point) => void;
}

export default function MapSidebar({ points, handlePointClick }: Props) {
  const setIsEditModalOpen = useMonitoringStore(
    (state) => state.setIsEditModalOpen
  );
  const setSelectedPoint = useMonitoringStore(
    (state) => state.setSelectedPoint
  );

  const handleEditClick = (
    event: MouseEvent<HTMLButtonElement>,
    point: Point
  ) => {
    event.stopPropagation();

    setIsEditModalOpen(true);
    setSelectedPoint(point);
  };

  return (
    <div className="flex flex-col bg-white w-1/6 dark:bg-black">
      {points.map((point) => (
        // TODO: button inside button is a no-no, but using div instead of a button is also bad
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          className="p-2 hover:bg-gray-200 border-b border-gray-300 flex justify-between first:border-t dark:border-dark dark:hover:bg-dark-light cursor-pointer"
          onClick={() => handlePointClick(point)}
          key={point.id}
        >
          {point.name}
          <button
            type="button"
            className="rounded w-[20px] h-[20px] bg-gray-200 text-base hover:bg-gray-300 box-content p-1 dark:bg-dark-normal dark:hover:bg-primary"
            onClick={(event) => handleEditClick(event, point)}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
      ))}
      <Link href="/device" className="bg-gray-200 rounded p-2 dark:bg-dark-normal">
        Добавить новую метеостанцию
      </Link>
    </div>
  );
}
