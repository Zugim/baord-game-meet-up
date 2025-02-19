import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// helpers
import { addMeeting, checkAuth } from "../helpers/fetchHelpers";

//components
import Header from "./Header";
import Footer from "./Footer";

// types
import { CurrentUser } from "../../globalTypes";

export default function CreateMeetingPage() {
  const navigate = useNavigate();

  console.log("LOCATION:", location);

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    (async () => setCurrentUser(await checkAuth()))();
  }, []);

  // makes page private
  useEffect(() => {
    if (currentUser?.status === "unauthed") {
      navigate("/", { replace: true });
    }
  }, [currentUser]);

  return (
    <>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main>
        <h2>Create meeting</h2>
        <form
          action={async (formData) => {
            const { meetingId } = await addMeeting(formData, currentUser?.id);
            console.log("MEETING ID:", meetingId);
            navigate(`/meeting/${meetingId}`, { replace: true });
          }}
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Awesome Board game Meet"
            autoFocus
          />
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Where is your meet?"
          />
          <button type="submit">Register</button>
        </form>
      </main>
      <Footer />
    </>
  );
}
