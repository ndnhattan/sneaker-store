/* eslint-disable react/prop-types */
//import { useDispatch } from "react-redux";
//import { setModal } from "../../store/app/appSlice";

const Modal = ({ children }) => {
  return (
    <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] z-[100]">
      {children}
    </div>
  );
};

export default Modal;
