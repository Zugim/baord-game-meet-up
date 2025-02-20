import { ReactNode } from "react";
import { useParams } from "react-router";

// helpers
import { getMeetingLibrary, addGameToLibrary } from "../helpers/fetchHelpers";

//components
import BoardGameItemSimple from "./BoardGameItemSimple";

// types
import { BoardGame } from "../../globalTypes";

// styles
import "./AddGameToLibraryModal.css";

type AddGameToLibraryModalProps = {
  setLibrary: React.Dispatch<React.SetStateAction<BoardGame[] | null>>;
  setCurrentModal: React.Dispatch<React.SetStateAction<ReactNode>>;
  collection: BoardGame[] | null;
};

export default function AddGameToLibraryModal({
  setLibrary,
  setCurrentModal,
  collection,
}: AddGameToLibraryModalProps) {
  const params = useParams();
  const id = Number(params.id);

  return (
    <div className="add-new-game-modal">
      <h2>Add a New Game</h2>
      {collection?.map((boardGame) => (
        <BoardGameItemSimple
          key={boardGame.id}
          id={id}
          boardGame={boardGame}
          setLibrary={setLibrary}
          setCurrentModal={setCurrentModal}
        />
      ))}
    </div>
  );
}

{
  /* <form
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
</form>; */
}
