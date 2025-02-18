export interface User {
  id: number;
  username: string;
  city: string;
  status: string;
}

export interface Meeting {
  id: number;
  title: string;
  location: string;
}

export interface BoardGame {
  id: number;
  name: string;
  primary_description: string;
  theme: string;
  description: string;
}

export interface CurrentUser {
  id?: number;
  username?: string;
  city?: string;
  status: string;
}

export interface CurrentMeeting {
  id: number;
  title: string;
  location: string;
}
