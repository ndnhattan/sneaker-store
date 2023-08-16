import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import path from "../../utils/paths";
import { getCurrent, login } from "../../store/user/userSlice";
import { FcGoogle, MdFacebook } from "../../utils/icons";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get("accessToken");

  useEffect(() => {
    navigate(`/${path.HOME}`);
    dispatch(login(accessToken));
    dispatch(getCurrent());
  }, [navigate, accessToken, dispatch]);

  return (
    <div className="border-t-2 pt-8 pb-8">
      <div className="max-w-main mx-auto px-4 flex flex-col tablet:flex-row">
        <div className="tablet:w-1/2 tablet:border-r flex flex-col tablet:pr-8">
          <h3 className="text-main font-semibold text-xl">ĐĂNG NHẬP</h3>
          <form
            action=""
            className="flex flex-col font-semibold text-black text-sm mt-2"
          >
            <label htmlFor="">Địa chỉ email *</label>
            <input
              type="email"
              className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
            />
            <label htmlFor="">Mật khẩu *</label>
            <input
              type="password"
              className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
            />
            <label htmlFor="" className="flex items-center gap-2 ml-1">
              <input type="checkbox" name="" id="" />
              Ghi nhớ mật khẩu
            </label>
            <button className="text-white bg-black w-[120px] py-2 mt-4 mb-2">
              ĐĂNG NHẬP
            </button>

            <Link
              className="font-normal text-[#446084] text-base"
              to={`/${path.FORGOT_PASSWORD}`}
            >
              Quên mật khẩu ?
            </Link>
            <div className="flex gap-4">
              <button className="text-main w-[120px] py-2 mt-4 mb-2 flex gap-2 items-center justify-center border">
                <span>
                  <FcGoogle />
                </span>
                <span>Google</span>
              </button>
              <button className="text-main w-[120px] py-2 mt-4 mb-2 flex gap-2 items-center justify-center border">
                <span>
                  <MdFacebook color="blue" />
                </span>
                <span>Facebook</span>
              </button>
            </div>
          </form>
        </div>
        <div className="tablet:w-1/2 flex flex-col tablet:pl-8 mt-4 tablet:mt-0">
          <h3 className="text-main font-semibold text-xl">ĐĂNG KÝ</h3>
          <form
            action=""
            className="flex flex-col font-semibold text-black text-sm mt-2"
          >
            <div className="flex ">
              <div className="flex flex-col w-1/2 pr-2">
                <label htmlFor="">Họ *</label>
                <input
                  type="text"
                  className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
                />
              </div>
              <div className="flex flex-col w-1/2 pl-2">
                <label htmlFor="">Tên *</label>
                <input
                  type="text"
                  className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
                />
              </div>
            </div>
            <label htmlFor="">Địa chỉ email *</label>
            <input
              type="email"
              className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
            />
            <label htmlFor="">Mật khẩu *</label>
            <input
              type="password"
              className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
            />
            <button className="text-white bg-black w-[100px] py-2 mt-4 mb-2">
              ĐĂNG KÝ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
