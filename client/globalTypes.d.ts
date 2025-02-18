export interface User {
  id: number;
  username: string;
  city: string;
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
