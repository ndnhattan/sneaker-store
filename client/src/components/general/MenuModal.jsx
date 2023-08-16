import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setModal } from "../../store/app/appSlice";
import {
  AiOutlineClose,
  BiSearch,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
} from "../../utils/icons";
import path from "../../utils/paths";
import { navigations } from "../../utils/constants";

const MenuModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    document.body.style.overflowY = "auto";
    dispatch(setModal({ isShowModal: false, modalChildren: null }));
  };

  return (
    <div className="fixed inset-0" onClick={handleClick}>
      <div
        className="w-[260px] bg-white h-screen opacity-90 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pt-10 px-4 pb-8 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, thương hiệu,..."
              className="w-full border outline-none rounded-3xl py-2 text-center text-sm bg-secondary placeholder:text-xs placeholder:text-center placeholder:text-gray-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleClick();
                  navigate(`/${path.SNEAKER}?title=${e.target.value}`);
                }
              }}
            />
            <div className="absolute  right-2 top-[10px] font-bold cursor-pointer">
              <BiSearch
                color="#666666d9"
                size={22}
                onClick={(e) => {
                  handleClick();
                  navigate(
                    `/${path.SNEAKER}?title=${e.target.parentNode.previousSibling.value}`
                  );
                }}
              />
            </div>
          </div>
        </div>
        <nav className="flex flex-col text-main font-bold text-sm justify-between">
          {navigations?.map((item) => (
            <NavLink
              to={item.path}
              onClick={() => {
                handleClick();
                window.location.pathname === "/product-category/sneaker" &&
                item.value === "GIÀY"
                  ? window.location.reload()
                  : (document.documentElement.scrollTop = 0);
              }}
              key={item.id}
              className={({ isActive }) =>
                isActive
                  ? `duration-300 ${
                      item.value !== "OUTLET" && "text-black"
                    } cursor-pointer  py-4 border-b pl-6 ${
                      item.value === "OUTLET" && "text-red-500"
                    }`
                  : `duration-300 hover:text-black cursor-pointer  py-4 border-b pl-6 `
              }
            >
              {item.value}
            </NavLink>
          ))}
        </nav>
        <div className="flex gap-2 pl-6 text-main pt-4">
          <span>
            <BiLogoFacebook size={20} />
          </span>
          <span>
            <BiLogoInstagram size={20} />
          </span>
          <span>
            <BiLogoTiktok size={20} />
          </span>
        </div>
      </div>
      <button className="absolute top-3 right-4 cursor-pointer">
        <AiOutlineClose color="white" size={20} />
      </button>
    </div>
  );
};

export default MenuModal;
