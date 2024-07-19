import React from 'react';
import HighlightText from './HighlightText';
import Know_your_progress from '../../../assets/Images/Know_your_progress.png';
import Compare_with_others from '../../../assets/Images/Compare_with_others.png';
import Plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png';
import CustomButton from './CustomButton';

function LearningLanguageSection() {
  return (
    <div className='mt-[130px]'>
        <div className='flex flex-col gap-5 items-center'>

            <div className='text-4xl font-semibold text-center'>
                Your swiss knife for 
                <HighlightText text={"Learning any language"}/>
            </div>

            <div className='text-richblack-600 mx-auto text-center text-base w-[70%]'>
            Get the skills you need for a job in demand with our online courses. Learn industry-relevant techniques, gain practical experience, and boost your career prospects.
            </div>

            <div className='flex items-center justify-center mt-5'>
            <img
                src={Know_your_progress}
                className='object-contain -mr-32'
            />
            <img
                src={Compare_with_others}
                className='object-contain'
            />
            <img
                src={Plan_your_lessons}
                className='object-contain -ml-36'
            />
            </div>

            <div className='w-fit mb-10'>
                <CustomButton active={true} linkto={"/signup"}>
                <div>
                    Learn More
                </div>
                </CustomButton>
            </div>

        </div>
    </div>
  );
}

export default LearningLanguageSection;