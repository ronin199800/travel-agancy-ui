import { useContext } from "react";
import appContext from "../../context/app";
const Navbar = () => {
    const context =useContext(appContext)
  return (
    <>
      <div>navbar</div>
      <button onClick={context.changeMode}>switch theme</button>
    </>
  );
};

export default Navbar;
