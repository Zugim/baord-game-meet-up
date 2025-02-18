import { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router";

// helpers
import { getUsersCollection, checkAuth } from "../helpers/fetchHelpers";

//components
import Header from "./Header";
import Footer from "./Footer";
import Modal from "./Modal";
import AddGameModal from "./AddGameModal";

// types
import { BoardGame, CurrentUser } from "../../globalTypes";

export default function UserPage() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [collection, setCollection] = useState<BoardGame[] | null>(null);
  const [currentModal, setCurrentModal] = useState<ReactNode | null>(null);

  useEffect(() => {
    (async () => setCurrentUser(await checkAuth()))();
  }, []);

  useEffect(() => {
    if (currentUser?.id) {
      (async () => setCollection(await getUsersCollection(currentUser?.id)))();
    }
  }, [currentUser]);

  useEffect(() => {
    console.log("USER COLLECTION", collection);
  }, [collection]);

  // makes page private
  useEffect(() => {
    if (currentUser?.status === "unauthed") {
      navigate("/", { replace: true });
    }
  }, [currentUser]);

  return (
    <>
      {currentModal && (
        <Modal currentModal={currentModal} setCurrentModal={setCurrentModal} />
      )}
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main>
        {currentUser?.status !== "unauthed" && (
          <>
            <h2>Hello {currentUser?.username}...</h2>
            <p>{currentUser?.city}</p>
            <h2>Your Collection</h2>
            {collection?.map((boardGame) => (
              <p key={boardGame.id}>{boardGame.name}</p>
            ))}
          </>
        )}
        <button
          onClick={() =>
            setCurrentModal(
              <AddGameModal
                currentUser={currentUser}
                setCollection={setCollection}
                setCurrentModal={setCurrentModal}
              />
            )
          }
        >
          Add new game
        </button>
      </main>
      <Footer />
    </>
  );
}
