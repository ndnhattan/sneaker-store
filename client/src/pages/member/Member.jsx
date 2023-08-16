import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Footer, Header, Bubble } from "../../components/general";
import path from "../../utils/paths";
import { avatar } from "../../assets/images/";
import { memberNav } from "../../utils/constants";
import { getCurrent } from "../../store/user/userSlice";

const Member = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, current } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(`/${path.LOGIN}`);
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCurrent());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div>
      <Header />
      <div className="border-t-2 pt-8 pb-8">
        <div className="max-w-main mx-auto px-4 flex flex-col tablet:flex-row">
          <div className="flex-1 flex tablet:border-r flex-col gap-4 tablet:mr-8 ">
            <div className="flex items-center gap-2">
              <img src={avatar} alt="" className="rounded-full mr-2" />
              <span className="text-main">{current?.firstName}</span>
              <span className="italic text-main font-light">#2487</span>
            </div>
            <div className="flex flex-col pb-4">
              {memberNav?.map((item) => (
                <NavLink
                  to={path.MEMBER + item.path}
                  key={item.id}
                  className={({ isActive }) =>
                    isActive
                      ? `text-black font-semibold ${
                          item.value !== "THOÁT" && "border-b"
                        } tablet:border-r-4 text-xs py-3 tablet:border-r-black`
                      : `text-main font-semibold ${
                          item.value !== "THOÁT" && "border-b"
                        } text-xs py-3`
                  }
                >
                  {item.value}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex-3">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
      <Bubble />
    </div>
  );
};

export default Member;
