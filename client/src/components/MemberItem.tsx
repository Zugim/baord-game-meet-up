import { useState } from "react";

// types
import { User } from "../../globalTypes";

// styles
import "./MemberItem.css";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

type BoardGameItemProps = {
  member: User;
};

export default function BaordGameItem({ member }: BoardGameItemProps) {
  const [detailsHidden, setDetailsHidden] = useState<boolean>(true);

  return (
    <div className="member-item">
      <div
        className="member-name"
        onClick={() => setDetailsHidden(!detailsHidden)}
      >
        <h3>{member.username}</h3>
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
        <div className="member-details">
          {member.city && (
            <p>
              <span className="tag">Location: </span>
              {member.city}
            </p>
          )}
          {member.languages && (
            <p>
              <span className="tag">Languages Spoken: </span>
              {member.languages}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
