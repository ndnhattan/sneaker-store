import { useState, useEffect, useRef } from "react";
import {
  GoMoveToTop,
  BiSolidMessageDetail,
  IoMdClose,
} from "../../utils/icons";
import {
  messenger,
  instagram,
  zalo,
  call,
  location,
} from "../../assets/logos/";

const Bubble = () => {
  const [isShowBubble, setIsShowBubble] = useState(false);
  const myRef = useRef();

  const handleScroll = () => {
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 20) {
        myRef.current && (myRef.current.style.display = "flex");
      } else {
        myRef.current && (myRef.current.style.display = "none");
      }
    });
    return () => window.removeEventListener("scroll", () => {});
  }, []);

  return (
    <div className="">
      <div className="hidden tablet:block">
        <div
          className="fixed w-[60px] h-[60px] rounded-full flex items-center justify-center bottom-[140px] right-7 cursor-pointer bg-green-800 text-white flex-col"
          onClick={() => {
            setIsShowBubble(!isShowBubble);
          }}
        >
          {isShowBubble ? (
            <>
              <IoMdClose size={30} />
            </>
          ) : (
            <>
              <BiSolidMessageDetail size={20} />
              <span className="text-xs">Liên hệ</span>
            </>
          )}
        </div>
        {isShowBubble && (
          <div className="fixed bg-white w-[253px] h-[298px] shadow-xl rounded-xl bottom-[214px] right-[20px] before:content-[''] before:absolute before:top-[98%] before:left-[83%]   before:bg-white before:w-3 before:h-3 before:rotate-45  ">
            <div className="flex flex-col  justify-around  h-full text-gray-600 ">
              <div className="flex gap-2 items-center cursor-pointer hover:bg-gray-200">
                <span className="pl-3">
                  <img src={messenger} alt="" className="w-10 h-10" />
                </span>
                <span>Messenger</span>
              </div>
              <div className="flex gap-2 items-center cursor-pointer hover:bg-gray-200">
                <span className="pl-3">
                  <img src={instagram} alt="" className="w-10 h-10" />
                </span>
                <span>Instagram</span>
              </div>
              <div className="flex gap-2 items-center cursor-pointer hover:bg-gray-200">
                <span className="pl-3">
                  <img src={zalo} alt="" className="w-10 h-10" />
                </span>
                <span>Chat Zalo</span>
              </div>
              <div className="flex gap-2 items-center cursor-pointer hover:bg-gray-200">
                <span className="pl-3">
                  <img src={call} alt="" className="w-10 h-10" />
                </span>
                <span>Liên hệ</span>
              </div>
              <div className="flex gap-2 items-center cursor-pointer hover:bg-gray-200">
                <span className="pl-3">
                  <img src={location} alt="" className="w-10 h-10" />
                </span>
                <span>Chỉ đường</span>
              </div>
            </div>
          </div>
        )}
        <div
          className="fixed w-[38px] h-[38px] animate-bounce border-2 border-gray-500 rounded-full flex items-center justify-center bottom-20 right-10 cursor-pointer hover:bg-black hover:text-white hover:border-black duration-300"
          onClick={handleScroll}
          ref={myRef}
        >
          <GoMoveToTop />
        </div>
      </div>
      <div className="tablet:hidden flex fixed bottom-0 w-full bg-white shadow-3xl  z-20">
        <div className="flex justify-center items-center flex-col gap-1 pt-2 border-r w-[20%]">
          <span>
            <img src={messenger} alt="" className="w-6 h-6" />
          </span>
          <span className="text-[11px] text-gray-600">Messenger</span>
        </div>
        <div className="flex justify-center items-center flex-col gap-1 pt-2 border-r w-[20%]">
          <span>
            {" "}
            <img src={instagram} alt="" className="w-6 h-6" />
          </span>
          <span className="text-[11px] text-gray-600">Instagram</span>
        </div>
        <div className="flex justify-center items-center flex-col gap-1 pt-2 border-r w-[20%]">
          <span>
            {" "}
            <img src={zalo} alt="" className="w-6 h-6" />
          </span>
          <span className="text-[11px] text-gray-600">Chat Zalo</span>
        </div>
        <div className="flex justify-center items-center flex-col gap-1 pt-2 border-r w-[20%]">
          <span>
            {" "}
            <img src={call} alt="" className="w-6 h-6" />
          </span>
          <span className="text-[11px] text-gray-600">Liên hệ</span>
        </div>
        <div className="flex justify-center items-center flex-col gap-1 pt-2  w-[20%]">
          <span>
            {" "}
            <img src={location} alt="" className="w-6 h-6" />
          </span>
          <span className="text-[11px] text-gray-600">Chỉ đường</span>
        </div>
      </div>
    </div>
  );
};

export default Bubble;
