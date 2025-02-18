import { useState, useEffect } from "react";

// helpers
import { checkAuth } from "../helpers/fetchHelpers";

//components
import Header from "./Header";
import MeetingItem from "./MeetingItem";
import Footer from "./Footer";

// types
import { Meeting, CurrentUser } from "../../globalTypes";

type HomePageProps = {
  meetingData: Meeting[] | null;
};

export default function HomePage({ meetingData }: HomePageProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    (async () => setCurrentUser(await checkAuth()))();
  }, []);

  return (
    <>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main>
        <h1>Upcoming Board Game Meets</h1>
        {meetingData?.map((meeting) => (
          <MeetingItem key={meeting.id} meeting={meeting} />
        ))}
      </main>
      <Footer />
    </>
  );
}
