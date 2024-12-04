import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { IPL_TEAMS } from '@/lib/constants';
import { IPLTeam } from '@/lib/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const assignRandomTeam = (): IPLTeam => {
  const randomIndex = Math.floor(Math.random() * IPL_TEAMS.length);
  return IPL_TEAMS[randomIndex];
};

export const getTeamById = (teamId: string): IPLTeam | undefined => {
  return IPL_TEAMS.find(team => team.id === teamId);
};