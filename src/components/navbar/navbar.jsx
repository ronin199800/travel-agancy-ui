import { useContext } from "react";
import appContext from "../../context/app";
const Navbar = () => {
    const context =useContext(appContext)
  return (
    <>
      <div>navbar</div>
      <button className="change-mode-btn" onClick={context.changeMode}>switch theme</button>
    </>
  );
};

export default Navbar;
