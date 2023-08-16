import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { apiGetAllOrders, apiDeleteOrder, apiUpdateOrder } from "../../apis";
import {
  MdDeleteOutline,
  BiEdit,
  GrPrevious,
  GrNext,
  CiCircleMore,
} from "../../utils/icons";
import { VND } from "../../utils/helpers";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [idDetail, setIdDetail] = useState(-1);
  const [refresh, setRefresh] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);
  const [filter, setFilter] = useState({
    title: "",
    page: 1,
    limit: 10,
  });
  const [idEdit, setIdEdit] = useState(-1);
  const [dataUpdate, setDataUpdate] = useState({
    status: "",
    deliverType: "",
    paymentType: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetAllOrders(filter);
      if (response.message === "Success") {
        setOrders(response.data);
        setTotalOrders(response.total);
      }
    };
    fetchData();
  }, [filter, refresh]);

  const totalPage = Math.ceil(totalOrders / filter.limit);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure...",
      text: "Are you ready remove this order?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteOrder(id);
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
      status: orders[idEdit]?.status,
      deliverType: orders[idEdit]?.deliverType,
      paymentType: orders[idEdit]?.paymentType,
      description: orders[idEdit]?.description,
    });
  }, [orders, idEdit]);

  const handleUpdate = async (id) => {
    Swal.fire({
      title: "Are you sure...",
      text: "Are you ready update this order?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiUpdateOrder(id, dataUpdate);
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
      <h2 className="font-semibold text-xl border-b-2 pb-3">Manage Orders</h2>
      {idEdit !== -1 && (
        <div className="border-black border-2 mt-8 flex flex-col">
          <span className="bg-black text-white font-semibold text-sm text-center py-1">
            Update Order
          </span>
          <div className="p-4 flex flex-col gap-2">
            <div className="flex">
              {" "}
              <div className="flex w-1/2">
                <label className="font-semibold mr-2 min-w-[70px]" htmlFor="">
                  Status:
                </label>
                <select
                  className="outline-none border px-2 text-sm"
                  name=""
                  id=""
                  value={dataUpdate.status}
                  onChange={(e) =>
                    setDataUpdate({ ...dataUpdate, status: e.target.value })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex w-1/2">
                <label className="font-semibold mr-2 min-w-[70px]" htmlFor="">
                  Deliver:
                </label>
                <select
                  className="outline-none border px-2 text-sm"
                  name=""
                  id=""
                  value={dataUpdate.deliverType}
                  onChange={(e) =>
                    setDataUpdate({
                      ...dataUpdate,
                      deliverType: e.target.value,
                    })
                  }
                >
                  <option value="store">Store</option>
                  <option value="ship">Ship</option>
                </select>
              </div>
              <div className="flex w-1/2">
                <label className="font-semibold mr-2 min-w-[70px]" htmlFor="">
                  Payment:
                </label>
                <select
                  className="outline-none border px-2 text-sm"
                  name=""
                  id=""
                  value={dataUpdate.paymentType}
                  onChange={(e) =>
                    setDataUpdate({
                      ...dataUpdate,
                      paymentType: e.target.value,
                    })
                  }
                >
                  <option value="COD">COD</option>
                  <option value="banking">Banking</option>
                </select>
              </div>
            </div>

            <div className="flex w-1/2">
              <label className="font-semibold mr-2 min-w-[70px]" htmlFor="">
                Description:
              </label>
              <textarea
                className="outline-none border px-2 text-sm flex-1"
                type="text"
                value={dataUpdate.description}
                onChange={(e) =>
                  setDataUpdate({ ...dataUpdate, description: e.target.value })
                }
              />
            </div>
          </div>
          <div className="p-2 flex gap-2 justify-end">
            <button
              onClick={() => handleUpdate(orders[idEdit]._id)}
              className="bg-purple-400 rounded-sm px-2 py-1"
            >
              Update
            </button>
            <button
              className="bg-gray-500 rounded-sm px-2 py-1"
              onClick={() => setIdEdit(-1)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-end">
        <input
          type="text"
          value={filter.title}
          onChange={(e) => setFilter({ ...filter, title: e.target.value })}
          className="placeholder:text-sm border px-2 py-1 placeholder:italic mt-4 w-1/2 outline-none"
          placeholder="Search status, deliver or payment..."
          disabled={idEdit !== -1}
        />
        <button></button>
      </div>

      <table className="border-2 mt-4 border-black w-full">
        <thead className="bg-black text-white text-sm text-left">
          <tr>
            <th className="px-2">#</th>
            <th className="px-2">Date</th>
            <th className="px-2">Status</th>
            <th className="px-2">Total</th>
            <th className="px-2">Deliver</th>
            <th className="px-2">Payment</th>
            <th className="px-2">Description</th>
            <th className="px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((item, index) => (
            <>
              <tr key={item._id} className="border-b border-gray-400">
                <td className="px-2">{index + 1}</td>
                <td className="px-2">{item.createdAt.split("T")[0]}</td>
                <td className="px-2">{item.status}</td>
                <td className="px-2">{VND.format(item.totalPrice)}</td>
                <td className="px-2">{item.deliverType}</td>
                <td className="px-2">{item.paymentType}</td>
                <td className="px-2">{item.description}</td>
                <td className="px-2">
                  <button
                    onClick={() =>
                      idDetail !== index ? setIdDetail(index) : setIdDetail(-1)
                    }
                    disabled={idEdit !== -1}
                    className="mr-2"
                  >
                    <CiCircleMore color={idEdit !== -1 ? "black" : "purple"} />
                  </button>
                  <button
                    onClick={() => {
                      setIdEdit(index);
                    }}
                    className="mr-2"
                    disabled={idEdit !== -1}
                  >
                    <BiEdit color={idEdit !== -1 ? "black" : "orange"} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={idEdit !== -1}
                  >
                    <MdDeleteOutline color={idEdit !== -1 ? "black" : "red"} />
                  </button>
                </td>
              </tr>
              {idDetail === index && (
                <tr key={-1} className="border-b border-gray-400">
                  <td colSpan={10} className="">
                    {item.items.map((item) => (
                      <div
                        className="border-b flex items-center gap-2"
                        key={item.productId._id}
                      >
                        <img
                          src={item.productId.imagesUrl[0]}
                          alt=""
                          className="w-[100px]"
                        />
                        <span className="text-sm w-[200px]">
                          {item.productId.title}
                        </span>
                        <span className="text-blue-400">
                          {item.productId.sizes[0]}
                        </span>
                        <span>
                          {VND.format(item.productId.salePrice)} x{" "}
                          {item.quantity}
                        </span>
                        <span className="font-semibold">
                          {" "}
                          ={" "}
                          {VND.format(item.productId.salePrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-8">
        <span className="italic text-sm">{`Show orders ${
          (filter.page - 1) * filter.limit + 1
        } - ${
          filter.page === totalPage ? totalOrders : filter.page * filter.limit
        } of ${totalOrders}`}</span>
        <div className="flex gap-2 flex-wrap justify-center">
          {filter.page !== 1 && (
            <button
              className=" border-2 w-[24px] h-[24px] border-gray-500 rounded-full flex items-center justify-center"
              onClick={() => {
                setFilter({ ...filter, page: filter.page - 1 });
                document.documentElement.scrollTop = 0;
              }}
              disabled={idEdit !== -1}
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
                  disabled={idEdit !== -1}
                  key={index}
                  className={`border-2 w-[24px] h-[24px]  rounded-full flex items-center justify-center hover:border-black hover:bg-black hover:text-white ${
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
                  disabled={idEdit !== -1}
                  key={index}
                  className={
                    index === filter.page + 3 || index === filter.page - 5
                      ? `hover:border-black hover:bg-black hover:text-white border-2 w-[24px] h-[24px]  rounded-full flex items-center justify-center border-gray-500`
                      : "hidden"
                  }
                >
                  ...
                </button>
              )
            )}
          {filter.page !== totalPage && (
            <button
              className=" border-2 w-[24px] h-[24px] border-gray-500 rounded-full flex items-center justify-center"
              onClick={() => {
                setFilter({ ...filter, page: filter.page + 1 });
                document.documentElement.scrollTop = 0;
              }}
              disabled={idEdit !== -1}
            >
              <GrNext size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOrder;
