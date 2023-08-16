/* eslint-disable react/prop-types */

import { useState } from "react";
import { toast } from "react-toastify";
import MarkdownEditor from "../../components/admin/MardownEditor";
import { apiUploadImages } from "../../apis";
import { useDispatch } from "react-redux";
import { setModal } from "../../store/app/appSlice";
import { Loading } from "../../components/general";

const EditProduct = ({
  dataUpdate,
  setDataUpdate,
  handleUpdate,
  setIdEdit,
  id,
}) => {
  const dispatch = useDispatch();
  const [isOpenMD, setIsOpenMD] = useState(false);

  const handleUploadImages = async (e) => {
    let formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++)
      formData.append("images", e.target.files[i]);
    dispatch(setModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUploadImages(formData);
    dispatch(setModal({ isShowModal: false, modalChildren: null }));
    if (response.message === "Success") {
      for (let i = 0; i < response.data.length; i++)
        dataUpdate.imagesUrl.push(response.data[i]);
      setDataUpdate({ ...dataUpdate });
    } else {
      toast(response.message);
    }
  };

  return (
    <div className="border-black border-2 mt-8 flex flex-col">
      <span className="bg-black text-white font-semibold text-sm text-center py-1">
        Update Product
      </span>
      <div className="p-4 flex flex-col gap-2">
        <div className="flex gap-4">
          <div className="flex flex-1">
            <label className="font-semibold mr-2 min-w-[50px]" htmlFor="">
              Title:
            </label>
            <input
              className="outline-none border px-2 text-sm flex-1"
              type="text"
              value={dataUpdate.title}
              onChange={(e) =>
                setDataUpdate({ ...dataUpdate, title: e.target.value })
              }
            />
          </div>
          <div className="flex flex-1">
            <label className="font-semibold mr-2 min-w-[50px]" htmlFor="">
              Code:
            </label>
            <input
              className="outline-none border px-2 text-sm flex-1"
              type="text"
              value={dataUpdate.code}
              onChange={(e) =>
                setDataUpdate({ ...dataUpdate, code: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-1">
            <label className="font-semibold mr-2 min-w-[50px]" htmlFor="">
              Brand:
            </label>
            <input
              className="outline-none border px-2 text-sm flex-1"
              type="text"
              value={dataUpdate.brand}
              onChange={(e) =>
                setDataUpdate({ ...dataUpdate, brand: e.target.value })
              }
            />
          </div>
          <div className="flex flex-1">
            <label className="font-semibold mr-2 min-w-[50px]" htmlFor="">
              Model:
            </label>
            <input
              className="outline-none border px-2 text-sm flex-1"
              type="text"
              value={dataUpdate.model}
              onChange={(e) =>
                setDataUpdate({ ...dataUpdate, model: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-1">
            <label className="font-semibold mr-2 min-w-[50px]" htmlFor="">
              Color:
            </label>
            <input
              className="outline-none border px-2 text-sm flex-1"
              type="text"
              value={dataUpdate.color}
              onChange={(e) =>
                setDataUpdate({ ...dataUpdate, color: e.target.value })
              }
            />
          </div>
          <div className="flex flex-1">
            <label className="font-semibold mr-2 min-w-[50px]" htmlFor="">
              Price:
            </label>
            <input
              className="outline-none border px-2 text-sm flex-1"
              type="number"
              value={dataUpdate.price}
              onChange={(e) =>
                setDataUpdate({ ...dataUpdate, price: e.target.value })
              }
            />
          </div>
          <div className="flex flex-1">
            <label className="font-semibold mr-2 min-w-[50px]" htmlFor="">
              SalePrice:
            </label>
            <input
              className="outline-none border px-2 text-sm flex-1"
              type="number"
              value={dataUpdate.salePrice}
              onChange={(e) =>
                setDataUpdate({ ...dataUpdate, salePrice: e.target.value })
              }
            />
          </div>
          <div className="flex flex-1">
            <label className="font-semibold mr-2 min-w-[50px]" htmlFor="">
              Discount:
            </label>
            <span>
              {Math.round((1 - dataUpdate.salePrice / dataUpdate.price) * 100)}%
            </span>
          </div>
        </div>
        <div className="flex gap-4 pr-2">
          <div className="flex-1 flex">
            <div className="flex flex-1">
              <label className="font-semibold mr-2 min-w-[50px]" htmlFor="">
                Sold:
              </label>
              <input
                className="outline-none border px-2 text-sm flex-1"
                type="number"
                value={dataUpdate.sold}
                onChange={(e) =>
                  setDataUpdate({ ...dataUpdate, sold: e.target.value })
                }
              />
            </div>
            <div className="flex flex-1">
              <label className="font-semibold mr-2 min-w-[50px]" htmlFor="">
                Stock:
              </label>
              <input
                className="outline-none border px-2 text-sm flex-1"
                type="number"
                value={dataUpdate.stock}
                onChange={(e) =>
                  setDataUpdate({ ...dataUpdate, stock: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-1">
            <label className="font-semibold mr-2 min-w-[20px]" htmlFor="">
              Size:
            </label>
            {dataUpdate?.sizes?.map((item, index) => (
              <span
                key={index}
                onClick={() => {
                  dataUpdate.sizes.splice(index, 1),
                    setDataUpdate({
                      ...dataUpdate,
                    });
                }}
                className="mr-2 border px-1 hover:before:block cursor-pointer before:text-red-500 before:right-0 before:-top-2 before:hidden before:content-['x'] before:absolute relative"
              >
                {item}
              </span>
            ))}
            <input
              type="number"
              className="self-end outline-none border max-w-[40px] px-1 text-center"
              placeholder="..."
            />
            <button
              onClick={(e) => {
                dataUpdate.sizes.push(+e.target.previousSibling.value);
                e.target.previousSibling.value = "";
                setDataUpdate({
                  ...dataUpdate,
                });
              }}
              className="border px-1 rounded-sm ml-2 bg-blue-400"
            >
              Add
            </button>
          </div>
        </div>
        <MarkdownEditor
          name="description"
          handleChange={setDataUpdate}
          label="Description"
          value={dataUpdate.description}
          isOpenMD={isOpenMD}
          setIsOpenMD={setIsOpenMD}
        />
        <div className="flex flex-col gap-2">
          <div className="flex">
            <span className="font-semibold">Images:</span>
            <label
              htmlFor="images"
              className=" bg-orange-400 w-16 text-center rounded-sm ml-3"
            >
              Upload
            </label>
            <input
              type="file"
              multiple
              id="images"
              hidden
              onChange={handleUploadImages}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {dataUpdate?.imagesUrl?.map((item, index) => (
              <div
                className="  relative before:hidden  hover:before:block cursor-pointer before:text-red-500 before:right-0 before:-top-2 before:z-10 before:content-['x'] before:absolute "
                key={index}
                onClick={() => {
                  dataUpdate.imagesUrl.splice(index, 1),
                    setDataUpdate({
                      ...dataUpdate,
                    });
                }}
              >
                <img src={item} alt="" className="w-[100px]  " />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-2 flex gap-2 justify-end">
        <button
          onClick={() => handleUpdate(id)}
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
  );
};

export default EditProduct;
