import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigation } from "../../components/general/";
import ProductsList from "../../components/product/ProductsList";
import ProductsSlide from "../../components/product/ProductsSlide";
import { apiGetProducts } from "../../apis/";
import path from "../../utils/paths";
import {
  banner,
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
} from "../../assets/images/";

const Home = () => {
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const bestSellerProducts = await apiGetProducts({
        sort: "-sold",
        limit: 12,
      });
      if (bestSellerProducts?.message === "Success")
        setBestSellerProducts(bestSellerProducts.data);
    };
    fetchData();
  }, []);

  const { newProducts, saleProducts } = useSelector((state) => state.app);

  return (
    <div className="">
      <div className="block mobile:hidden tablet:block">
        <div className="">
          <Link to={path.OUTLET}>
            <img
              src={banner}
              alt=""
              className="cursor-pointer w-full max-h-[610px] object-cover"
            />
          </Link>
        </div>
        <div className="block mobile:hidden">
          <div className="flex gap-2 mx-2 mt-2">
            <div className="w-1/2 relative">
              <Link to={path.SNEAKER}>
                <img
                  src={banner5}
                  alt=""
                  className="cursor-pointer w-full h-[25vw]"
                />
              </Link>
              <Link
                to={path.SNEAKER}
                className="text-white font-semibold absolute inset-0 flex items-center justify-center"
              >
                <span className="text-xl mobile:text-lg text-center">SHOP</span>
              </Link>
            </div>
            <div className="w-1/2 relative">
              <Link to={path.OUTLET}>
                <img
                  src={banner4}
                  alt=""
                  className="cursor-pointer w-full h-[25vw] object-cover"
                />
              </Link>
              <Link
                to={path.OUTLET}
                className="text-white font-semibold absolute inset-0 flex items-center justify-center"
              >
                <span className="text-xl mobile:text-lg text-center">
                  OUTLET
                </span>
              </Link>
            </div>
          </div>
          <Navigation searchBar={false} />
        </div>
      </div>
      <div className="max-w-main mx-auto px-4">
        <div className="flex items-center my-8">
          <div className="flex-1 h-[2px] bg-[#e6e6e6]"></div>
          <h2 className="font-semibold text-lg text-main px-4">TIN TỨC</h2>
          <div className="flex-1 h-[2px] bg-[#e6e6e6] "></div>
        </div>
        <div className="flex justify-between max-h-[23vw] mobile:max-h-[21vw] main:max-h-[240px]">
          <div className="w-[25%] mobile:w-[22%]  cursor-pointer  hover:scale-110 duration-500">
            <Link to={path.HOME} className="relative">
              <img src={banner2} alt="" className=" h-full  hover:" />
              <div className="text-white font-semibold absolute inset-0 flex items-center justify-center">
                <span className="text-sm mobile:text-lg text-center">
                  THÔNG TIN – BẢO HÀNH
                </span>
              </div>
            </Link>
          </div>
          <div className="w-[49%] mobile:w-[50%]  cursor-pointer  hover:scale-110 duration-500 z-10">
            <Link to={path.SNEAKER} className="relative">
              <img src={banner1} alt="" className=" h-full w-full hover:" />
              <div className="text-white font-semibold absolute inset-0 flex items-center justify-center">
                <span className="text-2xl mobile:text-4xl text-center">
                  SHOP
                </span>
              </div>
            </Link>
          </div>
          <div className="w-[25%] mobile:w-[22%]  cursor-pointer  hover:scale-110 duration-500">
            <Link to={path.HOME} className="relative">
              <img src={banner3} alt="" className=" h-full" />
              <div className="text-white font-semibold absolute inset-0 flex items-center justify-center">
                <span className="text-sm mobile:text-lg text-center">
                  DỊCH VỤ – SNEAKER SPA
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-main mx-auto px-4">
        <ProductsList data={newProducts} type={1} />
        <ProductsList data={bestSellerProducts} type={2} />
      </div>
      <ProductsSlide data={saleProducts} />
    </div>
  );
};

export default Home;
