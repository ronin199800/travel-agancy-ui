import { useContext } from "react";
import appContext from "../../context/app";
const NotFound = () => {
    const context = useContext(appContext)
    return ( <h1 className={`theme-text-${context.mode}`}>پیدا نشد</h1> );
}
 
export default NotFound;