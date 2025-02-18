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

// fetches related to meetings
export const getAllMeetingData = async () => {
  const response = await fetch(`${URL}/api/meeting`);
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
  console.log(result.message, result.user);
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
  console.log(result.message, result.user);
  return result;
};

// logs out the user
export const logout = async () => {
  const response = await fetch(`${URL}/api/auth/logout`, {
    method: "DELETE",
    credentials: "include",
  });
  const result = await response.json();
  console.log(result.message, result.user);
  return result;
};

//checks if user is logged in and authorized
export const checkAuth = async () => {
  const response = await fetch(`${URL}/api/auth/user`, {
    credentials: "include",
  });
  const result = await response.json();
  console.log(result.message, result.user);

  if (result.message === "Unauthorized") {
    result.user = { status: "unauthed" };
  } else {
    result.user.status = "authed";
  }

  return result.user;
};
