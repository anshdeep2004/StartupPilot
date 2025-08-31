import React from "react";
import { Box } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { NonBinary } from "lucide-react";

const ProfileIcon = ({ userColor = "#A6453F", circleColor = "#FFA390" }) => {
  return (
    <div
      className="rounded-full p-0 flex items-center justify-center"
      style={{ backgroundColor: userColor }}
    >
      <AccountCircle
        className="!w-[50px] !h-[50px]"
        style={{ color: circleColor }}
      />
    </div>
  );
};

export default ProfileIcon;
