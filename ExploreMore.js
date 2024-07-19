import React from 'react';
import {HomePageExplore} from '../../../data/homepage-explore';
import { useState} from 'react';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard'


const tabsName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

function ExploreMore() {

    const [currentTab, setCurrentTab]= useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards=(element)=>{
        setCurrentTab(element);
        const result=HomePageExplore.filter((course)=>course.tag===element);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }


  return (
    <div className='w-11/12'> 

        <div className='text-4xl font-semibold text-center'>
            Unlock the
            <HighlightText text={"Power of Code"}/>
        </div>

        <p className='text-center text-richblack-300 text-lg mt-3'>
            Learn to build anything you can imagine.
        </p>

        <div className='w-fit items-center mx-auto flex bg-richblack-800 rounded-full lg:mb-[120px] border border-richblack-500 mt-5'>
        {
            tabsName.map((element,index)=>{
                return (
                    <div
                    className={`text-[16px] flex items-center gap-2 rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-4 py-4
                    ${currentTab===element?"bg-richblack-900 text-richblack-5 font-medium":"text-richblack-200"}`}
                    key={index}
                    onClick={()=>setMyCards(element)}>
                        {element}
                    </div>
                )
            })
        }
        </div>

        <div className='flex absolute gap-5 rounded-md justify-center items-center w-11/12 '>
          {
            courses.map((card,index)=>{
                return(
                    <CourseCard
                        key={index}
                        card={card}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                    />
                )
            })
     
          }
        </div>

    </div>
  );
}

export default ExploreMore;