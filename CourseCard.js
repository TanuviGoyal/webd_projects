import React from "react";
// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({card, currentCard, setCurrentCard}) => {

  function clickHandler(){
    setCurrentCard(card.heading);

  }

  return (
  <div className={`gap-3 flex flex-col w-[21%] h-[200px] -translate-y-16  items-center px-3 py-3 shadow-richblack-600 shadow-md
  ${currentCard===card.heading?
  "bg-white text-richblack-800 shadow-yellow-25"
  :"bg-richblack-800 text-richblack-200 shadow-richblack-600"}`}
  onClick={clickHandler}>

      <div className="font-bold ">
        {card.heading}
      </div>

      <div className="text-[15px]">
        {card.description}
      </div>

      <div className="flex gap-14 text-blue-200 mb-1">

        <div className="flex items-baseline gap-2 ">
          <HiUsers/>
          {card.level}
        </div>

        <div className="flex items-baseline gap-2 ">
          <ImTree/>
          {card.lessionNumber}
        </div>

      </div>

  </div>

    
  );
};

export default CourseCard;