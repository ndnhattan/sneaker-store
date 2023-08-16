import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { apiGetAllUsers, apiDeleteUser, apiUpdateUserAdmin } from "../../apis";
import { MdDeleteOutline, BiEdit, GrPrevious, GrNext } from "../../utils/icons";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [filter, setFilter] = useState({
    title: "",
    page: 1,
    limit: 10,
  });
  const [idEdit, setIdEdit] = useState(-1);
  const [dataUpdate, setDataUpdate] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    mobile: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetAllUsers(filter);
      if (response.message === "Success") {
        setUsers(response.data);
        setTotalUsers(response.total);
      }
    };
    fetchData();
  }, [filter, refresh]);

  const totalPage = Math.ceil(totalUsers / filter.limit);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure...",
      text: "Are you ready remove this user?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(id);
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
      email: users[idEdit]?.email,
      firstName: users[idEdit]?.firstName,
      lastName: users[idEdit]?.lastName,
      role: users[idEdit]?.role,
      mobile: users[idEdit]?.mobile,
    });
  }, [users, idEdit]);

  const handleUpdate = async (id) => {
    Swal.fire({
      title: "Are you sure...",
      text: "Are you ready update this user?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiUpdateUserAdmin(id, dataUpdate);
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
      <h2 className="font-semibold text-xl border-b-2 pb-3">Manage Users</h2>
      {idEdit !== -1 && (
        <div className="border-black border-2 mt-8 flex flex-col">
          <span className="bg-black text-white font-semibold text-sm text-center py-1">
            Update User
          </span>
          <div className="p-4 flex flex-col gap-2">
            <div className="flex w-1/2">
              <label className="font-semibold mr-2 min-w-[70px]" htmlFor="">
                Email:
              </label>
              <input
                className="outline-none border px-2 text-sm flex-1"
                type="text"
                value={dataUpdate.email}
                onChange={(e) =>
                  setDataUpdate({ ...dataUpdate, email: e.target.value })
                }
              />
            </div>

            <div className="flex w-1/2">
              <label className="font-semibold mr-2 min-w-[70px]" htmlFor="">
                FirstName:
              </label>
              <input
                className="outline-none border px-2 text-sm flex-1"
                type="text"
                value={dataUpdate.firstName}
                onChange={(e) =>
                  setDataUpdate({ ...dataUpdate, firstName: e.target.value })
                }
              />
            </div>
            <div className="flex w-1/2">
              <label className="font-semibold mr-2 min-w-[70px]" htmlFor="">
                LastName:
              </label>
              <input
                className="outline-none border px-2 text-sm flex-1"
                type="text"
                value={dataUpdate.lastName}
                onChange={(e) =>
                  setDataUpdate({ ...dataUpdate, lastName: e.target.value })
                }
              />
            </div>

            <div className="flex w-1/2">
              <label className="font-semibold mr-2 min-w-[70px]" htmlFor="">
                Role:
              </label>
              <select
                className="outline-none border px-2 text-sm"
                name=""
                id=""
                value={dataUpdate.role}
                onChange={(e) =>
                  setDataUpdate({ ...dataUpdate, role: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="tanbasa">Admin</option>
              </select>
            </div>
            <div className="flex w-1/2">
              <label className="font-semibold mr-2 min-w-[70px]" htmlFor="">
                Mobile:
              </label>
              <input
                className="outline-none border px-2 text-sm flex-1"
                type="number"
                value={dataUpdate.mobile}
                onChange={(e) =>
                  setDataUpdate({ ...dataUpdate, mobile: e.target.value })
                }
              />
            </div>
          </div>
          <div className="p-2 flex gap-2 justify-end">
            <button
              onClick={() => handleUpdate(users[idEdit]._id)}
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
          placeholder="Search first name or last name or email user..."
          disabled={idEdit !== -1}
        />
        <button></button>
      </div>

      <table className="border-2 mt-4 border-black w-full">
        <thead className="bg-black text-white text-sm text-left">
          <tr>
            <th className="px-2">#</th>
            <th className="px-2">Email address</th>
            <th className="px-2">FirstName</th>
            <th className="px-2">LastName</th>
            <th className="px-2">Role</th>
            <th className="px-2">Phone</th>
            <th className="px-2">Created At</th>
            <th className="px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((item, index) => (
            <tr key={item._id} className="border-b border-gray-400">
              <td className="px-2">{index + 1}</td>
              <td className="px-2">{item.email}</td>
              <td className="px-2">{item.firstName}</td>
              <td className="px-2">{item.lastName}</td>
              <td className="px-2">
                {item.role === "tanbasa" ? "Admin" : "User"}
              </td>
              <td className="px-2">{item.mobile}</td>
              <td className="px-2">{item.createdAt.split("T")[0]}</td>
              <td className="px-2">
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
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-8">
        <span className="italic text-sm">{`Show users ${
          (filter.page - 1) * filter.limit + 1
        } - ${
          filter.page === totalPage ? totalUsers : filter.page * filter.limit
        } of ${totalUsers}`}</span>
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

export default ManageUser;
