import { useState, useEffect } from "react";

// types
import { Meeting } from "../../globalTypes";

// styles
import "./MeetingItem.css";

type MeetingItemProps = {
  meeting: Meeting;
};

export default function MeetingItem({ meeting }: MeetingItemProps) {
  const [meetingDate, setMeetingDate] = useState<string>("");

  useEffect(() => {
    setMeetingDate(new Date(meeting.date as string).toLocaleDateString());
  }, []);

  return (
    <div className="meeting-item">
      <h2>{meeting.title}</h2>
      <div className="meeting-details">
        <p>
          <span className="tag">Location: </span>
          {meeting.location}
        </p>
        <p>
          <span className="tag">Date: </span>
          {meetingDate}
        </p>
      </div>
    </div>
  );
}
