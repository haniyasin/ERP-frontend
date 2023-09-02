import React, { ReactNode, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/useHttp";
import { Project } from "../interfaces/Project";
import { toast } from "react-toastify";

interface DeleteInformationProps {
  email: string;
  reason: string;
  document: Buffer | null;
}

export type ProjectContextType = {
  isLoading: boolean;
  openedProject: Project | null;
  handleProjectDashboardOpen: (project: Project) => void;
  handleProjectDashboardClose: () => void;
  projects: Project[];
  getProjects: () => void;
  getProjectById: (id: number) => Promise<Project>;
  deleteProject: (
    deleteInformation: DeleteInformationProps
  ) => Promise<Project | null>;
  editProject: (project: Project) => Promise<Project | null>;
  changeProjectPicture: (data: Buffer) => Promise<Project | null>;
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

  const { get, put } = useHttp();
  const navigate = useNavigate();

  const handleProjectDashboardOpen = (project: Project) => {
    setOpenedProject(project);
    navigate(`/project-dashboard/${project.id}`);
  };

  const handleProjectDashboardClose = () => {
    setOpenedProject(null);
    navigate("/hr");
  };

  const getProjects = async () => {
    get("/projects").then((res) => {
      if (res) {
        const projectsList = res.data.sort(
          (a: Project, b: Project) => a.id - b.id
        );
        setProjects(projectsList);
        setIsLoading(false);
      }
    });
  };

  const getProjectById = async (id: number) => {
    return await get(`projects/projectById/${id}`).then((res) => {
      if (res.data !== "") setOpenedProject(res.data);
      return res;
    });
  };

  const deleteProject = async (deleteInformation: DeleteInformationProps) => {
    if (!openedProject) return null;
    return await put(
      "/projects",
      deleteInformation,
      "multipart/form-data"
    ).then((res) => {
      if (res) {
        handleProjectDashboardClose();
        return res;
      }
    });
  };

  const editProject = async (inputData: Project) => {
    if (!openedProject) return null;
    return await put(`projects/${openedProject.id}`, inputData).then((res) => {
      if (res) {
        getProjects();
        toast.success("Successfully edited Project!");
        return res;
      }
    });
  };

  const changeProjectPicture = async (data: any) => {
    if (!openedProject) return null;
    return await put(
      `projects/picture/${openedProject.id}`,
      data,
      "multipart/form-data"
    ).then((res) => {
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
    deleteProject,
    editProject,
    changeProjectPicture
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export default ProjectProvider;
