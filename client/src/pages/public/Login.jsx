import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiRegister, apiLogin } from "../../apis/";
import { validateForm } from "../../utils/helpers";
import path from "../../utils/paths";
import { getCurrent, login } from "../../store/user/userSlice";
import { FcGoogle, MdFacebook } from "../../utils/icons";
import { setModal } from "../../store/app/appSlice";
import { Loading } from "../../components/general";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  let message;
  if (searchParams.get("message") === "1")
    message = "Vui lòng đăng nhập để tiếp tục";
  else if (searchParams.get("message") === "0")
    message = "Không thể tạo tài khoản";
  else if (searchParams.get("message") === "-1")
    message = "Email đã hết hiệu lực";
  const [error, setError] = useState(message);

  const [dataRegister, setDataRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    const message = validateForm(dataRegister);
    if (message !== "Success") setError(message);
    else {
      setError("");
      dispatch(setModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiRegister(dataRegister);
      dispatch(setModal({ isShowModal: false, modalChildren: null }));
      if (response.message === "Success") {
        setDataRegister({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setError("Vui lòng kiểm tra Email của bạn để hoàn tất đăng kí.");
        document.documentElement.scrollTop = 0;
      } else {
        setError(response.message);
        document.documentElement.scrollTop = 0;
      }
    }
  };

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const message = validateForm(dataLogin);
    if (message !== "Success") setError(message);
    else {
      setError("");
      const response = await apiLogin(dataLogin);
      if (response.message === "Success") {
        navigate(`/${path.HOME}`);
        await dispatch(login(response.data.accessToken));
        await dispatch(getCurrent());
      } else {
        setError(response.message);
      }
    }
  };

  const handleLoginGoogle = (e) => {
    e.preventDefault();
    window.open(`${import.meta.env.VITE_API_URL}auth/google`, "_self");
  };
  const handleLoginFacebook = (e) => {
    e.preventDefault();
    window.open(`${import.meta.env.VITE_API_URL}auth/google`, "_self");
  };

  return (
    <div className="border-t-2 pt-8 pb-8">
      {error && (
        <div className="flex justify-center mb-8">
          <span className="text-red-400 font-semibold ">{error}</span>
        </div>
      )}
      <div className="max-w-main mx-auto px-4 flex flex-col tablet:flex-row">
        <div className="tablet:w-1/2 tablet:border-r flex flex-col tablet:pr-8">
          <h3 className="text-main font-semibold text-xl">ĐĂNG NHẬP</h3>
          <div
            action=""
            className="flex flex-col font-semibold text-black text-sm mt-2"
          >
            <label htmlFor="">Địa chỉ email *</label>
            <input
              value={dataLogin.email}
              onChange={(e) =>
                setDataLogin({
                  ...dataLogin,
                  email: e.target.value,
                })
              }
              type="email"
              className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
            />
            <label htmlFor="">Mật khẩu *</label>
            <input
              value={dataLogin.password}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              onChange={(e) =>
                setDataLogin({
                  ...dataLogin,
                  password: e.target.value,
                })
              }
              type="password"
              className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
            />
            <label htmlFor="" className="flex items-center gap-2 ml-1">
              <input type="checkbox" name="" id="" />
              Ghi nhớ mật khẩu
            </label>
            <button
              className="text-white bg-black w-[120px] py-2 mt-4 mb-2"
              onClick={handleLogin}
            >
              ĐĂNG NHẬP
            </button>

            <Link
              className="font-normal text-[#446084] text-base"
              to={`/${path.FORGOT_PASSWORD}`}
            >
              Quên mật khẩu ?
            </Link>
            <div className="flex gap-4">
              <button
                className="text-main w-[120px] py-2 mt-4 mb-2 flex gap-2 items-center justify-center border"
                onClick={handleLoginGoogle}
              >
                <span>
                  <FcGoogle />
                </span>
                <span>Google</span>
              </button>
              <button
                className="text-main w-[120px] py-2 mt-4 mb-2 flex gap-2 items-center justify-center border"
                onClick={handleLoginFacebook}
              >
                <span>
                  <MdFacebook color="blue" />
                </span>
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>
        <div className="tablet:w-1/2 flex flex-col tablet:pl-8 mt-4 tablet:mt-0">
          <h3 className="text-main font-semibold text-xl">ĐĂNG KÝ</h3>
          <div
            action=""
            className="flex flex-col font-semibold text-black text-sm mt-2"
          >
            <div className="flex mobile:flex-row flex-col">
              <div className="flex flex-col mobile:w-1/2 mobile:pr-2">
                <label htmlFor="">Họ *</label>
                <input
                  type="text"
                  className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
                  value={dataRegister.lastName}
                  onChange={(e) =>
                    setDataRegister({
                      ...dataRegister,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col mobile:w-1/2 mobile:pl-2">
                <label htmlFor="">Tên *</label>
                <input
                  value={dataRegister.firstName}
                  type="text"
                  className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
                  onChange={(e) =>
                    setDataRegister({
                      ...dataRegister,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <label htmlFor="">Địa chỉ email *</label>
            <input
              value={dataRegister.email}
              type="email"
              className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
              onChange={(e) =>
                setDataRegister({ ...dataRegister, email: e.target.value })
              }
            />
            <label htmlFor="">Mật khẩu *</label>
            <input
              value={dataRegister.password}
              type="password"
              className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRegister();
                }
              }}
              onChange={(e) =>
                setDataRegister({ ...dataRegister, password: e.target.value })
              }
            />
            <button
              className="text-white bg-black w-[100px] py-2 mt-4 mb-2"
              onClick={handleRegister}
            >
              ĐĂNG KÝ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
