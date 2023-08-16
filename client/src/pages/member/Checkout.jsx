import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import path from "../../utils/paths";
import { apiGetDetailCart, apiAddOrder } from "../../apis";
import { VND, validateForm } from "../../utils/helpers";
import { BiEdit } from "../../utils/icons";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  const [detailCart, setDetailCart] = useState([]);
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const [deliverType, setDeliverType] = useState(0);
  const [paymentType, setPaymentType] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(`/${path.LOGIN}`);
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        const response = await apiGetDetailCart();
        if (response.message === "Success") {
          setDetailCart(response.data.cart);
        }
      };
      fetchData();
    }
  }, [isLoggedIn]);

  const total = detailCart?.reduce(
    (sum, item) => sum + item.productId.salePrice * item.quantity,
    0
  );

  const handleConfirm = async () => {
    const message = validateForm({
      mobile: current.mobile,
      address: current.address,
    });
    if (message === "Success") {
      const response = await apiAddOrder({
        totalPrice: total,
        items: current.cart,
        description,
        deliverType: deliverType === 0 ? "store" : "ship",
        paymentType: paymentType === 0 ? "COD" : "banking",
      });
      if (response.message === "Success") {
        navigate(path.MEMBER + path.ORDER);
      } else {
        toast(message);
      }
    } else {
      toast(message);
    }
  };

  return (
    <div className="max-w-main mx-auto px-4 flex py-10 tablet:flex-row flex-col gap-8 tablet:gap-0">
      <div className="flex-3 tablet:pr-8 flex flex-col text-sm font-semibold">
        <span className=" font-semibold text-lg pt-8 border-t-2 pb-4">
          THÔNG TIN THANH TOÁN
        </span>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <span>Họ và tên: </span>
            <span className="text-main">
              {current.lastName + " " + current.firstName}
            </span>
          </div>
          <Link to={`${path.MEMBER + path.PROFILE}`}>
            <BiEdit size={20} />
          </Link>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-4 mt-3">
            <span>Số điện thoại: </span>
            <span className="text-main">{current.mobile}</span>
          </div>
          <Link to={`${path.MEMBER + path.PROFILE}`}>
            <BiEdit size={20} />
          </Link>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-4 mt-3">
            <span>Địa chỉ email: </span>
            <span className="text-main">{current.email}</span>
          </div>
          <Link to={`${path.MEMBER + path.PROFILE}`}>
            <BiEdit size={20} />
          </Link>
        </div>
        <div className="flex justify-between mt-3">
          <div className="gap-4 flex">
            <span>Địa chỉ: </span>
            <span className="text-main">
              {current.address
                ? current.address.address +
                  ", " +
                  current.address.ward +
                  ", " +
                  current.address.district +
                  ", " +
                  current.address.province
                : ""}
            </span>
          </div>
          <Link to={`${path.MEMBER + path.ADDRESS}`}>
            <BiEdit size={20} />
          </Link>
        </div>
        <div className="flex mt-3 flex-col">
          <label>Ghi chú đơn hàng (tuỳ chọn): </label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="outline-none border-2 mt-2 placeholder:font-normal p-2"
            placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
          ></textarea>
        </div>
      </div>
      <div className="flex-2 border-2 border-black  p-8 flex flex-col">
        <span className=" font-semibold text-lg">ĐƠN HÀNG CỦA BẠN</span>
        <div className="flex justify-between border-b-[3px] mt-4 text-main font-semibold text-sm pb-1">
          <span className="">SẢN PHẨM</span>
          <span className="">TẠM TÍNH</span>
        </div>
        <div className="">
          {detailCart.map((item, index) => (
            <div
              className="flex items-center justify-between min-h-[50px] border-b"
              key={index}
            >
              <div className="">
                <span className="text-main text-sm font-normal">{`${item.productId.title} - ${item.size}`}</span>
                <span className="text-black font-semibold">{` x ${item.quantity}`}</span>
              </div>
              <span className=" text-black text-sm text-right font-semibold">
                {VND.format(item.productId.salePrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-b flex justify-between   text-sm pb-2 mt-2">
          <span className="text-main font-semibold">Tạm tính</span>
          <span className="text-black font-semibold">{VND.format(total)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-main font-semibold text-sm mb-4 mt-2">
            Giao hàng
          </span>
          <label
            htmlFor=""
            className={`mb-3 text-xs ${
              deliverType === 0 && "text-black font-semibold"
            }`}
          >
            <input
              type="radio"
              name="address"
              value={0}
              className="mr-2"
              checked={deliverType === 0}
              onChange={(e) => setDeliverType(+e.target.value)}
            />
            Nhận tại cửa hàng: 425/16 Nguyễn Đình Chiểu P5, Q3
          </label>
          <label
            htmlFor=""
            className={`text-xs ${
              deliverType === 1 && "text-black font-semibold"
            }`}
          >
            <input
              type="radio"
              name="address"
              className="mr-2"
              value={1}
              checked={deliverType === 1}
              onChange={(e) => {
                setDeliverType(+e.target.value);
              }}
            />
            Ship tận nơi: Phí ship sẽ được xác nhận qua điện thoại từ nhân viên
          </label>
        </div>
        <div className="border-b-[3px] border-t pt-2 flex justify-between   text-sm pb-2 mt-2">
          <span className="text-main font-semibold">Tổng</span>
          <span className="text-black font-semibold">{VND.format(total)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-main font-semibold text-sm mb-4 mt-2">
            Thanh toán
          </span>
          <label
            htmlFor=""
            className={`mb-3 text-sm ${
              paymentType === 0 && "text-black font-semibold"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={0}
              className="mr-2"
              checked={paymentType === 0}
              onChange={(e) => setPaymentType(+e.target.value)}
            />
            COD
          </label>
          {paymentType === 0 && (
            <span className="text-sm text-main border-b pb-2 mb-2">
              Thanh toán khi nhận hàng.
            </span>
          )}
          <label
            htmlFor=""
            className={`text-sm mb-3 ${
              paymentType === 1 && "text-black font-semibold"
            }`}
          >
            <input
              type="radio"
              name="payment"
              className="mr-2"
              value={1}
              checked={paymentType === 1}
              onChange={(e) => {
                setPaymentType(+e.target.value);
              }}
            />
            Chuyển khoản
          </label>
          {paymentType === 1 && (
            <span className="text-sm text-main border-b pb-2 mb-2">
              Đơn hàng sẽ được xác nhận ngay sau khi chuyển khoản.
            </span>
          )}
          <button
            onClick={handleConfirm}
            className="font-semibold text-white bg-black cursor-pointer p-2 max-w-[150px]"
          >
            THANH TOÁN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
