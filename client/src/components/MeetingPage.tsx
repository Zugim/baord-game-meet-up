import { useState, useEffect } from "react";
import { useParams } from "react-router";

// helpers
import {
  getMeetingById,
  getMembers,
  addMember,
  checkAuth,
} from "../helpers/fetchHelpers";

//components
import Header from "./Header";
import Footer from "./Footer";

// types
import { User, CurrentUser, CurrentMeeting } from "../../globalTypes";

export default function MeetingPage() {
  const params = useParams();
  const id = Number(params.id);

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [currentMeeting, setCurrentMeeting] = useState<CurrentMeeting | null>(
    null
  );
  const [members, setMembers] = useState<User[] | null>(null);

  useEffect(() => {
    (async () => setCurrentUser(await checkAuth()))();
    (async () => setCurrentMeeting(await getMeetingById(id)))();
  }, []);

  useEffect(() => {
    (async () => setMembers(await getMembers(id)))();
  }, [currentMeeting]);

  return (
    <>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main>
        {currentMeeting?.title ? (
          <>
            <h2>{currentMeeting?.title}</h2>
            <p>{currentMeeting?.location}</p>
            <h2>Members</h2>
            {members?.map((member) => (
              <p key={member.id}>{member.username}</p>
            ))}
            <button
              onClick={async () => {
                await addMember(currentMeeting.id, currentUser?.id);
                setMembers(await getMembers(id));
              }}
            >
              RSVP
            </button>
          </>
        ) : (
          <h1>
            No board game found here. I think you're lost!{" "}
            <span className="emoji">🗺️</span>{" "}
          </h1>
        )}
      </main>
      <Footer />
    </>
  );
}
