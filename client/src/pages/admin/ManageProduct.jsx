import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import { apiGetProducts, apiDeleteProduct, apiUpdateProduct } from "../../apis";
import { MdDeleteOutline, BiEdit, GrPrevious, GrNext } from "../../utils/icons";
import { VND } from "../../utils/helpers";
import EditProduct from "../../components/admin/EditProduct";
import CreateProduct from "../../components/admin/CreateProduct";

// eslint-disable-next-line react/prop-types
const ManageProduct = () => {
  const isShowMenu = useOutletContext();
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filter, setFilter] = useState({
    title: "",
    page: 1,
    limit: 10,
  });
  const [idEdit, setIdEdit] = useState(-1);
  const [isCreate, setIsCreate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({
    code: "",
    title: "",
    brand: "",
    model: "",
    color: "",
    price: "",
    salePrice: "",
    sold: "",
    stock: "",
    sizes: "",
    description: "",
    imagesUrl: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetProducts(filter);
      if (response.message === "Success") {
        setProducts(response.data);
        setTotalProducts(response.total);
      }
    };
    fetchData();
  }, [filter, refresh]);

  const totalPage = Math.ceil(totalProducts / filter.limit);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure...",
      text: "Are you ready remove this product?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteProduct(id);
        if (response.message === "Success") {
          setRefresh(!refresh);
          toast("Ok");
        } else {
          toast(response.message);
        }
      }
    });
  };

  useEffect(() => {
    setDataUpdate({
      code: products[idEdit]?.code,
      title: products[idEdit]?.title,
      brand: products[idEdit]?.brand,
      model: products[idEdit]?.model,
      color: products[idEdit]?.color,
      price: products[idEdit]?.price,
      salePrice: products[idEdit]?.salePrice,
      sold: products[idEdit]?.sold,
      stock: products[idEdit]?.stock,
      sizes: products[idEdit]?.sizes,
      description: products[idEdit]?.description,
      imagesUrl: products[idEdit]?.imagesUrl,
    });
  }, [products, idEdit]);

  const handleUpdate = async (id) => {
    Swal.fire({
      title: "Are you sure...",
      text: "Are you ready update this product?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiUpdateProduct(id, dataUpdate);
        if (response.message === "Success") {
          setIdEdit(-1);
          setRefresh(!refresh);
          toast("Ok");
        } else {
          toast(response.message);
        }
      }
    });
  };

  return (
    <div>
      <h2 className="font-semibold text-xl border-b-2 pb-3">Manage Products</h2>{" "}
      {idEdit !== -1 && (
        <EditProduct
          dataUpdate={dataUpdate}
          setDataUpdate={setDataUpdate}
          handleUpdate={handleUpdate}
          setIdEdit={setIdEdit}
          id={products[idEdit]._id}
        />
      )}
      {isCreate && (
        <CreateProduct
          setIsCreate={setIsCreate}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}
      <div className="flex justify-between items-center">
        <div className="w-1/2">
          <button
            className={`bg-orange-400 px-2 rounded ${
              (idEdit !== -1 || isCreate) && "hidden"
            }`}
            onClick={() => setIsCreate(true)}
          >
            Create new product
          </button>
        </div>
        <input
          type="text"
          value={filter.title}
          onChange={(e) => setFilter({ ...filter, title: e.target.value })}
          className="placeholder:text-sm border px-2 py-1 placeholder:italic w-1/2 mt-4 outline-none"
          placeholder="Search title, brand, model, color or code..."
          disabled={idEdit !== -1 || isCreate}
        />
        <button></button>
      </div>
      <table className="border-2 mt-4 border-black w-full">
        <thead className="bg-black text-white text-sm text-left">
          <tr>
            <th className="px-2">#</th>
            <th className="px-2">Code</th>
            <th className="px-2">Thumb</th>
            <th className="px-2">Title</th>
            <th className="">Brand</th>
            <th className="px-2">Model</th>
            <th className="px-2">Color</th>
            <th className="px-2">Price</th>
            <th className="px-2">Sold/Stock</th>
            <th className="px-1">Created At</th>
            <th className="px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((item, index) => (
            <tr
              key={item._id}
              className={`border-b border-gray-400 ${
                !isShowMenu ? "text-sm " : "text-xs"
              }`}
            >
              <td className="pl-2 pr-1">{index + 1}</td>
              <td className="px-1">{item.code}</td>
              <td className="px-1">
                <img src={item.imagesUrl[0]} alt="" className="max-w-[50px]" />
              </td>
              <td className="px-1 border-r border-gray-400">{item.title}</td>
              <td className="px-1 border-r border-gray-400">{item.brand}</td>
              <td className="px-1 border-r border-gray-400">{item.model}</td>
              <td className="px-1">{item.color}</td>
              <td className="px-1 flex flex-col">
                <span className="mt-1 text-red-400">{`${VND.format(
                  item.salePrice
                )}`}</span>
                <span>{`${VND.format(item.price)}`}</span>
              </td>
              <td className="px-1 text-center">
                <span className="text-blue-400">{item.sold}</span>/
                <span className="text-red-600">{item.stock}</span>
              </td>
              <td className="px-1 min-w-[80px]">
                {item.createdAt.split("T")[0]}
              </td>
              <td className="px-1 text-center">
                <button
                  onClick={() => {
                    setIdEdit(index);
                  }}
                  className="mr-2"
                  disabled={idEdit !== -1 || isCreate}
                >
                  <BiEdit
                    color={idEdit !== -1 || isCreate ? "black" : "orange"}
                  />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={idEdit !== -1 || isCreate}
                >
                  <MdDeleteOutline
                    color={idEdit !== -1 || isCreate ? "black" : "red"}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-8">
        <span className="italic text-sm">{`Show products ${
          (filter.page - 1) * filter.limit + 1
        } - ${
          filter.page === totalPage ? totalProducts : filter.page * filter.limit
        } of ${totalProducts}`}</span>
        <div className="flex gap-2 flex-wrap justify-center">
          {filter.page !== 1 && (
            <button
              className=" border-2 w-[28px] h-[28px] border-gray-500 rounded-full flex items-center justify-center"
              onClick={() => {
                setFilter({ ...filter, page: filter.page - 1 });
                document.documentElement.scrollTop = 0;
              }}
              disabled={idEdit !== -1 || isCreate}
            >
              <GrPrevious size={12} />
            </button>
          )}
          {Array(totalPage)
            .fill(0)
            .map((item, index) =>
              Math.abs(index + 1 - filter.page) <= 3 ||
              index + 1 <= 3 ||
              index + 1 >= totalPage - 2 ? (
                <button
                  disabled={idEdit !== -1 || isCreate}
                  key={index}
                  className={`border-2 w-[28px] h-[28px]  rounded-full flex items-center justify-center hover:border-black hover:bg-black hover:text-white ${
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
                  disabled={idEdit !== -1 || isCreate}
                  key={index}
                  className={
                    index === filter.page + 3 || index === filter.page - 5
                      ? `hover:border-black hover:bg-black hover:text-white border-2 w-[28px] h-[28px]  rounded-full flex items-center justify-center border-gray-500`
                      : "hidden"
                  }
                >
                  ...
                </button>
              )
            )}
          {filter.page !== totalPage && (
            <button
              className=" border-2 w-[28px] h-[28px] border-gray-500 rounded-full flex items-center justify-center"
              onClick={() => {
                setFilter({ ...filter, page: filter.page + 1 });
                document.documentElement.scrollTop = 0;
              }}
              disabled={idEdit !== -1 || isCreate}
            >
              <GrNext size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
