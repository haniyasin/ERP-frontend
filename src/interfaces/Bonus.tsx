import { User } from "./User";

export interface Bonus {
  id: number,
  date: Date,
  type: BonusType,
  amount: number,
  document: any,
  user: User,
}

export enum BonusType {
  PERF = 'Performance',
  ANNUAL = 'Annual',
  SIGN_ON = "Sign-on",
  OTHER = "Other",
}

export const bonuses: BonusType[] = [BonusType.PERF, BonusType.ANNUAL, BonusType.SIGN_ON, BonusType.OTHER]
