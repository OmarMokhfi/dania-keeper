import { BiMenu, BiPlus, BiUser, BiMoon, BiSun } from "react-icons/bi";
import { useDispatch } from "react-redux";
import SideNav from "./SideNav";
import { ThemeContext } from "../contexts/Theme";
import { toggle } from "../features/taskForm";
import { useContext } from "react";

const NavigationBar = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="top-navigation">
        <button onClick={() => dispatch(toggle())}>
          <BiPlus size="20" className="top-navigation-icon" />
        </button>
        <button onClick={() => console.log("Upcoming feature..")}>
          <BiUser size="20" className="top-navigation-icon" />
        </button>
        <ThemeIcon />
      </div>
      <SideNav />
    </>
  );
};

const ThemeIcon = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  return (
    <span onClick={toggleDarkMode}>
      {isDarkMode ? (
        <BiMoon size="20" className="top-navigation-icon" />
      ) : (
        <BiSun size="20" className="top-navigation-icon" />
      )}
    </span>
  );
};

export default NavigationBar;
