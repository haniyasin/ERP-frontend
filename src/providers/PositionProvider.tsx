import React from "react";
import { ReactNode, createContext, useState } from "react";
import { useHttp } from "../hooks/useHttp";
import { toast } from "react-toastify";
import { Position } from "../interfaces/Position";
import { useNavigate } from "react-router-dom";

export type PositionContextType = {
  isLoading: boolean;
  clickedPosition: Position | null;
  handlePositionDashboardOpen: (position: Position) => void;
  handlePositionDashboardClose: () => void;
  positions: Position[];
  getPositions: () => void;
  getPositionsByCompany: (companyId: number) => void;
  getPositionsByProject: (projectId: number) => void;
  createPosition: (position: Position) => Promise<boolean>;
  editPosition: (position: Position) => Promise<boolean>;
  deletePosition: () => Promise<boolean>;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { get, post, put, del } = useHttp();
  const navigate = useNavigate();

  const handlePositionDashboardOpen = (position: Position) => {
    setClickedPosition(position);
    navigate(`/position/${position?.id}`);
  };

  const handlePositionDashboardClose = () => {
    setClickedPosition(null);
    navigate("/hr/positions");
  };

  const getPositions = () => {
    get("/positions").then((res) => {
      if (res) {
        const positionsList = res.data.sort(
          (a: Position, b: Position) => a.id - b.id
        );
        setPositions(positionsList);
        setIsLoading(false);
      }
    });
  };

  const getPositionsByCompany = (companyId: number) => {
    get(`/positions/byCompany/${companyId}`).then((res) => {
      if (res) {
        const positionsList = res.data.sort(
          (a: Position, b: Position) => a.id - b.id
        );
        setPositions(positionsList);
        setIsLoading(false);
      }
    });
  };

  const getPositionsByProject = (projectId: number) => {
    get(`/positions/byProject/${projectId}`).then((res) => {
      if (res) {
        const positionsList = res.data.sort(
          (a: Position, b: Position) => a.id - b.id
        );
        setPositions(positionsList);
        setIsLoading(false);
      }
    });
  };

  const getPositionById = async (id: number) => {
    await get(`positions/${id}`).then((res) => {
      if (res) {
        setClickedPosition(res.data);
        setIsLoading(false);
      }
    });
  };

  const createPosition = async (data: Position): Promise<boolean> => {
    let isSuccessful = false;

    await post("/positions", data).then((res) => {
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
    await put(`/positions/${clickedPosition.id}`, data).then((res) => {
      if (res) {
        isSuccessful = true;
        getPositions();
        toast.success("Position edited Successfully!");
      }
    });
    return isSuccessful;
  };

  const deletePosition = async (): Promise<boolean> => {
    const deletePositionDto = {
      companyId: clickedPosition?.company.id,
      projectId: clickedPosition?.project?.id
    };
    let isSuccessful = false;
    if (!clickedPosition) return isSuccessful;
    await del(`/positions/${clickedPosition.id}`, deletePositionDto).then(
      (res) => {
        if (res) {
          toast.success("Position deleted Successfully!");
          isSuccessful = true;
          getPositions();
        }
      }
    );

    return isSuccessful;
  };

  const value = {
    isLoading,
    clickedPosition,
    handlePositionDashboardOpen,
    handlePositionDashboardClose,
    positions,
    getPositions,
    getPositionsByCompany,
    getPositionsByProject,
    getPositionById,
    createPosition,
    editPosition,
    deletePosition
  };

  return (
    <PositionContext.Provider value={value}>
      {children}
    </PositionContext.Provider>
  );
};

export default PositionProvider;
