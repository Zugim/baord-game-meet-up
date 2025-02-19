// types
import { Meeting } from "../../globalTypes";

// styles
import "./TopThreeItem.css";

// images
import bg0 from "../assets/bg_0.jpg";
import bg1 from "../assets/bg_1.jpg";
import bg2 from "../assets/bg_2.jpg";

const imgArray = [bg0, bg1, bg2];

type TopThreeItemProps = {
  meeting: Meeting;
  imgIndex: number;
};

export default function TopThreeItem({ meeting, imgIndex }: TopThreeItemProps) {
  return (
    <div className="top-three-item">
      <img src={imgArray[imgIndex]} alt="" />
      <h2>{meeting.title}</h2>
      <p>{meeting.location}</p>
    </div>
  );
}
