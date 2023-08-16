import { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  apiGetProvinces,
  apiGetDistricts,
  apiGetWards,
  apiUpdateAddress,
} from "../../apis";
import { validateForm } from "../../utils/helpers";
import { changeCurrent } from "../../store/user/userSlice";

const Address = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [error, setError] = useState();
  const [dataAddress, setDataAddress] = useState({
    province: "",
    district: "",
    ward: "",
    address: "",
  });
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [idAddress, setIdAddress] = useState([0, 0]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetProvinces();
      setProvinces(
        response.data.map((item) => ({
          value: item.name,
          label: item.name,
          code: item.code,
        }))
      );
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetDistricts(idAddress[0]);
      setDistricts(
        response.data.districts.map((item) => ({
          value: item.name,
          label: item.name,
          code: item.code,
        }))
      );
    };

    if (idAddress[0] !== 0) fetchData();
  }, [idAddress]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetWards(idAddress[1]);
      setWards(
        response.data.wards.map((item) => ({
          value: item.name,
          label: item.name,
        }))
      );
    };

    if (idAddress[1] !== 0) fetchData();
  }, [idAddress]);

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    const message = validateForm(dataAddress);
    if (message !== "Success") setError(message);
    else {
      setError("");
      const response = await apiUpdateAddress(dataAddress);
      if (response.message === "Success") {
        setModalUpdate(false);
        dispatch(changeCurrent(response.data));
      } else {
        setError(response.message);
      }
    }
  };

  return modalUpdate ? (
    <div className="flex flex-col gap-4 text-black">
      {error && (
        <div className="flex justify-center mb-8">
          <span className="text-red-400 font-semibold ">{error}</span>
        </div>
      )}
      <h3 className="text-[#555555] font-semibold text-xl">
        Địa chỉ giao hàng
      </h3>
      {current?.address && (
        <div className="flex flex-col">
          <span className="text-black font-semibold text-base border-b-2">
            Địa chỉ hiện tại
          </span>
          <span className="text-black font-semibold text-base">{`${current.address.address}, ${current.address.ward}, ${current.address.district}, ${current.address.province}`}</span>
          <span className="text-black font-semibold text-xl mt-4 border-b-2">
            Thay đổi địa chỉ
          </span>
        </div>
      )}
      <form
        action=""
        className="flex flex-col font-semibold text-black text-sm"
      >
        <h4>Quốc gia/Khu vực *</h4>
        <h4 className="my-2 text-main text-base">Việt Nam</h4>
        <label htmlFor="">Tỉnh/Thành phố *</label>
        <Select
          options={provinces}
          className="mt-1 mb-6"
          onChange={(e) => {
            setDataAddress({ ...dataAddress, province: e.value });
            setIdAddress([e.code, idAddress[1]]);
          }}
        />
        <label htmlFor="">Quận/Huyện *</label>
        <Select
          options={districts}
          className="mt-1 mb-6"
          onChange={(e) => {
            setDataAddress({ ...dataAddress, district: e.value });
            setIdAddress([idAddress[0], e.code]);
          }}
        />
        <label htmlFor="">Xã/Phường *</label>
        <Select
          options={wards}
          className="mt-1 mb-6"
          onChange={(e) => setDataAddress({ ...dataAddress, ward: e.value })}
        />
        <label htmlFor="">Địa chỉ *</label>
        <input
          type="text"
          className="border mt-1 outline-none h-10 mb-6 p-3 font-medium"
          value={dataAddress.address}
          onChange={(e) =>
            setDataAddress({ ...dataAddress, address: e.target.value })
          }
        />
        <button
          className="text-white bg-black w-[100px] py-2 mt-2 mb-2"
          onClick={handleUpdateAddress}
        >
          LƯU ĐỊA CHỈ
        </button>
      </form>
    </div>
  ) : (
    <div className="flex flex-col gap-4 text-main">
      <span>
        Các địa chỉ bên dưới mặc định sẽ được sử dụng ở trang thanh toán sản
        phẩm.
      </span>
      <div className="flex flex-col">
        <span className="font-semibold text-xl mb-2">Địa chỉ giao hàng</span>
        <span
          className="text-[#446084] cursor-pointer hover:text-black"
          onClick={() => setModalUpdate(true)}
        >
          {current?.address ? "Sửa" : "Thêm"}
        </span>
        <span className="italic">
          {current?.address
            ? `${current.address.address}, ${current.address.ward}, ${current.address.district}, ${current.address.province}`
            : "Bạn vẫn chưa thêm địa chỉ nào."}
        </span>
      </div>
    </div>
  );
};

export default Address;
