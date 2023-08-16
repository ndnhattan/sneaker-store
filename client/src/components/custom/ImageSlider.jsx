/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "../../scss/imageSlider.scss";

const ImageSlider = ({ data, setImageId, slidesToShow }) => {
  const settings = {
    dots: false,
    infinite: data?.length > 3,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: slidesToShow,
  };

  return (
    <div className="image-slider">
      <Slider {...settings}>
        {data?.map((item, index) => (
          <div
            className={"hover:border cursor-pointer"}
            key={index}
            onClick={() => setImageId(index)}
          >
            <img src={item} alt="" className="w-[90%] h-[90%] mx-auto" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
