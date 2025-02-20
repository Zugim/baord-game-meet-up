import { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router";

// helpers
import { getUsersCollection, checkAuth, logout } from "../helpers/fetchHelpers";

//components
import Header from "./Header";
import Footer from "./Footer";
import BoardGameItem from "./BoardGameItem";
import Modal from "./Modal";
import AddGameToCollectionModal from "./AddGameToCollectionModal";

// types
import { BoardGame, CurrentUser } from "../../globalTypes";

// styles
import "./UserPage.css";

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
      <Header currentUser={currentUser} />
      <main>
        <h1>Hello {currentUser?.username}...</h1>
        <p>
          <span>Location: </span>
          {currentUser?.city}
        </p>
        <p>
          <span>Languages Spoken: </span>
          {currentUser?.languages}
        </p>
        <h2>Your Collection</h2>
        {collection?.map((boardGame) => (
          <BoardGameItem key={boardGame.id} boardGame={boardGame} />
        ))}
        <div className="user-controls">
          <button
            className="pop-btn"
            onClick={() =>
              setCurrentModal(
                <AddGameToCollectionModal
                  currentUser={currentUser}
                  setCollection={setCollection}
                  setCurrentModal={setCurrentModal}
                />
              )
            }
          >
            Add new game
          </button>
          <button
            onClick={async () => {
              await logout();
              setCurrentUser(await checkAuth());
              navigate("/", { replace: true });
            }}
          >
            Logout
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
