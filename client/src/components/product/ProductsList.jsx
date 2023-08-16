/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import path from "../../utils/paths";
import { MdNavigateNext, BsBagPlus } from "../../utils/icons";
import { VND } from "../../utils/helpers";

const ProductsList = ({ data, type }) => {
  let productsToShow = 12;
  if (window.innerWidth < 872) productsToShow = 6;

  const [pts, setPts] = useState(productsToShow);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 872) setPts(6);
      else setPts(12);
    });
    return window.removeEventListener("resize", () => {});
  }, []);

  return (
    <div>
      <div className="flex items-center my-12">
        <div className="flex-1 h-[2px] bg-[#e6e6e6]"></div>
        <h2 className="font-semibold text-2xl text-main px-4">
          {type === 1 ? "SẢN PHẨM MỚI" : "BÁN CHẠY NHẤT"}
        </h2>
        <div className="flex-1 h-[2px] bg-[#e6e6e6] "></div>
      </div>
      <div className="grid grid-cols-2 mobile:grid-cols-3 tablet:grid-cols-4 gap-4 ">
        {data?.slice(0, pts).map((item) => (
          <div className="flex flex-col items-center" key={item._id}>
            <Link
              to={`/${path.DETAIL.replace(":slug", item.slug)}`}
              onClick={() => (document.documentElement.scrollTop = 0)}
              className="flex flex-col items-center cursor-pointer relative"
            >
              <img
                src={item.imagesUrl[0]}
                alt=""
                onMouseOver={(e) => {
                  e.target.src = item.imagesUrl[1];
                  e.target.nextSibling.style.display = "block";
                }}
                onMouseOut={(e) => {
                  e.target.src = item.imagesUrl[0];
                  e.target.nextSibling.style.display = "none";
                }}
              />
              <div className="hidden absolute left-2 top-40 mobile:top-52">
                <BsBagPlus
                  size={24}
                  onMouseOver={(e) => {
                    if (e.target.parentNode.previousSibling)
                      e.target.parentNode.previousSibling.src =
                        item.imagesUrl[1];
                    e.target.parentNode.style.display = "block";
                  }}
                />
              </div>
              <span className="text-[#446084] hover:text-black text-sm">
                {item.title}
              </span>
            </Link>
            <span className="font-semibold text-sm">
              {VND.format(item.price)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <Link
          to={type === 1 ? path.SNEAKER : path.SNEAKER + "?sort=-sold"}
          onClick={() => (document.documentElement.scrollTop = 0)}
          className="w-[125px] h-[38px] border-2 border-black font-semibold flex items-center justify-center cursor-pointer hover:bg-black hover:text-white duration-500"
        >
          <span>Xem tất cả</span>
          <span>
            <MdNavigateNext />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ProductsList;
