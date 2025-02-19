import { ReactNode } from "react";

// helpers
import {
  getUsersCollection,
  addGameToCollection,
} from "../helpers/fetchHelpers";

// styles
import "./AddGameToCollectionModal.css";

// types
import { BoardGame, CurrentUser } from "../../globalTypes";

type AddGameToCollectionModalProps = {
  currentUser: CurrentUser | null;
  setCollection: React.Dispatch<React.SetStateAction<BoardGame[] | null>>;
  setCurrentModal: React.Dispatch<React.SetStateAction<ReactNode>>;
};

export default function AddGameToCollectionModal({
  currentUser,
  setCollection,
  setCurrentModal,
}: AddGameToCollectionModalProps) {
  return (
    <div className="add-new-game-modal">
      <h2>Add a New Game</h2>
      <form
        action={async (formData) => {
          await addGameToCollection(formData, currentUser?.id);
          setCollection(await getUsersCollection(currentUser?.id));
          setCurrentModal(null);
        }}
      >
        <label htmlFor="name">Name</label>
        <input type="text" name="name" placeholder="Catan" autoFocus />

        <label htmlFor="primary-mechanic">Primary Mechanic</label>
        <input type="text" name="primary-mechanic" placeholder="Auction" />

        <label htmlFor="theme">Theme</label>
        <input type="text" name="theme" placeholder="Sci-fi" />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          placeholder="What kind of game is it..."
        />

        <button type="submit">Add new game</button>
      </form>
    </div>
  );
}
