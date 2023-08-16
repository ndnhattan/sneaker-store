import { useState, useEffect } from "react";
import { hotnews } from "../../utils/constants";
import { FaGreaterThan, FaLessThan } from "../../utils/icons";

const HotNews = () => {
  const [id, setId] = useState(0);
  const [animateType, setAnimateType] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setId((prev) => (prev === hotnews.length - 1 ? 0 : prev + 1));
      setAnimateType(1);
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className=" border-b flex h-[29px]">
      <div className="hidden tablet:block flex-1"></div>
      <div className="flex-2 flex justify-center tablet:justify-between items-center">
        <button
          onClick={() => {
            id === 0 ? setId(hotnews.length - 1) : setId(id - 1);
            setAnimateType(2);
          }}
          className="hidden tablet:block cursor-pointer w-5 h-5 rounded-full bg-gray-300 pl-1"
        >
          <FaLessThan size={12} color="white" />
        </button>
        <div
          key={id}
          className={`text-black text-xs sm:text-sm uppercase ${
            animateType === 1 ? "animate-slide-left" : "animate-slide-right"
          }`}
        >
          {hotnews[id].value}
        </div>
        <button
          onClick={() => {
            id === hotnews.length - 1 ? setId(0) : setId(id + 1);
            setAnimateType(1);
          }}
          className="hidden tablet:block cursor-pointer w-5 h-5 rounded-full bg-gray-300 pl-1"
        >
          <FaGreaterThan size={12} color="white" />
        </button>
      </div>
      <div className="hidden tablet:block flex-1"></div>
    </div>
  );
};

export default HotNews;
