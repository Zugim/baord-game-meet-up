//components
import MeetingItem from "./MeetingItem";

// types
import { Meeting } from "../../globalTypes";

type HomePageProps = {
  meetingData: Meeting[];
};

export default function HomePage({ meetingData }: HomePageProps) {
  return (
    <>
      <h1>Upcoming Board Game Meets</h1>
      {meetingData.map((meeting) => (
        <MeetingItem meeting={meeting} />
      ))}
    </>
  );
}
