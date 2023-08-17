/* eslint-disable react/prop-types */
import { addSize } from "../../utils/helpers";
import { sizes, brands, sorts } from "../../utils/constants";
import { AiOutlineReload, MdWhatshot } from "../../utils/icons";

const FilterProduct = ({ filter, setFilter, outlet, mobile, handleClick }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filter["discount[gt]"] === 0 && !outlet && !mobile && (
          <div
            className="bg-gray-300 flex gap-1 py-1 px-4 rounded-lg cursor-pointer"
            onClick={() => {
              setFilter({
                ...filter,
                "discount[gt]": undefined,
              });
              document.documentElement.scrollTop = 0;
            }}
          >
            <span>x</span>
            <span>Sale</span>
          </div>
        )}
        {filter.sort && !mobile && (
          <div
            className="bg-gray-300 flex gap-1 py-1 px-4 rounded-lg cursor-pointer"
            onClick={() => {
              setFilter({
                ...filter,
                sort: undefined,
              });
              document.documentElement.scrollTop = 0;
            }}
          >
            <span>x</span>
            <span>
              {filter.sort === "salePrice"
                ? "Giá: thấp -> cao"
                : filter.sort === "-salePrice"
                ? "Giá: cao -> thấp"
                : "Bán chạy nhất"}
            </span>
          </div>
        )}
        {filter.brands &&
          !mobile &&
          filter.brands.split(",").map((item, index) => (
            <div
              className="bg-gray-300 flex gap-1 py-1 px-4 rounded-lg cursor-pointer"
              key={index}
              onClick={() => {
                setFilter({
                  ...filter,
                  brands: addSize(filter.brands, item),
                });
                document.documentElement.scrollTop = 0;
              }}
            >
              <span>x</span>
              <span>{item}</span>
            </div>
          ))}
        {filter.sizes &&
          !mobile &&
          filter.sizes.split(",").map((item, index) => (
            <div
              className="bg-gray-300 flex gap-1 py-1 px-4 rounded-lg cursor-pointer"
              key={index}
              onClick={() => {
                setFilter({
                  ...filter,
                  sizes: addSize(filter.sizes, item),
                });
                document.documentElement.scrollTop = 0;
              }}
            >
              <span>x</span>
              <span>{item}</span>
            </div>
          ))}
      </div>
      <div className="mt-8">
        <div className="">
          <span className="text-main font-semibold border-b-[3px] border-gray-300 pb-3">
            SIZE
          </span>
        </div>
        <div className="max-w-[240px] h-[150px] grid grid-cols-2 overflow-auto mt-6">
          {sizes.map((item) =>
            item.id === 0 ? (
              <div className="flex items-center cursor-pointer" key={item.id}>
                <div
                  className={` border w-[10px] h-[10px]  rounded-full ${
                    !filter.sizes && "bg-black"
                  }`}
                  onClick={() => {
                    handleClick && handleClick();
                    setFilter({
                      ...filter,
                      sizes: undefined,
                    });
                    document.documentElement.scrollTop = 0;
                  }}
                ></div>
                <span
                  className="pl-3"
                  onClick={() => {
                    handleClick && handleClick();
                    setFilter({
                      ...filter,
                      sizes: undefined,
                    });
                    document.documentElement.scrollTop = 0;
                  }}
                >
                  {item.value}
                </span>
              </div>
            ) : (
              <div className="flex items-center cursor-pointer" key={item.id}>
                <div
                  className={` border w-[10px] h-[10px]  rounded-full ${
                    filter.sizes?.split(",").includes(item.value + "") &&
                    "bg-black"
                  }`}
                  onClick={() => {
                    handleClick && handleClick();
                    setFilter({
                      ...filter,
                      sizes: addSize(filter.sizes, item.value),
                    });
                    document.documentElement.scrollTop = 0;
                  }}
                ></div>
                <span
                  className="pl-3"
                  onClick={() => {
                    handleClick && handleClick();
                    setFilter({
                      ...filter,
                      sizes: addSize(filter.sizes, item.value),
                    });
                    document.documentElement.scrollTop = 0;
                  }}
                >
                  {item.value}
                </span>
              </div>
            )
          )}
        </div>
      </div>
      <div className="mt-8">
        <div className="">
          <span className="text-main font-semibold border-b-[3px] border-gray-300 pb-3">
            THƯƠNG HIỆU
          </span>
        </div>
        <div className="max-w-[240px] h-[150px] grid grid-cols-1 overflow-auto mt-6">
          {" "}
          {brands.map((item) =>
            item.id === 0 ? (
              <div className="flex items-center cursor-pointer" key={item.id}>
                <div
                  className={` border w-[10px] h-[10px]  rounded-full ${
                    !filter.brands && "bg-black"
                  }`}
                  onClick={() => {
                    handleClick && handleClick();
                    setFilter({
                      ...filter,
                      brands: undefined,
                    });
                    document.documentElement.scrollTop = 0;
                  }}
                ></div>
                <span
                  className="pl-3"
                  onClick={() => {
                    handleClick && handleClick();
                    setFilter({
                      ...filter,
                      brands: undefined,
                    });
                    document.documentElement.scrollTop = 0;
                  }}
                >
                  {item.value}
                </span>
              </div>
            ) : (
              <div className="flex items-center cursor-pointer" key={item.id}>
                <div
                  className={` border w-[10px] h-[10px]  rounded-full ${
                    filter.brands?.split(",").includes(item.value + "") &&
                    "bg-black"
                  }`}
                  onClick={() => {
                    handleClick && handleClick();
                    setFilter({
                      ...filter,
                      brands: addSize(filter.brands, item.value),
                    });
                    document.documentElement.scrollTop = 0;
                  }}
                ></div>
                <span
                  className="pl-3"
                  onClick={() => {
                    handleClick && handleClick();
                    setFilter({
                      ...filter,
                      brands: addSize(filter.brands, item.value),
                    });
                    document.documentElement.scrollTop = 0;
                  }}
                >
                  {item.value}
                </span>
              </div>
            )
          )}
        </div>
      </div>
      {!mobile && (
        <div className="mt-8">
          <div className="">
            <span className="text-main font-semibold border-b-[3px] border-gray-300 pb-3">
              LỌC
            </span>
          </div>
          <div className="max-w-[240px] flex flex-col mt-6">
            {sorts.map((item) =>
              item.id === 0 ? (
                <div className="flex items-center cursor-pointer" key={item.id}>
                  <div
                    className={` border w-[10px] h-[10px]  rounded-full ${
                      !filter.sort && "bg-black"
                    }`}
                    onClick={() => {
                      handleClick && handleClick();
                      setFilter({
                        ...filter,
                        sort: undefined,
                      });
                      document.documentElement.scrollTop = 0;
                    }}
                  ></div>
                  <span
                    className="pl-3"
                    onClick={() => {
                      handleClick && handleClick();
                      setFilter({
                        ...filter,
                        sort: undefined,
                      });
                      document.documentElement.scrollTop = 0;
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ) : (
                <div className="flex items-center cursor-pointer" key={item.id}>
                  <div
                    className={` border w-[10px] h-[10px]  rounded-full ${
                      filter.sort === item.value && "bg-black"
                    }`}
                    onClick={() => {
                      handleClick && handleClick();
                      setFilter({
                        ...filter,
                        sort:
                          filter.sort === item.value ? undefined : item.value,
                      });
                      document.documentElement.scrollTop = 0;
                    }}
                  ></div>
                  <span
                    className="pl-3"
                    onClick={() => {
                      handleClick && handleClick();
                      setFilter({
                        ...filter,
                        sort:
                          filter.sort === item.value ? undefined : item.value,
                      });
                      document.documentElement.scrollTop = 0;
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      )}
      {!outlet && (
        <div
          className="flex gap-1 cursor-pointer mt-8"
          onClick={() => {
            handleClick && handleClick();
            filter["discount[gt]"] !== 0
              ? setFilter({
                  ...filter,
                  "discount[gt]": 0,
                })
              : setFilter({ ...filter, "discount[gt]": undefined });
            document.documentElement.scrollTop = 0;
          }}
        >
          <div
            className={`text-white w-[18px] h-[18px] rounded-full ${
              filter["discount[gt]"] !== 0 ? "bg-black" : "bg-red-500"
            } flex items-center justify-center`}
          >
            <span>
              <MdWhatshot size={12} />
            </span>
          </div>
          <span className="text-sm font-semibold">Sản phẩm đang giảm giá</span>
        </div>
      )}
      <div
        className="flex gap-1 cursor-pointer mt-4"
        onClick={() => window.location.reload()}
      >
        <div className="text-white w-[18px] h-[18px] rounded-full bg-black flex items-center justify-center">
          <span>
            <AiOutlineReload size={12} />
          </span>
        </div>
        <span className="text-sm font-semibold">Xóa bộ lọc</span>
      </div>
    </div>
  );
};

export default FilterProduct;
