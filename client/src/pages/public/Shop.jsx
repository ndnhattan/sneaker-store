import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import FilterProduct from "../../components/product/FilterProduct";
import ProductPreview from "../../components/product/ProductPreview";
import { apiGetProducts } from "../../apis/product";
import { GrNext, GrPrevious, GiSettingsKnobs } from "../../utils/icons";
import { setModal } from "../../store/app/appSlice";
import MobileFilterModal from "../../components/product/MobileFilterModal";

// eslint-disable-next-line react/prop-types
const Shop = ({ outlet }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const sort = searchParams.get("sort");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState({
    page: 1,
    sort: sort ? sort : undefined,
    limit: 24,
    fields: undefined,
    sizes: undefined,
    brands: undefined,
    "discount[gt]": outlet ? 0 : undefined,
    title: title ? title : undefined,
  });
  useEffect(() => {
    const fetchData = async () => {
      const products = await apiGetProducts(filter);
      if (products?.message === "Success") {
        setProducts(products.data);
        setTotal(Math.ceil(products.total / filter.limit));
      }
    };
    fetchData();
  }, [filter]);
  useEffect(() => {
    setFilter({ ...filter, title });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const openModal = async () => {
    document.body.style.overflowY = "hidden";
    dispatch(
      setModal({
        isShowModal: true,
        modalChildren: (
          <MobileFilterModal
            filter={filter}
            setFilter={setFilter}
            outlet={outlet}
          />
        ),
      })
    );
  };

  return (
    <div className="max-w-main mx-auto px-4 flex mb-12 flex-col mobile:flex-row">
      <div className="hidden tablet:block w-[23%] mr-2 sticky top-0 self-start">
        <FilterProduct filter={filter} setFilter={setFilter} outlet={outlet} />
      </div>
      <div className="mobile:hidden flex mt-8 justify-between items-center">
        <div className="w-[49%]">
          <button
            onClick={openModal}
            className="flex items-center border w-full rounded-md p-2 text-main font-semibold gap-1 hover:text-black"
          >
            <span>
              <GiSettingsKnobs />
            </span>
            <span>LỌC </span>
          </button>
        </div>
        <div className="w-[49%]">
          <select
            name=""
            id=""
            className="w-full outline-none border rounded-md p-2 font-semibold text-main"
            onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
          >
            <option value={undefined}>Mới nhất</option>
            <option value="-sold">Thứ tự theo mức độ phổ biến</option>
            <option value="salePrice">Thứ tự theo giá: thấp đến cao</option>
            <option value="-salePrice">Thứ tự theo giá: cao xuống thấp</option>
          </select>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center gap-8">
        {products?.length === 0 && (
          <span className="mt-8">
            Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.
          </span>
        )}
        <div className="grid grid-cols-2 mobile:grid-cols-3 gap-4 ">
          {products?.map((item) => (
            <ProductPreview product={item} key={item._id} />
          ))}
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {filter.page !== 1 && (
            <button
              className=" border-2 w-[34px] h-[34px] border-gray-500 rounded-full flex items-center justify-center"
              onClick={() => {
                setFilter({ ...filter, page: filter.page - 1 });
                document.documentElement.scrollTop = 0;
              }}
            >
              <GrPrevious size={12} />
            </button>
          )}
          {Array(total)
            .fill(0)
            .map((item, index) =>
              Math.abs(index + 1 - filter.page) <= 3 ||
              index + 1 <= 3 ||
              index + 1 >= total - 2 ? (
                <button
                  key={index}
                  className={`border-2 w-[34px] h-[34px]  rounded-full flex items-center justify-center hover:border-black hover:bg-black hover:text-white ${
                    filter.page === index + 1
                      ? "border-black bg-black text-white"
                      : "border-gray-500"
                  }`}
                  onClick={() => {
                    setFilter({ ...filter, page: index + 1 });
                    document.documentElement.scrollTop = 0;
                  }}
                >
                  {index + 1}
                </button>
              ) : (
                <button
                  key={index}
                  className={
                    index === filter.page + 3 || index === filter.page - 5
                      ? `hover:border-black hover:bg-black hover:text-white border-2 w-[34px] h-[34px]  rounded-full flex items-center justify-center border-gray-500`
                      : "hidden"
                  }
                >
                  ...
                </button>
              )
            )}
          {filter.page !== total && (
            <button
              className=" border-2 w-[34px] h-[34px] border-gray-500 rounded-full flex items-center justify-center"
              onClick={() => {
                setFilter({ ...filter, page: filter.page + 1 });
                document.documentElement.scrollTop = 0;
              }}
            >
              <GrNext size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
