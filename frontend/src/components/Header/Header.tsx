import itmoLogo from "../../assets/logo-itmo.svg";
import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="p-5 navbar bg-base-200 shadow flex items-center">
      <img className="block mb-[10px] w-32" src={itmoLogo} alt="" />
      <ul className="ml-4 menu menu-horizontal px-1">
        <li>
          <NavLink to="/mindmap" end>
            Граф
          </NavLink>
        </li>
        <li>
          <NavLink to="/glossary" end>
            Глоссарий
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
