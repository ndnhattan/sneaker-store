import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/user/userSlice";
import { BiCheck } from "../../utils/icons.js";
import path from "../../utils/paths.js";
import { apiLogout } from "../../apis/";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const handleLogout = async () => {
    await apiLogout(token);
    dispatch(logout());
    navigate(`/${path.LOGIN}`);
  };

  return (
    <div className="flex flex-col gap-4 text-main">
      <div className="text-[#446084] flex gap-2 ">
        <span>
          <BiCheck size={24} />
        </span>
        <span> Bạn có chắc chắn muốn đăng xuất không? </span>
        <button
          className="cursor-pointe bg-black text-white px-2"
          onClick={handleLogout}
        >
          Đăng xuất
        </button>
      </div>
      <span>
        Từ trang quản lý tài khoản bạn có thể xem{" "}
        <Link
          className="text-[#446084] hover:text-black"
          to={path.MEMBER + path.ORDER}
        >
          đơn hàng mới
        </Link>
        , quản lý{" "}
        <Link
          className="text-[#446084] hover:text-black"
          to={path.MEMBER + path.ADDRESS}
        >
          địa chỉ giao hàng và thanh toán
        </Link>
        , và{" "}
        <Link
          className="text-[#446084] hover:text-black"
          to={path.MEMBER + path.PROFILE}
        >
          sửa mật khẩu
        </Link>{" "}
        và{" "}
        <Link
          className="text-[#446084] hover:text-black"
          to={path.MEMBER + path.PROFILE}
        >
          thông tin tài khoản
        </Link>
        .
      </span>
    </div>
  );
};

export default Logout;
