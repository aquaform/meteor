import InputRow from "@/app/components/common/InputRow";
import { getPointIndicators } from "@/app/helpers/helpers";
import fetchPoints from "@/app/hooks/fetch/fetchPoints";
import useNewWidgetStore from "@/app/store/newWidgetStore";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

export default function IndicatorPick() {
  const [newIndicatorName, setNewIndicatorName] = useState("");
  const [newIndicatorValue, setNewIndicatorValue] = useState(0);
  const pointsQuery = useQuery(["points"], () => fetchPoints(), {
    keepPreviousData: true,
  });
  const selectedPointId = useNewWidgetStore((state) => state.pointId);
  const selectedIndicators = useNewWidgetStore((state) => state.indicators);
  const editedWidgetName = useNewWidgetStore((state) => state.editedWidgetName);
  const customIndicators = useNewWidgetStore((state) => state.customIndicators);
  const setCustomIndicators = useNewWidgetStore(
    (state) => state.setCustomIndicators
  );
  const setSelectedIndicators = useNewWidgetStore(
    (state) => state.setIndicators
  );
  const selectedPoint = pointsQuery.data?.find(
    (point) => point.id === selectedPointId
  );
  let indicators: string[] = [];

  useEffect(() => {
    if (selectedPoint) {
      setSelectedIndicators(getPointIndicators(selectedPoint));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPoint]);

  if (selectedPoint) indicators = getPointIndicators(selectedPoint);

  const isValidName = !customIndicators.find(
    (indicator) => indicator.label === newIndicatorName
  );
  const isValidValue = /[+-]?([0-9]*[.])?[0-9]+/g.test(
    String(newIndicatorValue)
  );

  return (
    <div className="w-[800px] m-auto my-[50px]">
      <span className="pb-[10px]">Параметры</span>
      <br />
      <FormControlLabel
        label="Выбрать все параметры"
        control={
          <Checkbox
            checked={selectedIndicators.length === indicators.length}
            onChange={(event) => {
              if (event.target.checked) {
                setSelectedIndicators([...indicators]);
              } else {
                setSelectedIndicators([]);
              }
            }}
          />
        }
      />
      <hr />
      <FormGroup>
        {indicators.map((indicator) => (
          <FormControlLabel
            label={indicator}
            key={indicator}
            control={
              <Checkbox
                onChange={(event) => {
                  const newSelectedIndicators = [...selectedIndicators];
                  if (event.target.checked)
                    newSelectedIndicators.push(event.target.name);
                  else
                    newSelectedIndicators.splice(
                      newSelectedIndicators.indexOf(event.target.name),
                      1
                    );

                  setSelectedIndicators(newSelectedIndicators);
                }}
                name={indicator}
                checked={
                  !!selectedIndicators.find(
                    (selectedIndicator) => selectedIndicator === indicator
                  )
                }
              />
            }
          />
        ))}
        {customIndicators.map((indicator, index) => (
          <div className="flex justify-between">
            <FormControlLabel
              label={indicator.label}
              key={indicator.label}
              control={<Checkbox checked disabled />}
            />
            <button
              type="button"
              className="w-[25px] h-[25px] p-2 bg-gray-100 hover:bg-gray-300 flex items-center rounded"
              onClick={() => {
                customIndicators.splice(index, 1);
                setCustomIndicators(customIndicators);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
        <form
          onSubmit={(event) => {
            event.preventDefault();

            setCustomIndicators([
              ...customIndicators,
              { value: newIndicatorValue, label: newIndicatorName },
            ]);
          }}
        >
          <InputRow
            type="text"
            label="Название параметра"
            handleChange={(event) => setNewIndicatorName(event.target.value)}
            required
            className="mb-4"
            error={!isValidName}
          />
          <InputRow
            type="number"
            label="Значение"
            handleChange={(event) => setNewIndicatorValue(+event.target.value)}
            required
            className="mb-4"
            error={!isValidValue}
          />
          <button
            type="submit"
            className="p-4 bg-gray-100 hover:bg-gray-300 rounded disabled:bg-gray-400"
            disabled={!isValidName || !isValidValue}
          >
            Добавить новый параметр
          </button>
        </form>
      </FormGroup>
    </div>
  );
}
