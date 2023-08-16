/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import path from "../../utils/paths";
import { VND } from "../../utils/helpers";
import { BsBagPlus } from "../../utils/icons";

const ProductPreview = ({ product }) => {
  return product.discount > 0 ? (
    <div className="relative flex flex-col items-center">
      {product.stock === 0 && (
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] z-10 flex items-center justify-center">
          <span className="font-semibold text-xl text-white">HẾT HÀNG</span>
        </div>
      )}
      <div className="discount absolute top-0 left-3 z-20 px-1 bg-red-500 text-white flex flex-col items-center">
        <span className="text-xl font-semibold">
          {product.discount}
          <span className="text-base font-normal ">%</span>
        </span>
        <span className="text-xs font-light">GIÁ</span>
        <span className="text-xs font-light">SỐC</span>
      </div>
      <Link
        to={`/${path.DETAIL.replace(":slug", product.slug)}`}
        onClick={() => (document.documentElement.scrollTop = 0)}
        className="flex flex-col items-center cursor-pointer relative"
      >
        <img
          src={product.imagesUrl[0]}
          alt=""
          onMouseOver={(e) => {
            e.target.src = product.imagesUrl[1];
            e.target.nextSibling.style.display = "block";
          }}
          onMouseOut={(e) => {
            e.target.src = product.imagesUrl[0];
            e.target.nextSibling.style.display = "none";
          }}
        />
        <div className="hidden absolute left-2 top-[215px] desktop:top-[250px]">
          <BsBagPlus
            size={24}
            onMouseOver={(e) => {
              if (e.target.parentNode.previousSibling)
                e.target.parentNode.previousSibling.src = product.imagesUrl[1];
              e.target.parentNode.style.display = "block";
            }}
          />
        </div>
        <span className="text-[#446084] hover:text-black text-sm text-center">
          {product.title}
        </span>
      </Link>
      <div className="flex flex-wrap justify-center gap-2">
        <span className="font-light line-through text-sm">
          {VND.format(product.price)}
        </span>
        <span className="font-semibold text-sm text-red-500">
          {VND.format(product.salePrice)}
        </span>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center relative">
      {product.stock === 0 && (
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] z-10 flex items-center justify-center">
          <span className="font-semibold text-xl text-white">HẾT HÀNG</span>
        </div>
      )}
      <Link
        to={`/${path.DETAIL.replace(":slug", product.slug)}`}
        onClick={() => (document.documentElement.scrollTop = 0)}
        className="flex flex-col items-center cursor-pointer relative"
      >
        <img
          src={product.imagesUrl[0]}
          alt=""
          onMouseOver={(e) => {
            e.target.src = product.imagesUrl[1];
            e.target.nextSibling.style.display = "block";
          }}
          onMouseOut={(e) => {
            e.target.src = product.imagesUrl[0];
            e.target.nextSibling.style.display = "none";
          }}
        />
        <div className="hidden absolute left-2 top-40 mobile:top-52">
          <BsBagPlus
            size={24}
            onMouseOver={(e) => {
              if (e.target.parentNode.previousSibling)
                e.target.parentNode.previousSibling.src = product.imagesUrl[1];
              e.target.parentNode.style.display = "block";
            }}
          />
        </div>
        <span className="text-[#446084] hover:text-black text-sm text-center">
          {product.title}
        </span>
      </Link>
      <span className="font-semibold text-sm">{VND.format(product.price)}</span>
    </div>
  );
};

export default ProductPreview;
