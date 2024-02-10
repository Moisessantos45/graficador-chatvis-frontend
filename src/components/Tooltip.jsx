import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

const Tooltip_mui = ({ text, mouseX, mouseY, width, heigth }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMouseOver = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseOut = () => {
    setAnchorEl(null);
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{ position: "fixed", top: mouseY, left: mouseX }}
      className={`subir p-2 bg-blue-950 break-words text-white break-all flex justify-center items-center ${
        width ? width : "w-32"
      } ${heigth ? heigth : "h-7"}`}
    >
      {/* {text} */}
      <Tooltip open={Boolean(anchorEl)} anchorEl={anchorEl} leaveDelay={200}>
        
        <span className=" font-bold">{text}</span>
      </Tooltip>
    </div>
  );
};

export default Tooltip_mui;
