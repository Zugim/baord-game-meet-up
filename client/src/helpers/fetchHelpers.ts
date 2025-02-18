/* Helper function for fetching data */

console.log("ENVIRONMENT:", import.meta.env.MODE);

const URL = import.meta.env.VITE_BASE_URL;
console.log("URL:", URL);

// fetches related to users
export const getAllUserData = async () => {
  const response = await fetch(`${URL}/api/user`);
  const result = await response.json();

  return result;
};

// fetches users board game collection
export const getUsersCollection = async (id: number | undefined) => {
  const response = await fetch(`${URL}/api/user/${id}/board_game`);
  const result = await response.json();

  return result;
};

// add a game to the users board game collection
export const addGameToCollection = async (
  formData: FormData,
  id: number | undefined
) => {
  const response = await fetch(`${URL}/api/user/${id}/board_game/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      name: formData.get("name"),
      primary_mechanic: formData.get("primary-mechanic"),
      theme: formData.get("theme"),
      description: formData.get("description"),
    }),
  });
  const result = await response.json();

  return result;
};

// fetches related to meetings
export const getAllMeetingData = async () => {
  const response = await fetch(`${URL}/api/meeting`);
  const result = await response.json();

  return result;
};

export const getMeetingById = async (id: number | undefined) => {
  const response = await fetch(`${URL}/api/meeting/${id}`);
  const result = await response.json();

  return result;
};

// fetches meeting members
export const getMembers = async (id: number | undefined) => {
  const response = await fetch(`${URL}/api/meeting/${id}/user`);
  const result = await response.json();

  return result;
};

// add a member to a meeting
export const addMember = async (
  meetingId: number | undefined,
  userId: number | undefined
) => {
  const response = await fetch(
    `${URL}/api/meeting/${meetingId}/user/${userId}/add`,
    {
      method: "POST",
    }
  );
  const result = await response.json();

  return result;
};

// fetches related to board games
export const getAllBoardGameData = async () => {
  const response = await fetch(`${URL}/api/board_game`);
  const result = await response.json();

  return result;
};

// fetches realted to auth
// logs the user in
export const login = async (formData: FormData) => {
  const response = await fetch(`${URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: formData.get("username"),
      password: formData.get("password"),
    }),
    credentials: "include",
  });
  const result = await response.json();

  return result.user;
};

//registers the user
export const register = async (formData: FormData) => {
  const response = await fetch(`${URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: formData.get("username"),
      password: formData.get("password"),
      city: formData.get("city"),
    }),
    credentials: "include",
  });
  const result = await response.json();

  return result;
};

// logs out the user
export const logout = async () => {
  const response = await fetch(`${URL}/api/auth/logout`, {
    method: "DELETE",
    credentials: "include",
  });
  const result = await response.json();

  return result;
};

//checks if user is logged in and authorized
export const checkAuth = async () => {
  const response = await fetch(`${URL}/api/auth/user`, {
    credentials: "include",
  });
  const result = await response.json();

  if (result.message === "Unauthorized") {
    result.user = { status: "unauthed" };
  } else {
    result.user.status = "authed";
  }

  return result.user;
};
