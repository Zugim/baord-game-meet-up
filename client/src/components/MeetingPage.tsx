import { ReactNode, useState, useEffect } from "react";
import { useParams } from "react-router";

// helpers
import {
  getMeetingById,
  getMembers,
  addMember,
  getMeetingLibrary,
  checkAuth,
} from "../helpers/fetchHelpers";

//components
import Header from "./Header";
import Footer from "./Footer";
import Modal from "./Modal";
import AddGameToLibraryModal from "./AddGameToLibraryModal";

// types
import {
  User,
  CurrentUser,
  CurrentMeeting,
  BoardGame,
} from "../../globalTypes";

export default function MeetingPage() {
  const params = useParams();
  const id = Number(params.id);

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [currentMeeting, setCurrentMeeting] = useState<CurrentMeeting | null>(
    null
  );
  const [members, setMembers] = useState<User[] | null>(null);
  const [library, setLibrary] = useState<BoardGame[] | null>(null);
  const [currentModal, setCurrentModal] = useState<ReactNode | null>(null);

  useEffect(() => {
    (async () => setCurrentUser(await checkAuth()))();
    (async () => setCurrentMeeting(await getMeetingById(id)))();
  }, []);

  useEffect(() => {
    (async () => setMembers(await getMembers(id)))();
    (async () => setLibrary(await getMeetingLibrary(id)))();
  }, [currentMeeting]);

  return (
    <>
      {currentModal && (
        <Modal currentModal={currentModal} setCurrentModal={setCurrentModal} />
      )}
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
            <h2>Library</h2>
            {library?.map((board_game) => (
              <p key={board_game.id}>{board_game?.name}</p>
            ))}
            <button
              onClick={async () => {
                await addMember(currentMeeting.id, currentUser?.id);
                setMembers(await getMembers(id));
              }}
            >
              RSVP
            </button>
            <button
              onClick={() =>
                setCurrentModal(
                  <AddGameToLibraryModal
                    currentUser={currentUser}
                    setLibrary={setLibrary}
                    setCurrentModal={setCurrentModal}
                  />
                )
              }
            >
              Add new game
            </button>
          </>
        ) : (
          <h1>
            No meeting found here. I think you're lost!{" "}
            <span className="emoji">🗺️</span>{" "}
          </h1>
        )}
      </main>
      <Footer />
    </>
  );
}
