import React from 'react';
import Instructor from '../../../assets/Images/Instructor.png';
import HighlightText from './HighlightText';
import CustomButton from './CustomButton';
import { FaArrowRight } from "react-icons/fa";

function InstructorSection() {
  return (
    <div className='mt-16'>
        <div className='flex items-center gap-20'>

            <div className='w-[50%]'>
            <img src={Instructor} className='shadow-white'/>
            </div>

            <div className='w-[50%] flex flex-col gap-10'>
                <div className='text-4xl font-semibold w-[50%]'>
                    Become an
                    <HighlightText text={"Instructor"}/>
                </div>

                <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
                Get the skills you need for a job in demand with our online courses. Learn industry-relevant techniques, gain practical experience, and boost your career prospects.
                </p>

                <div className='w-fit'>
                    <CustomButton active={true} linkto={"/signup"}>
                        <div className='flex gap-2'>
                            Start learning today
                            <FaArrowRight />
                        </div>
                    </CustomButton>
                </div>



            </div>

        </div>

        
        
    </div>
  );
}

export default InstructorSection;