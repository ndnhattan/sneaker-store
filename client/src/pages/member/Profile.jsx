import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiUpdateUser } from "../../apis/";
import { validateForm, validateChangePassword } from "../../utils/helpers";
import { changeCurrent } from "../../store/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);

  const [error, setError] = useState();
  const [dataChange, setDataChange] = useState({
    firstName: current?.firstName,
    lastName: current?.lastName,
    email: current?.email,
    mobile: current?.mobile,
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
  });

  useEffect(() => {
    setDataChange({
      firstName: current?.firstName,
      lastName: current?.lastName,
      email: current?.email,
      mobile: current?.mobile,
      oldPassword: "",
      newPassword: "",
      newPassword2: "",
    });
  }, [current]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const message = validateForm({
      email: dataChange.email,
      firstName: dataChange.firstName,
      lastName: dataChange.lastName,
      mobile: dataChange.mobile,
    });
    const message2 = validateChangePassword({
      oldPassword: dataChange.oldPassword,
      newPassword: dataChange.newPassword,
      newPassword2: dataChange.newPassword2,
    });
    if (message !== "Success") setError(message);
    else if (message2 !== "Success") setError(message2);
    else {
      setError("");
      const response = await apiUpdateUser(dataChange);
      if (response.message === "Success") {
        dispatch(changeCurrent(response.data));
        setError("Thông tin tài khoản đã được cập nhật.");
        document.documentElement.scrollTop = 0;
      } else {
        setError(response.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 text-black font-semibold">
      {error && (
        <div className="flex justify-center mb-8">
          <span className="text-red-400 font-semibold ">{error}</span>
        </div>
      )}
      <div className="">
        <form
          action=""
          className="flex flex-col font-semibold text-black text-sm mt-2"
        >
          <div className="flex flex-col mobile:flex-row">
            <div className="flex flex-col mobile:w-1/2 mobile:pr-2">
              <label htmlFor="">Họ *</label>
              <input
                type="text"
                className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
                value={dataChange.lastName}
                onChange={(e) =>
                  setDataChange({
                    ...dataChange,
                    lastName: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col mobile:w-1/2 mobile:pl-2">
              <label htmlFor="">Tên *</label>
              <input
                value={dataChange.firstName}
                type="text"
                className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
                onChange={(e) =>
                  setDataChange({
                    ...dataChange,
                    firstName: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex flex-col mobile:flex-row">
            <div className="flex flex-col mobile:w-1/2 mobile:pr-2">
              <label htmlFor="">Số điện thoại *</label>
              <input
                type="text"
                className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
                value={dataChange.mobile}
                onChange={(e) =>
                  setDataChange({
                    ...dataChange,
                    mobile: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col mobile:w-1/2 mobile:pl-2">
              <label htmlFor="">Địa chỉ email *</label>
              <input
                type="email"
                className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
                value={dataChange.email}
                onChange={(e) =>
                  setDataChange({ ...dataChange, email: e.target.value })
                }
              />
            </div>
          </div>
        </form>
      </div>
      <div className="">
        <h3 className="text-main font-semibold text-base mb-2">
          THAY ĐỔI MẬT KHẨU
        </h3>
        <div className="h-[1px] border-t"></div>
        <form
          action=""
          className="flex flex-col font-semibold text-black text-sm mt-4"
        >
          <label htmlFor="">Mật khẩu hiện tại (bỏ trống nếu không đổi)</label>
          <input
            value={dataChange.oldPassword}
            onChange={(e) =>
              setDataChange({
                ...dataChange,
                oldPassword: e.target.value,
              })
            }
            type="password"
            className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
          />
          <label htmlFor="">Mật khẩu mới (bỏ trống nếu không đổi)</label>
          <input
            value={dataChange.newPassword}
            onChange={(e) =>
              setDataChange({
                ...dataChange,
                newPassword: e.target.value,
              })
            }
            type="password"
            className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
          />
          <label htmlFor="">Xác nhận mật khẩu mới</label>
          <input
            value={dataChange.newPassword2}
            onChange={(e) =>
              setDataChange({
                ...dataChange,
                newPassword2: e.target.value,
              })
            }
            type="password"
            className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
          />
          <button
            className="text-white bg-black w-[120px] py-2 mt-4 mb-2"
            onClick={handleUpdate}
          >
            LƯU THAY ĐỔI
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
