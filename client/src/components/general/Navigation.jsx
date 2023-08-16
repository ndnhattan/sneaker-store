/* eslint-disable react/prop-types */
import { NavLink, useNavigate } from "react-router-dom";
import { navigations } from "../../utils/constants";
import { BiSearch } from "../../utils/icons";
import path from "../../utils/paths";

const Navigation = ({ searchBar }) => {
  const navigate = useNavigate();

  return searchBar ? (
    <div className="w-[868px] mx-auto pb-4">
      <nav className="flex mx-auto w-[80%] gap-4 font-bold text-sm justify-between">
        {navigations?.map((item) => (
          <NavLink
            to={item.path}
            onClick={() =>
              window.location.pathname === "/product-category/sneaker" &&
              item.value === "GIÀY"
                ? window.location.reload()
                : (document.documentElement.scrollTop = 0)
            }
            key={item.id}
            className={({ isActive }) =>
              isActive
                ? `duration-300 ${
                    item.value !== "OUTLET" && "text-black"
                  } cursor-pointer border-b-2 py-2 border-black ${
                    item.value === "OUTLET" && "text-red-500"
                  }`
                : `duration-300 hover:text-black cursor-pointer border-b-2 py-2 border-white hover:border-black ${
                    item.value === "OUTLET" && "text-red-500 hover:text-red-700"
                  }`
            }
          >
            {item.value}
          </NavLink>
        ))}
      </nav>
      <div className="relative">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm, thương hiệu,..."
          className="w-full border outline-none rounded-2xl text-center text-sm bg-secondary h-8 placeholder:text-xs placeholder:text-center placeholder:text-gray-500"
          onKeyDown={(e) =>
            e.key === "Enter" &&
            navigate(`/${path.SNEAKER}?title=${e.target.value}`)
          }
        />
        <div className="absolute  right-2 top-[5px] font-bold cursor-pointer hover:text-black">
          <BiSearch
            size={20}
            onClick={(e) => {
              console.log(e);
              navigate(
                `/${path.SNEAKER}?title=${e.target.parentNode.previousSibling.value}`
              );
            }}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="p-4 mx-auto pb-0 ">
      <nav className="grid grid-cols-2 font-bold text-lg text-center">
        {navigations?.slice(1, 9)?.map((item) => (
          <NavLink
            to={item.path}
            key={item.id}
            className={`${
              item.value !== "OUTLET" ? "text-[#446084]" : "text-red-500"
            } py-2 `}
          >
            {item.value}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;
