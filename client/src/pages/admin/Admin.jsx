import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import path from "../../utils/paths";
import { adminNav } from "../../utils/constants";
import {
  AiOutlineDashboard,
  FaUsers,
  MdProductionQuantityLimits,
  RiBillLine,
  AiOutlineMenu,
} from "../../utils/icons";
import { logo } from "../../assets/logos/";

const Admin = () => {
  const icons = [
    // eslint-disable-next-line react/jsx-key
    <AiOutlineDashboard />,
    // eslint-disable-next-line react/jsx-key
    <FaUsers />,
    // eslint-disable-next-line react/jsx-key
    <MdProductionQuantityLimits />,
    // eslint-disable-next-line react/jsx-key
    <RiBillLine />,
  ];
  const navigate = useNavigate();
  const { isLoggedIn, token } = useSelector((state) => state.user);
  const [isShowMenu, setIsShowMenu] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || !token || jwt_decode(token).role !== "tanbasa") {
      navigate(`/${path.LOGIN}`);
    }
  }, [isLoggedIn, token, navigate]);

  return (
    <div className="max-w-main mx-auto min-h-screen flex flex-col tablet:flex-row">
      {isShowMenu ? (
        <div className="flex-1 flex flex-col relative">
          <span
            className="absolute top-2 left-2"
            onClick={() => setIsShowMenu(!isShowMenu)}
          >
            <AiOutlineMenu size={20} />
          </span>
          <Link to={`/`} className="flex items-center justify-center my-8">
            <img src={logo} className="max-w-[100px]" alt="" />
          </Link>
          <div className=" flex flex-col">
            {adminNav?.map((item) => (
              <NavLink
                to={path.ADMIN + item.path}
                key={item.id}
                className={({ isActive }) =>
                  isActive
                    ? ` text-black flex items-center gap-2 font-semibold border-b tablet:border-r-4 text-base py-3 tablet:border-r-black`
                    : `hover:text-black items-center gap-2 text-main flex font-semibold border-b text-base py-3`
                }
              >
                <span>{icons[item.id]}</span>
                <span> {item.value}</span>
              </NavLink>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative">
          <span
            className="absolute top-2 left-2"
            onClick={() => setIsShowMenu(!isShowMenu)}
          >
            <AiOutlineMenu />
          </span>
          <div className=" flex flex-col mt-8 w-8 ">
            {adminNav?.map((item) => (
              <NavLink
                to={path.ADMIN + item.path}
                key={item.id}
                className={({ isActive }) =>
                  isActive
                    ? ` text-black flex justify-center items-center gap-2 font-semibold border-b text-base py-3 `
                    : `hover:text-black items-center justify-center gap-2 text-main flex font-semibold border-b text-base py-3`
                }
              >
                <span>{icons[item.id]}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
      <div className="flex-5 bg-secondary p-4">
        <Outlet context={isShowMenu} />
      </div>
    </div>
  );
};

export default Admin;
