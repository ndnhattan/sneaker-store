import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { HotNews, Navigation } from "./";
import {
  MdLocationOn,
  FaPhoneAlt,
  HiShoppingBag,
  BiSolidUser,
  BiSearch,
  AiOutlineMenu,
  RiAdminFill,
} from "../../utils/icons";
import { logo } from "../../assets/logos/";
import path from "../../utils/paths";
import { setModal } from "../../store/app/appSlice";
import { MenuModal } from "../general/";

const Header = () => {
  const dispatch = useDispatch();
  const [headerState, setHeaderState] = useState(1);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 300) {
        setHeaderState(2);
      } else if (document.documentElement.scrollTop === 0) {
        setHeaderState(1);
      }
    });
    return () => window.removeEventListener("scroll", () => {});
  }, []);

  const { token, current } = useSelector((state) => state.user);

  const openModal = async () => {
    document.body.style.overflowY = "hidden";
    dispatch(setModal({ isShowModal: true, modalChildren: <MenuModal /> }));
  };

  return (
    <header className="relative text-main z-50">
      <div
        className={`bg-[#e6e6e6] ${
          headerState === 2 && "fixed top-0 w-full animate-slide-bottom z-30"
        } `}
      >
        <HotNews />
      </div>
      <div
        className={`flex justify-between items-center  mx-4 ${
          headerState === 2 ? "h-[200px]" : "h-[76px] border-b"
        }`}
      >
        <div className="flex-2 flex text-[13px]  font-semibold">
          <div className="duration-300 hidden tablet:flex items-center gap-1 border-r pr-2  hover:text-black hover:cursor-pointer">
            <span>
              <MdLocationOn size={18} />
            </span>
            <a target="_blank" rel="noreferrer" href={path.MAP}>
              425/16 NGUYỄN ĐÌNH CHIỂU P.5, Q.3, TP.HCM
            </a>
          </div>
          <div className="duration-300 hidden tablet:flex items-center gap-1 pl-2 hover:text-black hover:cursor-pointer">
            <span>
              <FaPhoneAlt size={16} />
            </span>
            <a target="_blank" rel="noreferrer" href={path.CONTACT}>
              LIÊN HỆ
            </a>
          </div>
          <div className=" duration-300   pr-3  tablet:hidden hover:text-black hover:cursor-pointer">
            <span onClick={openModal}>
              <AiOutlineMenu size={20} />
            </span>
          </div>
          <div className=" duration-300 hidden mobile:block  tablet:hidden hover:text-black hover:cursor-pointer">
            <span>
              <BiSearch size={20} />
            </span>
          </div>
        </div>
        <div className="flex-1 py-2.5 flex justify-center">
          <Link to={`/${path.HOME}`}>
            <img src={logo} alt="" className="max-h-[56px]" />
          </Link>
        </div>
        <div className="flex-2 flex justify-end">
          {token && jwt_decode(token).role === "tanbasa" && (
            <div className="pr-0 tablet:border-r tablet:pr-4 mr-4">
              <Link
                to={`${path.ADMIN + path.DASHBOARD}`}
                className="duration-300 w-8 h-8 border rounded-full flex items-center justify-center  hover:text-white hover:bg-black hover:cursor-pointer"
              >
                <RiAdminFill />
              </Link>
            </div>
          )}
          <div className="pr-0 tablet:border-r tablet:pr-4">
            <Link
              to={`${path.MEMBER + path.ORDER}`}
              className="duration-300 w-8 h-8 border rounded-full flex items-center justify-center  hover:text-white hover:bg-black hover:cursor-pointer"
            >
              <BiSolidUser />
            </Link>
          </div>
          <div className="pl-4 relative">
            <Link
              to={`/${path.CART}`}
              className="duration-300 w-8 h-8 border rounded-full flex items-center justify-center hover:text-white hover:bg-black hover:cursor-pointer"
            >
              <HiShoppingBag />
            </Link>
            {current?.cart?.length > 0 && (
              <div className="absolute bg-black font-semibold text-white w-4 h-4 -top-[6px] left-[36px] rounded-full text-xs flex items-center justify-center  ">
                {current.cart.length}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`hidden tablet:block ${
          headerState === 2 &&
          "fixed top-[29px] w-full animate-slide-bottom shadow-xl pb-4 bg-white z-30  "
        } `}
      >
        <Navigation searchBar={true} />
      </div>
    </header>
  );
};

export default Header;
