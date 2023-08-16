import { useDispatch } from "react-redux";
import { setModal } from "../../store/app/appSlice";
import FilterProduct from "./FilterProduct";
import { AiOutlineClose } from "../../utils/icons";
// eslint-disable-next-line react/prop-types
const MobileFilterModal = ({ filter, setFilter, outlet }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    document.body.style.overflowY = "auto";
    dispatch(setModal({ isShowModal: false, modalChildren: null }));
  };

  return (
    <div className="fixed inset-0" onClick={handleClick}>
      <div
        className="bg-white opacity-90 w-[260px] pl-4 h-screen"
        onClick={(e) => e.stopPropagation()}
      >
        <FilterProduct
          filter={filter}
          setFilter={setFilter}
          outlet={outlet}
          mobile={true}
          handleClick={handleClick}
        />
      </div>
      <button className="absolute top-3 right-4 cursor-pointer">
        <AiOutlineClose color="white" size={20} />
      </button>
    </div>
  );
};

export default MobileFilterModal;
