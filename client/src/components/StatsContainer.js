import { useAppContext } from "../context/appContext";
import StatsItem from "./StatsItem";
import { useElementSize } from "../utils/Helpers";

import { BsPeopleFill } from "react-icons/bs";
import { FaBoxes } from "react-icons/fa";
import {
  GiBoxUnpacking,
  GiTakeMyMoney,
  GiReceiveMoney,
  GiReturnArrow,
} from "react-icons/gi";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

// import AverageIcon from "../assets/images/average-order-icon.svg";
// import TotalOrderIcon from "../assets/images/total-order-icon.svg";
// import ReturnCustomerIcon from "../assets/images/return-customer-icon.svg";
// import MinOrderIcon from "../assets/images/min-order-icon.svg";
// import MaxOrderIcon from "../assets/images/max-order-icon.svg";
// import RefundIcon from "../assets/images/refund-icon.svg";

import Wrapper from "../assets/wrappers/StatsContainer";
import { Swiper, SwiperSlide } from "swiper/react";

import { useSwiperRef, roundToInt } from "../utils/Helpers.js";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Keyboard, Mousewheel } from "swiper";

const StatsContainer = () => {
  const { dashboardStats_Sales } = useAppContext();

  //https://www.manypixels.co/gallery
  let dashboardStats = [
    {
      id: "avgOrder",
      amount: 0,
      icon: <GiBoxUnpacking />,
      color: "#e9b949",
      bgc: "#fcefc7",
      title: "Average Value Per Order",
    },
    {
      id: "totalOrders",
      amount: 0,
      icon: <FaBoxes />,
      color: "#e9b949",
      bgc: "#fcefc7",
      title: "Total Orders",
    },
    {
      id: "minOrder",
      amount: 0,
      icon: <GiReceiveMoney />,
      color: "#e9b949",
      bgc: "#fcefc7",
      title: "Lowest Value Per Order",
    },
    {
      id: "maxOrder",
      amount: 0,
      icon: <GiTakeMyMoney />,
      color: "#e9b949",
      bgc: "#fcefc7",
      title: "Highest Value Per Order",
    },
    {
      id: "none",
      amount: 10,
      icon: <GiReturnArrow />,
      color: "#e9b949",
      bgc: "#fcefc7",
      title: "Total Refunds",
    },
  ];
  
    if (dashboardStats_Sales){
      for (const key in dashboardStats_Sales) {
        const index = dashboardStats.findIndex((i) => i.title === key);
        if(index > -1){
          dashboardStats[index].amount = dashboardStats_Sales[key]
        };
      }
    }
    //https://stackoverflow.com/questions/4689856/how-to-change-value-of-object-which-is-inside-an-array-using-javascript-or-jquer
  

  //custom swiper navigation buttons
  const [nextEl, nextElRef] = useSwiperRef();
  const [prevEl, prevElRef] = useSwiperRef();

  //https://swiperjs.com/swiper-api#param-initialSlide
  return (
    <Wrapper>
      <Swiper
        slidesPerView={'auto'}
        loop={true}
        spaceBetween={10}
        navigation={{
          prevEl,
          nextEl,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation, Mousewheel, Keyboard]}
        speed={1000}
        mousewheel
        keyboard
      >
        {dashboardStats.map((item, index) => {
          return (
            <SwiperSlide style={{ height: 'auto', width: '49%' }} key={index}>
              {(isActive) => (
                <StatsItem
                  {...item}
                  isActive={isActive}
                />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button ref={prevElRef} className="prev-button">
        <IoIosArrowDropleftCircle />
      </button>
      <button ref={nextElRef} className="next-button">
        <IoIosArrowDroprightCircle />
      </button>
    </Wrapper>
    //https://github.com/nolimits4web/swiper/issues/3855
  );
};

export default StatsContainer;
