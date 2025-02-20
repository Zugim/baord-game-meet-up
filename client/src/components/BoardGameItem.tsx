import { useState } from "react";

// types
import { BoardGame } from "../../globalTypes";

// styles
import "./BoardGameItem.css";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

type BoardGameItemProps = {
  boardGame: BoardGame;
};

export default function BaordGameItem({ boardGame }: BoardGameItemProps) {
  const [detailsHidden, setDetailsHidden] = useState<boolean>(true);

  return (
    <div className="board-game-item">
      <div
        className="board-game-title"
        onClick={() => setDetailsHidden(!detailsHidden)}
      >
        <h3>{boardGame.name}</h3>
      </div>
      {detailsHidden && (
        <div
          className="dropdown-hint"
          onClick={() => setDetailsHidden(!detailsHidden)}
        >
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      )}
      {!detailsHidden && (
        <div className="board-game-details">
          <p>
            <span>Primary Mechanic: </span>
            {boardGame.primary_mechanic}
          </p>
          {boardGame.theme && (
            <p>
              <span>Theme: </span>
              {boardGame.theme}
            </p>
          )}
          {boardGame.description && (
            <p>
              <span>Description: </span>
              {boardGame.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
