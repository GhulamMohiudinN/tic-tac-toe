import React, { useState } from "react";
import Cupblue from "../assets/cup-blue.png";
import Cup from "../assets/cup.png";
import Gitblue from "../assets/github-blue.png";
import Git from "../assets/github.png";
import Reactblue from "../assets/react-blue.png";
import ReactI from "../assets/react.png";
import Settingblue from "../assets/setting-blue.png";
import Setting from "../assets/setting.png";

const images = [
  { id: 1, simple: Cupblue, hover: Cup, alternate: "cup" },
  { id: 2, simple: Gitblue, hover: Git, alternate: "github" },
  { id: 3, simple: Reactblue, hover: ReactI, alternate: "react" },
  { id: 4, simple: Settingblue, hover: Setting, alternate: "setting" },
];

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(null);
  return (
    <>
      <div className="bg-[#1a1a1e] lg:p-1 p-3 mt-2 w-[95%] mx-auto rounded-xl lg:w-fit lg:mx-1 lg:h-[525px]">
        <div className="flex mx-auto gap-5 lg:flex-col lg:gap-1.5 w-fit">
          {images.map((image) => (
            <div
              key={image.id}
              className="cursor-pointer border border-[#202124] lg:w-fit bg-[#202124] p-2.5 rounded-xl hover:bg-[#16bdca] hover:border-[#16bdca]"
              onMouseEnter={() => setIsHovered(image.hover)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <img
                className="w-[25px]"
                src={isHovered === image.hover ? image.hover : image.simple}
                alt={image.alternate}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
