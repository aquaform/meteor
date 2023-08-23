import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Menu,
  MenuItem,
  Modal,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import useHistoryStore from "@/app/store/historyStore";
import InputRow from "../common/InputRow";

interface HistoryModalProps {
  open: boolean;
  handleClose: () => void;
  points: Point[];
}

function HistoryModal({ open, handleClose, points }: HistoryModalProps) {
  const [modalColumns, setModalColumns] = useState(
    {} as { [key: string]: { active: boolean; unit: string } }
  );
  const setColumns = useHistoryStore((state) => state.setColumns);
  const selectedPointId = useHistoryStore((state) => state.selectedPointId);
  const setSelectedPointId = useHistoryStore(
    (state) => state.setSelectedPointId
  );

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedStationId = event.target.value;
    setSelectedPointId(+selectedStationId);

    const newModalColumns =
      points
        .find((point) => point.id === +selectedStationId)
        ?.current_values?.reduce(
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
            [key: string]: {
              active: boolean;
              unit: string;
            };
          }
        ) || {};
    setModalColumns(newModalColumns);
    setColumns(newModalColumns);
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newModalColumns = {
      ...modalColumns,
      [event.target.name]: {
        active: event.target.checked,
        unit: modalColumns[event.target.name].unit,
      },
    };

    setModalColumns(newModalColumns);
    setColumns(newModalColumns);
  };

  useEffect(() => {
    setSelectedPointId(points && points[0] && points[0].id);

    const newModalColumns =
      points[0]?.current_values?.reduce(
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
          [key: string]: {
            active: boolean;
            unit: string;
          };
        }
      ) || {};
    setModalColumns(newModalColumns);
    setColumns(newModalColumns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-6 rounded">
        <InputRow
          type="select"
          label="Метеостанция"
          options={points.map((point) => ({
            value: point.id,
            label: point.name,
          }))}
          handleChange={handleSelectChange}
          value={String(selectedPointId) ?? String(points.at(0)!.id)}
        />
        <FormControl>
          <FormControlLabel
            label="Выбрать все параметры"
            control={
              <Checkbox
                checked={
                  points.find((point) => point.id === selectedPointId)
                    ?.current_values?.length ===
                  Object.keys(modalColumns).reduce(
                    (acc, curr) => (modalColumns[curr].active ? acc + 1 : acc),
                    -1
                  )
                }
                onChange={(event) => {
                  if (event.target.checked) {
                    const newModalColumns = {
                      ...modalColumns,
                    };
                    Object.keys(newModalColumns).forEach((key) => {
                      newModalColumns[key].active = true;
                    });

                    newModalColumns["Время"] = { active: true, unit: "" };
                    setModalColumns(newModalColumns);
                    setColumns(newModalColumns);
                  } else {
                    const newModalColumns = { ...modalColumns };
                    Object.keys(newModalColumns).forEach((key) => {
                      newModalColumns[key].active = false;
                    });

                    newModalColumns["Время"] = { active: true, unit: "" };
                    setModalColumns(newModalColumns);
                    setColumns(newModalColumns);
                  }
                }}
              />
            }
          />
          <FormLabel component="legend">Выберите поля</FormLabel>
          <FormGroup>
            {Object.keys(modalColumns)
              .filter((column) => column !== "Время")
              .map((column) => (
                <FormControlLabel
                  key={column}
                  control={
                    <Checkbox
                      checked={modalColumns[column].active}
                      onChange={handleCheckboxChange}
                      name={column}
                    />
                  }
                  label={column}
                />
              ))}
          </FormGroup>
        </FormControl>
      </div>
    </Modal>
  );
}

export default function DesktopActions() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const points = useHistoryStore((state) => state.points);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`py-2 px-3 rounded bg-gray-200 text-sm hover:bg-gray-300 ${
          isOpen && "bg-gray-300"
        }`}
      >
        Действия <FontAwesomeIcon icon={faAngleDown} />
      </button>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem
          className="flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Изменить поля
        </MenuItem>
      </Menu>
      <HistoryModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        points={points}
      />
    </>
  );
}
