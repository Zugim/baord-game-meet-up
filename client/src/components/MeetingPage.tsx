import { ReactNode, useState, useEffect } from "react";
import { useParams } from "react-router";

// helpers
import {
  getMeetingById,
  getMembers,
  addMember,
  getMeetingLibrary,
  checkAuth,
  getUsersCollection,
} from "../helpers/fetchHelpers";

//components
import Header from "./Header";
import Footer from "./Footer";
import Modal from "./Modal";
import AddGameToLibraryModal from "./AddGameToLibraryModal";
import BoardGameItem from "./BoardGameItem";
import MemberItem from "./MemberItem";

// types
import {
  User,
  CurrentUser,
  CurrentMeeting,
  BoardGame,
} from "../../globalTypes";

// styles
import "./MeetingPage.css";

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
  const [isMember, setIsMember] = useState<boolean | undefined>(undefined);
  const [meetingDate, setMeetingDate] = useState<string>("");
  const [collection, setCollection] = useState<BoardGame[] | null>(null);

  let memberIds: number[] | undefined = [];

  useEffect(() => {
    (async () => setCurrentUser(await checkAuth()))();
    (async () => setCurrentMeeting(await getMeetingById(id)))();
    memberIds = members?.map((member) => member.id);
    setIsMember(memberIds?.includes(currentUser?.id as number));
  }, []);

  useEffect(() => {
    (async () => setMembers(await getMembers(id)))();
    (async () => setLibrary(await getMeetingLibrary(id)))();
    setMeetingDate(
      new Date(currentMeeting?.date as string).toLocaleDateString()
    );
  }, [currentMeeting]);

  useEffect(() => {
    if (currentUser?.id) {
      (async () => setCollection(await getUsersCollection(currentUser?.id)))();
    }
  }, [currentUser]);

  useEffect(() => {
    memberIds = members?.map((member) => member.id);
    setIsMember(memberIds?.includes(currentUser?.id as number));
  }, [members]);

  return (
    <>
      {currentModal && (
        <Modal currentModal={currentModal} setCurrentModal={setCurrentModal} />
      )}
      <Header currentUser={currentUser} />
      <main>
        {currentMeeting?.title ? (
          <>
            <div className="user-details">
              <h1>{currentMeeting?.title}</h1>
              <p>
                <span className="tag">Location: </span>
                {currentMeeting.location}
              </p>
              <p>
                <span className="tag">Date: </span>
                {meetingDate}
              </p>
              <p>
                <span className="tag">Start Time: </span>
                {currentMeeting.start_time}
              </p>
              <p>
                <span className="tag">Finish Time: </span>
                {currentMeeting.finish_time}
              </p>
            </div>
            <h2>Members</h2>
            {members?.map((member) => (
              <MemberItem member={member} />
            ))}
            <h2>Library</h2>
            {library?.map((boardGame) => (
              <BoardGameItem key={boardGame.id} boardGame={boardGame} />
            ))}
            {currentUser?.status === "authed" && (
              <div className="user-controls">
                {!isMember && (
                  <button
                    className="pop-btn"
                    onClick={async () => {
                      await addMember(currentMeeting.id, currentUser?.id);
                      setMembers(await getMembers(id));
                    }}
                  >
                    RSVP
                  </button>
                )}
                {isMember && (
                  <button
                    className="pop-btn"
                    onClick={() =>
                      setCurrentModal(
                        <AddGameToLibraryModal
                          setLibrary={setLibrary}
                          setCurrentModal={setCurrentModal}
                          collection={collection}
                        />
                      )
                    }
                  >
                    Add A New Game
                  </button>
                )}
              </div>
            )}
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
