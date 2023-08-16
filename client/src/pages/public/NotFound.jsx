import { BiSearch } from "../../utils/icons";

const NotFound = () => {
  return (
    <div className="max-w-main mx-auto tablet:h-[245px] flex flex-col pb-12 mobile:pb-0 mobile:flex-row items-center text-main px-4">
      <div className="flex-1  text-center">
        <span className=" font-semibold text-8xl">404</span>
      </div>
      <div className="flex-2 flex flex-col gap-3">
        <span className="text-[27px] font-semibold">
          Oops! That page can’t be found.
        </span>
        <span>
          It looks like nothing was found at this location. Maybe try one of the
          links below or a search?
        </span>
        <div className="flex">
          <div className="border shadow-inner p-2 w-[90%]">
            {" "}
            <input
              type="text"
              name=""
              id=""
              placeholder="Tìm kiếm sản phẩm, thương hiệu,..."
              className="outline-none"
            />
          </div>
          <div className="bg-black w-[41.6px] flex justify-center items-center text-white font-semibold">
            <BiSearch size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
