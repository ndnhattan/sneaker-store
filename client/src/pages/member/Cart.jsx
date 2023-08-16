import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import path from "../../utils/paths";
import { getCurrent } from "../../store/user/userSlice";
import { apiAddToCart, apiGetDetailCart } from "../../apis/";
import { BsArrowLeft } from "../../utils/icons";
import { VND } from "../../utils/helpers";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const [detailCart, setDetailCart] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(`/${path.LOGIN}`);
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCurrent());
      const fetchData = async () => {
        const response = await apiGetDetailCart();
        if (response.message === "Success") {
          setDetailCart(response.data.cart);
        }
      };
      fetchData();
    }
  }, [dispatch, isLoggedIn, isRefresh]);

  const total = detailCart?.reduce(
    (sum, item) => sum + item.productId.salePrice * item.quantity,
    0
  );

  return current?.cart?.length > 0 ? (
    <div className="max-w-main mx-auto px-4 flex py-10 tablet:flex-row flex-col gap-8 tablet:gap-0">
      <div className="flex-3 tablet:border-r tablet:pr-8 flex flex-col">
        <div className="flex flex-col text-main font-semibold text-sm mb-4">
          <div className="flex">
            <span className="flex-3 border-b-[3px] pb-1">SẢN PHẨM</span>
            <span className="hidden mobile:block flex-1 border-b-[3px] pb-1">
              GIÁ
            </span>
            <span className="flex-1 text-center border-b-[3px] pb-1">
              SỐ LƯỢNG
            </span>
            <span className="hidden mobile:block  flex-1 text-center border-b-[3px] pb-1">
              TẠM TÍNH
            </span>
          </div>
          <div className="flex flex-col">
            {detailCart.map((item, index) => (
              <div
                className="flex items-center min-h-[100px] border-b"
                key={index}
              >
                <div className="flex-3 flex items-center">
                  <span
                    onClick={async () => {
                      await apiAddToCart({
                        productId: item.productId._id,
                        size: item.size,
                        quantity: -item.quantity,
                      });
                      setIsRefresh(!isRefresh);
                    }}
                    className="cursor-pointer min-w-[24px] hover:border-black hover:text-black w-6 h-6 rounded-full border-2 text-[#CCCCCC] flex items-center justify-center text-xs"
                  >
                    x
                  </span>
                  <Link
                    className="flex gap-2 items-center px-1"
                    to={`/${path.DETAIL.replace(":slug", item.productId.slug)}`}
                  >
                    <img
                      src={item.productId.imagesUrl[0]}
                      alt=""
                      className="max-w-[75px]"
                    />
                    <span className="hover:text-black text-[#446084] font-normal">{`${item.productId.title} - ${item.size}`}</span>
                    <span className="text-black mobile:hidden font-semibold">{` x ${VND.format(
                      item.productId.salePrice
                    )}`}</span>
                  </Link>
                </div>
                <span className="hidden mobile:block flex-1 text-black">
                  {VND.format(item.productId.salePrice)}
                </span>
                <div className="flex-1 flex justify-center">
                  <button
                    onClick={async () => {
                      await apiAddToCart({
                        productId: item.productId._id,
                        size: item.size,
                        quantity: -1,
                      });
                      setIsRefresh(!isRefresh);
                    }}
                    className="border bg-secondary border-r-0 px-2 rounded-l-full"
                  >
                    -
                  </button>
                  <span className="leading-9 w-[36px] h-[36px] bg-secondary border text-center outline-none">
                    {item.quantity}
                  </span>
                  <button
                    onClick={async () => {
                      await apiAddToCart({
                        productId: item.productId._id,
                        size: item.size,
                        quantity: 1,
                      });
                      setIsRefresh(!isRefresh);
                    }}
                    className="border bg-secondary border-l-0 px-2 rounded-r-full"
                  >
                    +
                  </button>
                </div>
                <span className="hidden mobile:block flex-1 text-black text-center">
                  {VND.format(item.productId.salePrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <Link
          to={`/${path.SNEAKER}`}
          className="flex gap-2 items-center px-4 py-2 text-sm max-w-[210px] border-2 border-black hover:bg-black hover:text-white"
        >
          <span>
            <BsArrowLeft />
          </span>
          <span className="font-semibold">TIẾP TỤC XEM SẢN PHẨM</span>
        </Link>
      </div>
      <div className="flex-2  tablet:pl-8 flex flex-col">
        <span className="border-b-[3px]  text-main font-semibold text-sm pb-1">
          CỘNG GIỎ HÀNG
        </span>
        <div className="border-b flex justify-between   text-sm pb-2 mt-6">
          <span className="text-main ">Tạm tính</span>
          <span className="text-black font-semibold">{VND.format(total)}</span>
        </div>

        <Link
          to={`/${path.CHECKOUT}`}
          className="mt-8 font-semibold py-2 text-sm text-center bg-black text-white"
        >
          TIẾN HÀNH THANH TOÁN
        </Link>
      </div>
    </div>
  ) : (
    <div className="max-w-main mx-auto px-4 flex items-center justify-center py-20">
      <div className="flex flex-col items-center">
        <span className="text-main mb-4">
          Chưa có sản phẩm nào trong giỏ hàng.
        </span>
        <Link
          to={`/${path.SNEAKER}`}
          className="py-2 px-4 bg-black font-semibold text-white"
        >
          QUAY TRỞ LẠI CỬA HÀNG
        </Link>
      </div>
    </div>
  );
};

export default Cart;
