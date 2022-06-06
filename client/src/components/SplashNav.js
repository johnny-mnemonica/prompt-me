import LogInButton from "./LogInButton";
import { Link } from "react-router-dom";
import LogOutButton from "./LogOutButton";


const SplashNav = () => {
  return (
    <div>
      <LogInButton/>
      <LogOutButton/>
      <Link to="/about">
          About
      </Link>
    </div>
  );
}

export default SplashNav;
