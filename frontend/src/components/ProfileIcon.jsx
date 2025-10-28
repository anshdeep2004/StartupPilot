// import React from "react";
// import { Box } from "@mui/material";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import { NonBinary } from "lucide-react";

// const colorThemes = [
//   { userColor: "#A6453F", circleColor: "#FFA390" }, // default
//   { userColor: "#113E9A", circleColor: "#79B4FF" },
//   { userColor: "#9A3CB3", circleColor: "#EA9BF4" },
//   { userColor: "#1D1C78", circleColor: "#8171FF" },
//   { userColor: "#203291", circleColor: "#7B9CFF" },
// ];

// const ProfileIcon = ({ name = "", index=0 }) => {

//     const theme = colorThemes[index % colorThemes.length];
//     const firstName = name.trim().split(" ")[0];

//   return (
//     <div className="flex flex-col gap-2 justify-center items-center w-16">
//       <div
//         className="rounded-full p-0 flex items-center justify-center w-fit"
//         style={{ backgroundColor: theme.userColor }}
//       >
//         <AccountCircle
//           className="!w-[50px] !h-[50px]"
//           style={{ color: theme.circleColor }}
//         />
//       </div>
//       <div className="flex justify-center items-center text-xs font-semibold w-full text-center overflow-hidden text-ellipsis" title={name}>
//         {firstName}
//       </div>
//     </div>
//   );
// };

// export default ProfileIcon;

import React from "react";
import { Box } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { NonBinary } from "lucide-react";

const colorThemes = [
  { userColor: "#A6453F", circleColor: "#FFA390" }, // default
  { userColor: "#113E9A", circleColor: "#79B4FF" },
  { userColor: "#9A3CB3", circleColor: "#EA9BF4" },
  { userColor: "#1D1C78", circleColor: "#8171FF" },
  { userColor: "#203291", circleColor: "#7B9CFF" },
];

const ProfileIcon = ({ name = "", index = 0 }) => {
  const theme = colorThemes[index % colorThemes.length];
  const firstName = name.trim().split(" ")[0];

  // ✅ Dynamic size logic
  const isNameEmpty = !name.trim();
  const iconSize = isNameEmpty ? 55 : 50; // 30px if name empty, else 50px

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div
        className="rounded-full p-0 flex items-center justify-center w-fit"
        style={{
          backgroundColor: theme.userColor,
          width: `${iconSize}px`,
          height: `${iconSize}px`,
        }}
      >
        <AccountCircle
          style={{
            color: theme.circleColor,
            width: `${iconSize}px`,
            height: `${iconSize}px`,
          }}
        />
      </div>

      {!isNameEmpty && (
        <div
          className="flex justify-center items-center text-xs font-semibold w-full text-center overflow-hidden text-ellipsis"
          title={name}
        >
          {firstName}
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
