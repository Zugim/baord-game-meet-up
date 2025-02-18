import { useState, useEffect } from "react";
import { Link } from "react-router";

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
          <Link
            key={meeting.id}
            to={`/meeting/${meeting.id}`}
            state={meeting}
            className="btn-link"
          >
            <MeetingItem meeting={meeting} />
          </Link>
        ))}
      </main>
      <Footer />
    </>
  );
}
