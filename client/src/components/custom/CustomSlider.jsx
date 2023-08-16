/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import path from "../../utils/paths";
import { BsBagPlus } from "../../utils/icons";
import { VND } from "../../utils/helpers";
import "../../scss/customSlider.scss";

const CustomSlider = ({ data, type }) => {
  const settings = {
    dots: false,
    infinite: data.length > 3,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  let slidesToShow = 4;
  if (window.innerWidth < 600) slidesToShow = 2;
  else if (window.innerWidth < 872) slidesToShow = 3;

  const [slides, setSlides] = useState(slidesToShow);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 600) setSlides(2);
      else if (window.innerWidth < 872) setSlides(3);
      else setSlides(4);
    });
    return window.removeEventListener("resize", () => {});
  }, []);

  return (
    <div className="my-8 custom-slider">
      <div className=" flex justify-start">
        <h2 className=" font-semibold text-xl text-main pb-2 border-b-2">
          {type === 1 ? "GIẢM GIÁ SỐC" : "SẢN PHẨM MỚI"}
        </h2>
      </div>
      <div className="h-[1px] bg-[#e6e6e6] mb-8"></div>
      <div className="max-w-[1440px] mx-auto px-4">
        <Slider {...settings} slidesToShow={slides} className="text-center">
          {data?.map((item) => (
            <div className="relative flex flex-col items-center" key={item._id}>
              {type === 1 && (
                <div className="discount absolute top-0 left-3 z-10 px-1 bg-red-500 text-white flex flex-col items-center">
                  <span className="text-xl font-semibold">
                    {item.discount}
                    <span className="text-base font-normal ">%</span>
                  </span>
                  <span className="text-xs font-light">GIÁ</span>
                  <span className="text-xs font-light">SỐC</span>
                </div>
              )}
              <Link
                to={`/${path.DETAIL.replace(":slug", item.slug)}`}
                onClick={() => (document.documentElement.scrollTop = 0)}
                className="flex flex-col items-center cursor-pointer relative outline-none"
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
                <div className="hidden absolute left-2 top-[215px] desktop:top-[250px]">
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
              {type === 1 ? (
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="font-light line-through text-sm">
                    {VND.format(item.price)}
                  </span>
                  <span className="font-semibold text-sm text-red-500">
                    {VND.format(item.salePrice)}
                  </span>
                </div>
              ) : (
                <span className="font-semibold  text-sm">
                  {VND.format(item.price)}
                </span>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CustomSlider;
