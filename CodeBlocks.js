import React from 'react';
import HighlightText from './HighlightText';
import CustomButton from './CustomButton';
import { FaArrowRight } from "react-icons/fa";
import {TypeAnimation} from 'react-type-animation'

function CodeBlocks({position,heading,subheading,btn1,btn2,codeblock,backgroundGradient,codeColor}) {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>

    <div className='w-[50%] flex flex-col gap-8'>
        {heading}
        <div className='text-richblack-300 font-bold'>
            {subheading}
        </div>
        <div className='flex gap-7 mt-7'>
        <CustomButton active={btn1.active} linkto={btn1.linkto}>
            <div className='flex gap-2 items-center'>
                {btn1.btnText}
                <FaArrowRight />
            </div>
        </CustomButton>

        <CustomButton active={btn2.active} linkto={btn2.linkto}>
            {btn2.btnText}
        </CustomButton>

        </div>
    </div>

    <div className='flex h-fit flex-row text-[15px] w-[100%] py-4 lg:w-[500px]'>
        <div className='text-center flex flex-col w-[10%] text-richblack-400 font font-inter'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>
        <div className={`w-[90%] flex flex-col gap-2 font-mono font-bold ${codeColor} pr-2`}>
            <TypeAnimation
                sequence={[codeblock,5000,""]}
                repeat={Infinity}
                cursor={true}
                style={
                    {
                        whiteSpace:"pre-line",
                        display:"block",
                    }
                }
                omitDeletionAnimation={true}
            />

        </div>

        </div>
    


    </div>
  );
}

export default CodeBlocks;