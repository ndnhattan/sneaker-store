import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import path from "../../utils/paths";
import { apiForgotPassword, apiVerifyForgotPassword } from "../../apis";
import { validateForm } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { setModal } from "../../store/app/appSlice";
import { Loading } from "../../components/general";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState();

  const [data, setData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const handleSendEmail = async (e) => {
    e.preventDefault();
    const message = validateForm({ email: data.email });
    if (message !== "Success") setError(message);
    else {
      setError("");
      dispatch(setModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiForgotPassword(data.email);
      dispatch(setModal({ isShowModal: false, modalChildren: null }));
      if (response.message === "Success") {
        setError("Vui lòng kiểm tra Email của bạn để thay đổi mật khẩu.");
      } else {
        setError(response.message);
      }
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const message = validateForm({
      password: data.password,
      password2: data.password2,
    });
    if (message !== "Success") setError(message);
    else {
      setError("");
      const response = await apiVerifyForgotPassword({
        token,
        password: data.password,
      });
      if (response.message === "Success") {
        navigate(`/${path.LOGIN}?message=1`);
      } else {
        setError(response.message);
      }
    }
  };

  return (
    <div className="border-t-2 pt-8 pb-8">
      {error && (
        <div className="flex justify-center mb-8">
          <span className="text-red-400 font-semibold ">{error}</span>
        </div>
      )}
      <div className="max-w-main mx-auto px-4 flex justify-center">
        <div className="tablet:w-1/2  flex flex-col w-full">
          <h3 className="text-main font-semibold text-xl">
            {token ? "ĐỔI" : "QUÊN"} MẬT KHẨU
          </h3>
          {token ? (
            <form
              action=""
              className="flex flex-col font-semibold text-black text-sm mt-2"
            >
              <label htmlFor="">Mật khẩu mới *</label>
              <input
                value={data.password}
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
                type="password"
                className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
              />
              <label htmlFor="">Xác nhận lại mật khẩu *</label>
              <input
                value={data.password2}
                onChange={(e) =>
                  setData({
                    ...data,
                    password2: e.target.value,
                  })
                }
                type="password"
                className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
              />
              <button
                className="text-white bg-black w-[120px] py-2 mt-4 mb-2"
                onClick={handleChangePassword}
              >
                XÁC NHẬN
              </button>
            </form>
          ) : (
            <form
              action=""
              className="flex flex-col font-semibold text-black text-sm mt-2"
            >
              <label htmlFor="">Địa chỉ email *</label>
              <input
                value={data.email}
                onChange={(e) =>
                  setData({
                    ...data,
                    email: e.target.value,
                  })
                }
                type="email"
                className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
              />
              <button
                className="text-white bg-black w-[120px] py-2 mt-4 mb-2"
                onClick={handleSendEmail}
              >
                XÁC NHẬN
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
