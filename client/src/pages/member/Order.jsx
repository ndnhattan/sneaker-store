import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import path from "../../utils/paths";
import { apiGetDetailOrder } from "../../apis";
import { VND } from "../../utils/helpers";

const Order = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const [detailOrder, setDetailOrder] = useState([]);
  const [idShow, setIdShow] = useState(-1);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        const response = await apiGetDetailOrder();
        if (response.message === "Success")
          setDetailOrder(response.data.orders);
      };
      fetchData();
    }
  }, [isLoggedIn]);

  return current?.orders?.length > 0 ? (
    <div className="flex flex-col">
      <div className="flex border-b-[3px] pb-1 text-main font-semibold text-center">
        <span className="flex-1">NGÀY</span>
        <span className="flex-1">TÌNH TRẠNG</span>
        <span className="flex-2">TỔNG</span>
        <span className="flex-1">CÁC THAO TÁC</span>
      </div>
      {detailOrder?.map((item, index) => (
        <div
          className="flex text-main text-sm items-center min-h-[50px] border-b text-center"
          key={item.orderId?._id}
        >
          <span className="flex-1">
            {item.orderId?.createdAt?.split("T")[0]}
          </span>
          <span className="flex-1">{item.orderId?.status}</span>
          <div className="flex-2">
            <span className="text-black font-semibold">
              {VND.format(item.orderId?.totalPrice)}
            </span>
            <span>{` cho ${item.orderId?.items.length} mục`}</span>
          </div>
          <div className="flex-1 flex justify-center">
            <button
              onClick={() =>
                idShow !== index ? setIdShow(index) : setIdShow(-1)
              }
              className={`py-2 px-4 ${
                idShow !== index ? "bg-black" : "bg-red-500"
              } rounded text-white font-semibold`}
            >
              {idShow !== index ? "XEM" : "ĐÓNG"}
            </button>
          </div>
        </div>
      ))}
      {idShow !== -1 && (
        <div className="mt-4 mx-6 border-2 p-2 flex flex-col">
          <div className="">
            <span className="font-semibold border-b-2">Sản Phẩm:</span>
          </div>
          {detailOrder[idShow].orderId.items.map((item) => (
            <div
              className="border-b flex items-center gap-2"
              key={item.productId._id}
            >
              <img
                src={item.productId.imagesUrl[0]}
                alt=""
                className="w-[100px]"
              />
              <span className="text-sm w-[200px]">{item.productId.title}</span>
              <span className="text-blue-400">{item.productId.sizes[0]}</span>
              <span>
                {VND.format(item.productId.salePrice)} x {item.quantity}
              </span>
              <span className="font-semibold">
                {" "}
                = {VND.format(item.productId.salePrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  ) : (
    <div className=" flex gap-2 items-center text-main">
      <span> Bạn chưa có đơn hàng nào? </span>
      <Link
        className="cursor-pointe bg-black text-white px-4 font-semibold uppercase  py-2"
        to={`/${path.SNEAKER}`}
      >
        Tìm các sản phẩm
      </Link>
    </div>
  );
};

export default Order;
