import React from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDot,
  faDownload,
  faFileCirclePlus,
  faFilePen,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import ToDo from "../Todo/ToDo";

const Home = () => {
  return (
    <div className="padding-nav ">
      <ToDo></ToDo>
    </div>
  );
};

export default Home;
