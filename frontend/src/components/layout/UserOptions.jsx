import  { useState } from "react";
import "./useroptions.css";
import { Avatar, SpeedDial, SpeedDialAction } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/userSlice";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const UserOptions = ({ user }) => {

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();


  const options = [
    { icon: <PersonIcon />, name: "Profile", func: profile },
    { icon: <EmailOutlinedIcon />, name: "Email", func: email },
    { icon: <ExitToAppIcon />, name: "Logout", func: logout },
  ];

  if (user) {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/");
  }
  function profile() {
    navigate("/profile");
  }
  function email() {
    navigate("/emails");
  }

  function logout() {
    dispatch(logoutUser());
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <Avatar
            sx={{ backgroundColor: "#DFF2FF", color: "#3e6fe1" }}
          >{`${user.name[0]}`}</Avatar>
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
