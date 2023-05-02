import StatsItem from "./StatsItem";
import { useAppContext } from "../context/appContext";
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

import Wrapper from "../assets/wrappers/StatsContainer";
import { Swiper, SwiperSlide } from "swiper/react";

import { useSwiperRef } from "../utils/Helpers.js";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Keyboard, Mousewheel } from "swiper";

const StatsContainer = () => {
  const { dashboardStats_Sales } = useAppContext();

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
      amount: 0,
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
   
  const [nextEl, nextElRef] = useSwiperRef();
  const [prevEl, prevElRef] = useSwiperRef();

  return (
    <Wrapper className="statscontainer-joyride">
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
            <SwiperSlide style={{ height: 'auto', width: '24%', minWidth: '165px' }} key={index}>
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
  );
};

export default StatsContainer;
