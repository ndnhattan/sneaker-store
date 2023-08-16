/* eslint-disable react/prop-types */
import { useState } from "react";
import ImageSlider from "../custom/ImageSlider";

const ImagePreviewer = ({ data, discount }) => {
  const [imageId, setImageId] = useState(0);
  //console.log(data);

  return (
    <div className="relative">
      {discount > 0 && (
        <div className="discount absolute top-0 left-8 z-10 px-1 bg-red-500 text-white flex flex-col items-center">
          <span className="text-xl font-semibold">
            {discount}
            <span className="text-base font-normal ">%</span>
          </span>
          <span className="text-xs font-light">GIÁ</span>
          <span className="text-xs font-light">SỐC</span>
        </div>
      )}
      <div className="mb-4">
        <img
          src={data && data[imageId]}
          alt=""
          className="w-[90%] h-[90%] mx-auto"
        />
      </div>
      <ImageSlider {...{ setImageId, data, slidesToShow: 4 }} />
    </div>
  );
};

export default ImagePreviewer;
