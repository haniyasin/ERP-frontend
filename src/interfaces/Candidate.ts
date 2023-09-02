import { Position } from "./Position";
import { User } from "./User";

export interface Candidate {
  id: number;
  positionId: number;
  name: string;
  appliedOn: string;
  acceptedOn: string;
  status: string;
  cv: any;
  position: Position;
  user: User;
}
