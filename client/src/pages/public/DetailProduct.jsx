import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CustomSlider from "../../components/custom/CustomSlider";
import ImagePreviewer from "../../components/product/ImagePreviewer";
import { apiGetProduct, apiAddToCart } from "../../apis/";
import { VND, validateForm } from "../../utils/helpers";
import size from "../../assets/svgs/size.svg";
import { sizeTutorial } from "../../assets/images/";
import { BsChevronDown } from "../../utils/icons";
import path from "../../utils/paths";
import { getCurrent } from "../../store/user/userSlice";

const DetailProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [product, setProduct] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await apiGetProduct(slug);
      if (data.message === "Success") setProduct(data.data);
    };
    fetchData();
  }, [slug]);
  const { newProducts, saleProducts } = useSelector((state) => state.app);
  const { isLoggedIn } = useSelector((state) => state.user);

  const [openSizeTutorial, setOpenSizeTutorial] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(false);

  const [dataSend, setDataSend] = useState({
    size: "",
    quantity: 1,
  });

  const handleAddToCart = async () => {
    if (isLoggedIn) {
      const message = validateForm(dataSend);
      if (message !== "Success")
        toast(
          "Chọn các tùy chọn cho sản phẩm trước khi cho sản phẩm vào giỏ hàng của bạn."
        );
      else {
        const response = await apiAddToCart({
          ...dataSend,
          productId: product._id,
        });
        if (response.message === "Success") {
          await dispatch(getCurrent());
          toast("Đã thêm vào giỏ hàng");
        } else {
          toast(response.message);
        }
      }
    } else {
      navigate(`/${path.LOGIN}`);
    }
  };

  const handleBuy = async () => {
    if (isLoggedIn) {
      const message = validateForm(dataSend);
      if (message !== "Success")
        toast(
          "Chọn các tùy chọn cho sản phẩm trước khi cho sản phẩm vào giỏ hàng của bạn."
        );
      else {
        const response = await apiAddToCart({
          ...dataSend,
          productId: product._id,
        });
        if (response.message === "Success") {
          navigate(`/${path.CART}`);
        } else {
          toast(response.message);
        }
      }
    } else {
      navigate(`/${path.LOGIN}`);
    }
  };

  return (
    <div className="">
      <div className={"max-w-main mx-auto px-4"}>
        <div className="flex mt-8 text-main gap-2 flex-col tablet:flex-row mb-24  ">
          <div className="w-full tablet:w-[48%]">
            <ImagePreviewer
              data={product?.imagesUrl}
              discount={product?.discount}
            />
          </div>
          <div className="w-full tablet:w-1/2 flex flex-col">
            <span className="text-3xl font-semibold">{product?.title}</span>
            {product?.discount > 0 ? (
              <div className="flex flex-wrap  gap-2 mt-2">
                <span className="font-light line-through text-xl">
                  {VND.format(product.price)}
                </span>
                <span className="font-semibold text-xl text-red-500">
                  {VND.format(product.salePrice)}
                </span>
              </div>
            ) : (
              <span className="text-black font-semibold text-xl mt-2">
                {product?.price ? VND.format(product.price) : ""}
              </span>
            )}
            <div className="bg-gray-100 h-[1px] mt-2"></div>
            <span className="text-xs mt-2">{`Mã: ${product?.code}`}</span>
            <div className="flex items-center justify-start gap-6 mt-8">
              <span className="text-black text-xs font-semibold">Size</span>
              <div className="flex flex-wrap gap-6">
                {product?.sizes?.map((item, index) => (
                  <div
                    className={`w-[50px] h-[32px] border cursor-pointer ${
                      item === dataSend.size
                        ? "border-orange-500"
                        : "hover:border-gray-700 border-gray-400"
                    } flex items-center justify-center rounded`}
                    key={index}
                    onClick={() => setDataSend({ ...dataSend, size: item })}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="block mobile:flex mt-8">
              <div className="flex mb-4 mobile:mb-0">
                <button
                  onClick={() => {
                    if (dataSend.quantity > 1) {
                      setDataSend({
                        ...dataSend,
                        quantity: dataSend.quantity - 1,
                      });
                    }
                  }}
                  className="border bg-secondary border-r-0 px-3 rounded-l-full"
                >
                  -
                </button>
                <span className="leading-10 w-[40px] h-[40px] bg-secondary border text-center outline-none">
                  {dataSend.quantity}
                </span>
                <button
                  onClick={() =>
                    setDataSend({
                      ...dataSend,
                      quantity: dataSend.quantity + 1,
                    })
                  }
                  className="border bg-secondary border-l-0 px-3 rounded-r-full"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="ml-0 mobile:ml-4 bg-[#202020] opacity-60 text-white font-semibold uppercase rounded-3xl py-2 px-4"
              >
                Thêm vào giỏ hàng
              </button>
              <button
                onClick={handleBuy}
                className="ml-1 bg-[#6dacdf]  text-white font-semibold uppercase rounded-3xl py-2 px-4"
              >
                {" "}
                Mua ngay{" "}
              </button>
            </div>
            <div className="mt-10 flex gap-2">
              <img src={size} alt="" />
              <span
                className="text-[#446084] cursor-pointer hover:text-black"
                onClick={() => {
                  setOpenSizeTutorial(true);
                  document.body.style.overflowY = "hidden";
                }}
              >
                Hướng dẫn chọn size
              </span>
            </div>
            <div
              className={`${
                openDescription ? "bg-black" : " bg-gray-300"
              } h-[1px] mt-6`}
            ></div>
            <div
              className={`${
                openDescription && "bg-secondary pb-2 text-black font-semibold"
              } flex  items-center gap-2 pt-2 cursor-pointer hover:text-black`}
              onClick={() => setOpenDescription(!openDescription)}
            >
              <span>
                <BsChevronDown
                  className={
                    openDescription
                      ? "-rotate-180 duration-300"
                      : "rotate-0 duration-300"
                  }
                />
              </span>
              <span>Thông tin sản phẩm</span>
            </div>
            {openDescription && (
              <div dangerouslySetInnerHTML={{ __html: product?.description }} />
            )}
            <div
              className={`${
                openPolicy ? "bg-black" : " bg-gray-300"
              } h-[1px] mt-6`}
            ></div>
            <div
              className={`${
                openPolicy && "bg-secondary pb-2 text-black font-semibold"
              } flex  items-center gap-2 pt-2 cursor-pointer hover:text-black`}
              onClick={() => setOpenPolicy(!openPolicy)}
            >
              <span>
                <BsChevronDown
                  className={
                    openPolicy
                      ? "-rotate-180 duration-300"
                      : "rotate-0 duration-300"
                  }
                />
              </span>
              <span>Chính sách bảo hành, đổi hàng</span>
            </div>
            {openPolicy && (
              <div className="p-4">
                <p>
                  Vệ sinh và bảo hành (tùy trường hợp) miễn phí trong vòng 1 năm
                  đầu, áp dụng cho các mặt hàng <strong>FULL GIÁ.</strong>
                </p>
                <br />
                <p>
                  Đối với các sản phẩm SALE hoặc nằm trong danh mục
                  &quot;OUTLET&quot;, cửa hàng có hỗ trợ vệ sinh tính phí với
                  mức giá ưu đãi, hoặc vẫn được miễn phí đối với khách hàng có
                  đủ hạn mức ưu đãi dành cho thành viên.
                </p>
                <br />
                <p>
                  Hỗ trợ đổi size (nếu còn) hoặc đổi sang sản phẩm khác trong
                  vòng 1 tuần <em>(đối với đơn hàng tại TP. HCM)</em> hoặc tối
                  đa 2 tuần <em>(đối với đơn hàng ship đi tỉnh)</em>. Trong một
                  vài trường hợp, cửa hàng vẫn có thể &quot;linh hoạt&quot; thời
                  gian lâu hơn nếu được báo trước.&nbsp;
                </p>
                <br />
                <p>
                  Toàn bộ sản phẩm đều là{" "}
                  <strong>chính hãng - AUTHENTIC</strong>, bao check trọn đời.
                  Hoàn tiền &amp; đền bù nếu phát hiện hàng FAKE.&nbsp;
                </p>
                <br />
                <ul>
                  <li>
                    Tham khảo thêm{" "}
                    <a href="https://sneakerholicvietnam.vn/2018/07/16/chinh-sach-doi-tra-hoan-tien-san-pham-tai-the-sneakerholic/">
                      tại đây
                    </a>
                  </li>
                  <li>
                    Thông tin về ưu đãi dành cho hạn mức thành viên, xem
                    thêm&nbsp;
                    <a href="https://sneakerholicvietnam.vn/2018/12/10/the-sneakerholic-rewards-dac-quyen-danh-rieng-cho-khach-hang-than-thiet/">
                      tại đây
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <CustomSlider data={saleProducts} type={1} />
        <CustomSlider data={newProducts} type={2} />
      </div>
      {openSizeTutorial && (
        <>
          <div
            className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)] overflow-y-scroll"
            onClick={() => {
              setOpenSizeTutorial(false);
              document.body.style.overflowY = "auto";
            }}
          >
            <button
              className="fixed top-4 right-8 text-white text-xl"
              onClick={() => {
                setOpenSizeTutorial(false);
                document.body.style.overflowY = "auto";
              }}
            >
              x
            </button>
            <img
              src={sizeTutorial}
              alt=""
              className="w-[560px] mx-auto mt-8"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DetailProduct;
