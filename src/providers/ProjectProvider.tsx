import React, { ReactNode, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/useHttp";
import { Project } from "../interfaces/Project";
import { toast } from "react-toastify";

export type ProjectContextType = {
  isLoading: boolean;
  openedProject: Project | null;
  handleProjectDashboardOpen: (project: Project) => void;
  handleProjectDashboardClose: () => void;
  projects: Project[];
  getProjects: () => void;
  getProjectById: (id: number) => Promise<void>;
  createProject: (data: Project) => Promise<boolean>;
  deleteProject: (deleteInformation: string) => Promise<Project | null>;
  editProject: (project: Project) => Promise<Project | null>;
};

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectContext = createContext<ProjectContextType>(
  {} as ProjectContextType
);

const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openedProject, setOpenedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  const { post, get, put, del } = useHttp();
  const navigate = useNavigate();

  const handleProjectDashboardOpen = (project: Project) => {
    setOpenedProject(project);
    navigate(`/project/${project.id}`);
  };

  const handleProjectDashboardClose = () => {
    setOpenedProject(null);
    navigate("/bdm/projects");
  };

  const getProjects = async () => {
    get("/projects").then((res) => {
      if (res) {
        setProjects(res.data);
        setIsLoading(false);
      }
    });
  };

  const getProjectById = async (id: number) => {
    await get(`projects/${id}`).then((res) => {
      if (res) setOpenedProject(res.data);
    });
  };

  const createProject = async (data: Project): Promise<boolean> => {
    return post("/projects", data).then((res) => {
      if (res) {
        getProjects();
        handleProjectDashboardClose();
        toast.success("Successfully created project");
        return true;
      } else {
        return false;
      }
    });
  };

  const deleteProject = async (id: string) => {
    if (!openedProject) return null;
    return await del(`/projects/${id}`).then((res) => {
      if (res) {
        handleProjectDashboardClose();
        return res;
      }
    });
  };

  const editProject = async (inputData: Project) => {
    if (!openedProject) return null;
    return await put(`projects/${openedProject.id}`, {
      ...inputData,
      id: inputData?.company?.id
    }).then((res) => {
      if (res) {
        getProjects();
        toast.success("Successfully edited Project!");
        return res;
      }
    });
  };

  const value = {
    isLoading,
    openedProject,
    handleProjectDashboardOpen,
    handleProjectDashboardClose,
    projects,
    getProjects,
    getProjectById,
    createProject,
    deleteProject,
    editProject
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export default ProjectProvider;
