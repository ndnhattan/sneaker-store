/* eslint-disable react/prop-types */

import { useState } from "react";
import { toast } from "react-toastify";
import MarkdownEditor from "../../components/admin/MardownEditor";
import { apiUploadImages, apiCreateProduct } from "../../apis";
import { useDispatch } from "react-redux";
import { setModal } from "../../store/app/appSlice";
import { Loading } from "../../components/general";

const CreateProduct = ({ setIsCreate, setRefresh, refresh }) => {
  const dispatch = useDispatch();
  const [isOpenMD, setIsOpenMD] = useState(false);
  const [dataCreate, setDataCreate] = useState({
    code: "",
    title: "",
    brand: "",
    model: "",
    color: "",
    price: "",
    salePrice: "",
    sold: "",
    stock: "",
    sizes: [],
    description: "",
    imagesUrl: [],
  });

  const handleUploadImages = async (e) => {
    let formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++)
      formData.append("images", e.target.files[i]);
    dispatch(setModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUploadImages(formData);
    dispatch(setModal({ isShowModal: false, modalChildren: null }));
    if (response.message === "Success") {
      for (let i = 0; i < response.data.length; i++)
        dataCreate.imagesUrl.push(response.data[i]);
      setDataCreate({ ...dataCreate });
    } else {
      toast(response.message);
    }
  };

  const handleCreate = async () => {
    const response = await apiCreateProduct(dataCreate);
    if (response.message === "Success") {
      setIsCreate(false);
      setRefresh(!refresh);
      toast("Ok");
    } else {
      toast(response.message);
    }
  };

  return (
    <div className="border-black border-2 mt-8 flex flex-col">
      <span className="bg-black text-white font-semibold text-sm text-center py-1">
        Create New Product
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
              value={dataCreate.title}
              onChange={(e) =>
                setDataCreate({ ...dataCreate, title: e.target.value })
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
              value={dataCreate.code}
              onChange={(e) =>
                setDataCreate({ ...dataCreate, code: e.target.value })
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
              value={dataCreate.brand}
              onChange={(e) =>
                setDataCreate({ ...dataCreate, brand: e.target.value })
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
              value={dataCreate.model}
              onChange={(e) =>
                setDataCreate({ ...dataCreate, model: e.target.value })
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
              value={dataCreate.color}
              onChange={(e) =>
                setDataCreate({ ...dataCreate, color: e.target.value })
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
              value={dataCreate.price}
              onChange={(e) =>
                setDataCreate({ ...dataCreate, price: e.target.value })
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
              value={dataCreate.salePrice}
              onChange={(e) =>
                setDataCreate({ ...dataCreate, salePrice: e.target.value })
              }
            />
          </div>
          <div className="flex flex-1">
            <label className="font-semibold mr-2 min-w-[50px]" htmlFor="">
              Discount:
            </label>
            <span>
              {Math.round((1 - dataCreate.salePrice / dataCreate.price) * 100)}%
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
                value={dataCreate.sold}
                onChange={(e) =>
                  setDataCreate({ ...dataCreate, sold: e.target.value })
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
                value={dataCreate.stock}
                onChange={(e) =>
                  setDataCreate({ ...dataCreate, stock: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-1">
            <label className="font-semibold mr-2 min-w-[20px]" htmlFor="">
              Size:
            </label>
            {dataCreate?.sizes?.map((item, index) => (
              <span
                key={index}
                onClick={() => {
                  dataCreate.sizes.splice(index, 1),
                    setDataCreate({
                      ...dataCreate,
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
                dataCreate.sizes.push(+e.target.previousSibling.value);
                e.target.previousSibling.value = "";
                setDataCreate({
                  ...dataCreate,
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
          handleChange={setDataCreate}
          label="Description"
          value={dataCreate.description}
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
            {dataCreate?.imagesUrl?.map((item, index) => (
              <div
                className="  relative before:hidden  hover:before:block cursor-pointer before:text-red-500 before:right-0 before:-top-2 before:z-10 before:content-['x'] before:absolute "
                key={index}
                onClick={() => {
                  dataCreate.imagesUrl.splice(index, 1),
                    setDataCreate({
                      ...dataCreate,
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
          onClick={() => handleCreate()}
          className="bg-purple-400 rounded-sm px-2 py-1"
        >
          Create
        </button>
        <button
          className="bg-gray-500 rounded-sm px-2 py-1"
          onClick={() => setIsCreate(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
