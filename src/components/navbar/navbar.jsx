import { useContext } from "react";
import appContext from "../../context/app";
import ModeBtn from "../modeBtn/modeBtn";
const Navbar = () => {
  const context = useContext(appContext);
  return (
    <>
      <div>navbar</div>
      <ModeBtn />
    </>
  );
};

export default Navbar;
