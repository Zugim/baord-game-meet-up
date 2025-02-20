export interface User {
  id: number;
  username: string;
  city: string;
  languages: string;
  status: string;
}

export interface Meeting {
  id: number;
  title: string;
  location: string;
  date: string;
  start_time: string;
  finish_time: string;
}

export interface BoardGame {
  id: number;
  name: string;
  primary_mechanic: string;
  theme: string;
  description: string;
}

export interface CurrentUser {
  id?: number;
  username?: string;
  city?: string;
  languages?: string;
  status: string;
}

export interface CurrentMeeting {
  id: number;
  title: string;
  location: string;
  date: string;
  start_time: string;
  finish_time: string;
}
