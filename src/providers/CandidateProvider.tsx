import { ReactNode, createContext, useState } from "react";
import { Candidate } from "../interfaces/Candidate";
import { useHttp } from "../hooks/useHttp";
import { toast } from "react-toastify";

export type CandidateContetxtType = {
  clickedCandidate: Candidate | null;
  handleCandidateModalOpen: (candidate: Candidate) => void;
  handleCandidateModalClose: () => void;
  editCandidate: (candidate: Candidate) => Promise<boolean>;
};

interface CandidateProviderProps {
  children: ReactNode;
}

export const CandidateContext = createContext<CandidateContetxtType>(
  {} as CandidateContetxtType
);

const CandidateProvider = ({ children }: CandidateProviderProps) => {
  const [clickedCandidate, setClickedCandidate] = useState<Candidate | null>(
    null
  );
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const { get, post, put } = useHttp();

  const handleCandidateModalOpen = (candidate: Candidate) => {
    setClickedCandidate(candidate);
  };

  const handleCandidateModalClose = () => {
    setClickedCandidate(null);
  };

  const getCandidates = () => {
    get("/positions").then((res) => {
      if (res) {
        const candidatesList = res.data.sort(
          (a: Candidate, b: Candidate) => a.id - b.id
        );
        setCandidates(candidatesList);
      }
    });
  };

  const createCandidate = async (data: Candidate): Promise<boolean> => {
    let isSuccessful = false;

    await post("/candidates/createCandidate", data).then((res) => {
      if (res) {
        isSuccessful = true;
        toast.success("Candidate created Successfully!");
      }
    });
    return isSuccessful;
  };

  const editCandidate = async (data: Candidate): Promise<boolean> => {
    let isSuccessful = false;
    if (!clickedCandidate) return isSuccessful;
    await put("/candidates/editCandidate", data).then((res) => {
      if (res) {
        isSuccessful = true;
        toast.success("Candidate edited Successfully!");
        handleCandidateModalClose();
      }
    });
    return isSuccessful;
  };

  const value = {
    clickedCandidate,
    getCandidates,
    handleCandidateModalOpen,
    handleCandidateModalClose,
    createCandidate,
    editCandidate
  };

  return (
    <CandidateContext.Provider value={value}>
      {children}
    </CandidateContext.Provider>
  );
};

export default CandidateProvider;
