import React from "react";
import { ReactNode, createContext, useState } from "react";
import { useHttp } from "../hooks/useHttp";
import { toast } from "react-toastify";
import { Position } from "../interfaces/Position";
import { useNavigate } from "react-router-dom";

export type PositionContextType = {
  clickedPosition: Position | null;
  handlePositionDashboardOpen: (position: Position) => void;
  handlePositionDashboardClose: () => void;
  positions: Position[];
  getPositions: () => void;
  createPosition: (position: Position) => Promise<boolean>;
};

interface PositionProviderProps {
  children: ReactNode;
}

const defaultContext = {};

export const PositionContext = createContext<PositionContextType>(
  defaultContext as PositionContextType
);

const PositionProvider = ({ children }: PositionProviderProps) => {
  const [clickedPosition, setClickedPosition] = useState<Position | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);

  const { get, post, put } = useHttp();
  const navigate = useNavigate();

  const handlePositionDashboardOpen = (position: Position) => {
    setClickedPosition(position);
    navigate(`/position-dashboard/${position?.id}`);
  };

  const handlePositionDashboardClose = () => {
    setClickedPosition(null);
    navigate("/hr");
  };

  const getPositions = () => {
    get("/positions").then((res) => {
      if (res) {
        const positionsList = res.data.sort(
          (a: Position, b: Position) => a.id - b.id
        );
        setPositions(positionsList);
      }
    });
  };

  const getPositionById = async (id: number) => {
    await get(`positions/positionById/${id}`).then((res) => {
      if (res) {
        setClickedPosition(res.data);
      }
    });
  };

  const createPosition = async (data: Position): Promise<boolean> => {
    let isSuccessful = false;

    await post("/positions/createPosition", data).then((res) => {
      if (res) {
        isSuccessful = true;
        toast.success("Position created Successfully!");
      }
    });
    return isSuccessful;
  };

  const editPosition = async (data: Position): Promise<boolean> => {
    let isSuccessful = false;
    if (!clickedPosition) return isSuccessful;
    await put(`positions/${clickedPosition.id}`, data).then((res) => {
      if (res) {
        isSuccessful = true;
        getPositions();
        toast.success("Position edited Successfully!");
      }
    });
    return isSuccessful;
  };

  const value = {
    clickedPosition,
    handlePositionDashboardOpen,
    handlePositionDashboardClose,
    positions,
    getPositions,
    getPositionById,
    createPosition,
    editPosition
  };

  return (
    <PositionContext.Provider value={value}>
      {children}
    </PositionContext.Provider>
  );
};

export default PositionProvider;
