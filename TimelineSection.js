import React from 'react';
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import TimelineImage from '../../../assets/Images/TimelineImage.png'

const timeline=[
    {
        logo:Logo1,
        heading:"Leadership",
        description:"fully committed to the success company",
    },
    {
        logo:Logo2,
        heading:"Responsibility",
        description:"fully committed to the success company",
    },
    {
        logo:Logo3,
        heading:"Flexibility",
        description:"fully committed to the success company",
    },
    {
        logo:Logo4,
        heading:"Solving Problems",
        description:"fully committed to the success company",
    },
]

function TimelineSection() {
  return (
    <div>

        <div className='flex gap-15 items-center'>

            <div className='w-[45%] flex flex-col gap-5'>
            {
                timeline.map((element,index)=>{
                    return(
                        <div className='flex gap-6' key={index}>

                            <div className='w-[50px] h-[100px] bg-pure-greys-5 flex flex-col items-center'>
                                <img src={element.logo}></img>
                                <div className='bg-richblack-200 mt-4 h-10 w-[1px] '></div>
                            </div>

                            <div>
                                <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                <p className='text-base'>{element.description}</p>
                            </div>

                        </div>
                    )
                })
            }

            
            </div>

            <div className='relative shadow-blue-200'>
                <img src={TimelineImage} className='shadow-white object-cover'></img>

                <div className='absolute bg-caribbeangreen-700 flex text-white uppercase py-4
                                 translate-x-[7%] translate-y-[-50%]'>
                    <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-5'>
                        <p className='font-bold text-3xl'>10</p>
                        <p className='text-richblack-300 '>Years of experience</p>
                    </div>

                    <div className='flex gap-5 items-center px-7'>
                        <p className='font-bold text-3xl'>250</p>
                        <p className='text-richblack-300 '>Type of courses</p>
                    </div>
                </div>

            </div>

        </div>

    </div>
  );
}

export default TimelineSection;