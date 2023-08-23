"use client";

import React, { useEffect, useRef, useState } from "react";
import Map, { MapRef, MapboxEvent, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import useAppStore from "@/app/store/appStore";
import MapSidebar from "@/app/components/mapSidebar";
import useMonitoringStore from "@/app/store/monitoringStore";
import InputRow from "@/app/components/common/InputRow";
import { useTheme } from "next-themes";
import Modal from "@/app/components/common/Modal";

// TODO: get map using destructuring - dunno correct generics for Map class
const changeMapLanguage = (mapEvent: MapboxEvent) => {
  const map = mapEvent.target;

  map.getStyle().layers.forEach((layer) => {
    if (layer.id.endsWith("-label")) {
      map.setLayoutProperty(layer.id, "text-field", [
        "coalesce",
        ["get", "name_ru"],
        ["get", "name"],
      ]);
    }
  });
};

export default function Monitoring() {
  const [points, setPoints] = useState<Point[]>([]);
  const [popupInfo, setPopupInfo] = useState<Point | null>(null);
  const [isPickingCoordinates, setIsPickingCoordinates] = useState(false);
  const [pickedLng, setPickedLng] = useState<number>();
  const [pickedLat, setPickedLat] = useState<number>();
  const mapRef = useRef<MapRef>(null);
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const selectedPoint = useMonitoringStore((state) => state.selectedPoint);
  const isEditModalOpen = useMonitoringStore((state) => state.isEditModalOpen);
  const { theme, setTheme } = useTheme();
  // const isPickingCoordinates = useMonitoringStore(
  //   (state) => state.isPickingCoordinates
  // );
  const setIsEditModalOpen = useMonitoringStore(
    (state) => state.setIsEditModalOpen
  );

  useEffect(() => {
    mapRef.current?.resize();
  }, [isPickingCoordinates]);

  useEffect(() => {
    fetch("/api/points")
      .then((response) => response.json())
      .then((data) => setPoints(data));
  }, []);

  const moveToPoint = (point: Point) => {
    mapRef.current?.flyTo({ center: point.coord, zoom: 12 });
    setPopupInfo(point);
  };
  return (
    <div className="flex w-full">
      <MapSidebar points={points} handlePointClick={moveToPoint} />
      <div
        className={`flex-1 ${!isPickingCoordinates && "m-6"} ${
          isPickingCoordinates &&
          // TODO: Cursor not working
          "absolute w-full h-full z-50 top-0 cursor-crosshair"
        }`}
      >
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: 73.400446,
            latitude: 61.25755,
            zoom: 12,
          }}
          style={{ width: "100%" }}
          mapStyle={`mapbox://styles/mapbox/${theme}-v10`}
          // mapboxAccessToken="pk.eyJ1IjoicmVtbWFyazk5OSIsImEiOiJjam1ocTJ1MW4yZjZhM3ZsaDBwYXRxd3FuIn0.hAlMGVhoN6VT38mDK1g8SA"
          mapboxAccessToken="pk.eyJ1Ijoia2luZ2VyaW5vIiwiYSI6ImNsajZ1anNhMjBxNHUzcG54bmE5a3F6YnYifQ.H_p0-1laA3LIO5D4C7LobQ"
          interactiveLayerIds={["test2"]}
          onStyleData={changeMapLanguage}
          onClick={(event) => {
            if (isPickingCoordinates) {
              setIsPickingCoordinates(false);

              setPickedLat(event.lngLat.lat);
              setPickedLng(event.lngLat.lng);
            }
          }}
        >
          {points.map((point) => (
            <Marker
              longitude={point.coord.lon}
              latitude={point.coord.lat}
              key={point.id}
              onClick={(event) => {
                event.originalEvent.stopPropagation();
                setPopupInfo(point);
              }}
            >
              <div className="w-5 h-5 bg-red-500 border-2 border-white rounded-full hover:cursor-pointer" />
            </Marker>
          ))}
          {popupInfo && (
            <Popup
              longitude={popupInfo.coord.lon}
              latitude={popupInfo.coord.lat}
              onClose={() => setPopupInfo(null)}
              maxWidth="500px"
            >
              <span>{popupInfo.name}</span>
              {popupInfo.current_values ? (
                popupInfo.current_values.map((data) => (
                  <div>
                    <span>{data.name}:</span>{" "}
                    <span>
                      {data.value} {data.unit}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex justify-center">Нет данных</div>
              )}
            </Popup>
          )}
        </Map>
        <Modal
          open={isEditModalOpen && !isPickingCoordinates}
          onClose={() => setIsEditModalOpen(false)}
          title="Редактировать"
        >
          <InputRow
            type="text"
            label="Название"
            defaultValue={selectedPoint?.name}
            handleChange={() => {}}
            className="mb-4"
          />
          <InputRow
            type="text"
            label="Широта"
            handleChange={(event) => {
              setPickedLat(+event.target.value);
            }}
            className="mb-4"
            value={String(pickedLat || selectedPoint?.coord.lat)}
          />
          <InputRow
            type="text"
            label="Долгота"
            handleChange={(event) => {
              setPickedLng(+event.target.value);
            }}
            className="mb-4"
            value={String(pickedLng || selectedPoint?.coord.lon)}
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setIsPickingCoordinates(true)}
              className="py-3 px-4 rounded bg-gray-200 text-base hover:bg-gray-300 mr-2 last:mr-0 disabled:bg-gray-400"
            >
              Выбрать на карте
            </button>
            <button
              type="button"
              className="py-3 px-4 rounded bg-gray-200 text-base hover:bg-gray-300 mr-2 last:mr-0 disabled:bg-gray-400"
            >
              Сохранить
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
