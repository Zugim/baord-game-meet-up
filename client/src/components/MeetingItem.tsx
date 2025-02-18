// types
import { Meeting } from "../../globalTypes";

// styles
import "./MeetingItem.css";

type MeetingItemProps = {
  meeting: Meeting;
};

export default function MeetingItem({ meeting }: MeetingItemProps) {
  return (
    <div className="meeting-item">
      <h2>{meeting.title}</h2>
      <p>{meeting.location}</p>
    </div>
  );
}
