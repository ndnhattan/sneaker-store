import {
  MdNavigateNext,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
} from "../../utils/icons";

const Footer = () => {
  return (
    <div>
      <div className="mobile:h-[300px] text-main shadow-3xl text-sm">
        <div className="max-w-main mx-auto px-3 flex flex-col gap-8 mobile:gap-0 mobile:flex-row py-8 ">
          <div className="flex-2 flex flex-col gap-4">
            <h3 className="text-base font-bold text-[#555]">LIÊN HỆ</h3>
            <div className="flex items-center gap-2">
              <span>
                <MdNavigateNext />
              </span>
              <span> 425/16 Nguyễn Đình Chiểu, Phường 5, Quận 3, TP. HCM </span>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <MdNavigateNext />
              </span>
              <span> Email: sneakerholicvietnam@gmail.com </span>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <MdNavigateNext />
              </span>
              <span> Hotline 0705 185 731 </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <h3 className="text-base font-bold text-[#555]">HỖ TRỢ</h3>
            <div className="flex items-center gap-2">
              <span>
                <MdNavigateNext />
              </span>
              <span> Chính sách chung </span>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <MdNavigateNext />
              </span>
              <span> Ưu đãi thành viên </span>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <MdNavigateNext />
              </span>
              <span> Tra cứu đơn hàng </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <h3 className="text-base font-bold text-[#555]">VỀ CÔNG TY</h3>
            <div className="flex items-center gap-2">
              <span>
                <MdNavigateNext />
              </span>
              <span> Tuyển Dụng </span>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <MdNavigateNext />
              </span>
              <span> Liên hệ </span>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <MdNavigateNext />
              </span>
              <span> Về Sneakerholic </span>
            </div>
          </div>
          <div className="flex-2 flex flex-col gap-4">
            <h3 className="text-base font-bold text-[#555]">
              Đăng ký nhận ưu đãi
            </h3>
            <div className="border shadow-inner mobile:max-w-[72%] p-2">
              <input
                type="text"
                placeholder="Nhập email của bạn"
                className="outline-none"
              />
            </div>
            <div className="bg-black mobile:max-w-[72%] p-2 text-center text-white font-bold uppercase">
              Gửi và đăng ký
            </div>
            <div className="flex max-w-[72%] items-center">
              <div className="flex-2 text-center font-semibold">
                Follow us:{" "}
              </div>
              <div className="flex-1  ">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com/sneakerholicvn/"
                  className="w-[33px] h-[33px] rounded-full border-2 items-center justify-center flex cursor-pointer hover:text-white hover:bg-blue-400 hover:border-blue-400"
                >
                  <BiLogoFacebook size={24} />
                </a>
              </div>
              <div className="flex-1 ">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.instagram.com/thesneakerholicvn/"
                  className="w-[33px] h-[33px] rounded-full border-2 items-center justify-center flex cursor-pointer hover:text-white hover:bg-blue-400 hover:border-blue-400"
                >
                  <BiLogoInstagram size={24} />
                </a>
              </div>
              <div className="flex-1 ">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.tiktok.com/@thesneakerholicvn"
                  className="w-[33px] h-[33px] rounded-full border-2 items-center justify-center flex cursor-pointer hover:text-white hover:bg-blue-400 hover:border-blue-400"
                >
                  <BiLogoTiktok size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-8 tablet:h-12 bg-[#5b5b5b] flex items-center justify-center text-[#ffffff80] text-xs tablet:text-sm ">
        <span>Copyright © 2021 The Sneakerholic. All rights reserved.</span>
      </div>
      <div className="tablet:hidden h-[53px]"></div>
    </div>
  );
};

export default Footer;
