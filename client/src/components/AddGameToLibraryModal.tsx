import { ReactNode } from "react";
import { useParams } from "react-router";

// helpers
import { getMeetingLibrary, addGameToLibrary } from "../helpers/fetchHelpers";

// styles
import "./AddGameToLibraryModal.css";

// types
import { BoardGame } from "../../globalTypes";

type AddGameToLibraryModalProps = {
  setLibrary: React.Dispatch<React.SetStateAction<BoardGame[] | null>>;
  setCurrentModal: React.Dispatch<React.SetStateAction<ReactNode>>;
};

export default function AddGameToLibraryModal({
  setLibrary,
  setCurrentModal,
}: AddGameToLibraryModalProps) {
  const params = useParams();
  const id = Number(params.id);

  return (
    <div className="add-new-game-modal">
      <h2>Add a New Game</h2>
      <form
        action={async (formData) => {
          await addGameToLibrary(formData, id);
          setLibrary(await getMeetingLibrary(id));
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
