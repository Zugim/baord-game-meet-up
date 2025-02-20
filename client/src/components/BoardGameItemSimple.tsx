import { ReactNode } from "react";

// helpers
import { addGameToLibrary, getMeetingLibrary } from "../helpers/fetchHelpers";

// types
import { BoardGame } from "../../globalTypes";

// styles
import "./BoardGameItemSimple.css";

type BoardGameItemProps = {
  id: number;
  boardGame: BoardGame;
  setLibrary: React.Dispatch<React.SetStateAction<BoardGame[] | null>>;
  setCurrentModal: React.Dispatch<React.SetStateAction<ReactNode>>;
};

export default function BoardGameSimpleItem({
  id,
  boardGame,
  setLibrary,
  setCurrentModal,
}: BoardGameItemProps) {
  return (
    <div className="board-game-item-simple">
      <h3
        onClick={async () => {
          await addGameToLibrary(boardGame, id);
          setLibrary(await getMeetingLibrary(id));
          setCurrentModal(null);
        }}
      >
        {boardGame.name}
      </h3>
    </div>
  );
}
