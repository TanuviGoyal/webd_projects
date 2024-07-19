import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import {Link} from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import CustomButton from '../components/core/HomePage/CustomButton';
import banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/core/HomePage/Footer';

const Home=()=> {
  return (
    <div>
    {/*SECTION 1*/}
    <div className='max-w-maxContent relative mx-auto flex flex-col w-11/12 items-center text-white justify-between'>

    <Link to={"/signup"}>
        <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-full'>
            <div className='flex items-center px-10 py-[5px] transition-all duration-200 rounded-full group-hover:bg-richblack-900'>
                <p>Become and Instructor</p>
                <FaArrowRight />
            </div>
        </div>
    </Link>

    <div className='text-center text-4xl font-semibold mt-7'>
        Empower your future with 
        <HighlightText text={"Coding Skills"}/>
    </div>

    <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4'>
    At StudyNotion, we are dedicated to transforming education through innovative technology and engaging content. Our mission is to provide high-quality, accessible, and personalized learning experiences for students, educators, and lifelong learners worldwide.
    </div>

    <div className='flex gap-7 mt-8'>
    <CustomButton active={true} linkto={"/signup"}>
        Learn More
    </CustomButton>

    <CustomButton active={false} linkto={"/login"}>
        Book a Demo
    </CustomButton>
    </div>

    <div className='shadow shadow-blue-300 mx-3 my-12 w-[700px]'>
        <video muted loop autoPlay>
        <source src={banner}  type='video/mp4'></source>
        </video>
    </div>

    <div>
        <CodeBlocks 
            position={"lg:flex-row"}
            heading={
                <div>
                    Unlock your
                    <HighlightText text={"Coding Potential"}/>
                    with our Online Courses
                </div>
            }
            subheading={
                "Unlock your coding potential with our online courses! Gain hands-on experience, master the latest programming languages, and build real-world projects from the comfort of your home."
            }
            btn1={
                {
                    btnText:"try it yourself",
                    linkto:"/signup",
                    active:true,
                }
            }
            btn2={
                {
                    btnText:"learn more",
                    linkto:"/login",
                    active:false,
                }
            }
            codeblock={
                "<!DOCTYPE html>\n<html><head><title>\nCoding Courses\n</title></head><body>\n<h1>\nUnlock Your Coding Potential\n</h1>\n<p>\nMaster programming and build real-world projects.\n</p>\n</body></html>"
            }
            codeColor={"text-yellow-25"}
        />
    </div>

    <div>
        <CodeBlocks 
            position={"lg:flex-row-reverse"}
            heading={
                <div>
                    Unlock your
                    <HighlightText text={"Coding Potential"}/>
                    with our Online Courses
                </div>
            }
            subheading={
                "Unlock your coding potential with our online courses! Gain hands-on experience, master the latest programming languages, and build real-world projects from the comfort of your home."
            }
            btn1={
                {
                    btnText:"try it yourself",
                    linkto:"/signup",
                    active:true,
                }
            }
            btn2={
                {
                    btnText:"learn more",
                    linkto:"/login",
                    active:false,
                }
            }
            codeblock={
                "<!DOCTYPE html>\n<html><head><title>\nCoding Courses\n</title></head><body>\n<h1>\nUnlock Your Coding Potential\n</h1>\n<p>\nMaster programming and build real-world projects.\n</p>\n</body></html>"
            }
            codeColor={"text-yellow-25"}
        />
     </div>
        <ExploreMore/>
    </div>

    {/*SECTION 2*/}
    <div className='bg-pure-greys-5 text-richblack-700'>
        <div className='homepage_bg h-[310px]'>

           <div className=' justify-center flex-col w-11/12 max-w-maxContent flex items-center gap-5 mx-auto'>
           <div className='h-[150px]'></div>

           <div className='flex gap-7 text-white'>
           <CustomButton active={true} linkto={"/signup"}>
               <div className='flex items-center gap-3'>
                Explore Full Catalog
                <FaArrowRight />
               </div>
           </CustomButton>

           <CustomButton active={false} linkto={"/login"}>
               <div>
                Explore Full Catalog
               </div>
           </CustomButton>

           </div>

           </div>

        </div>

        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-7'>

            <div className='flex gap-5 mb-10 mt-10'>

                <div className='text-4xl font-semibold w-[45%]'>
                    Get the Skills you need for a 
                    <HighlightText text={"Job that is in demand"} />
                </div>

                <div className='flex flex-col gap-10 w-[40%] items-start'>
                <div className='text-[16px]'>
                Get the skills you need for a job in demand with our online courses. Learn industry-relevant techniques, gain practical experience, and boost your career prospects. Start learning today and secure your future!
                </div>
                <CustomButton active={true} linkto={"/signup"}>
                    <div>
                        Learn More
                    </div>
                </CustomButton>
                </div>

            </div>
            <TimelineSection/>
            <LearningLanguageSection/>
            
        </div>


    </div>

    {/*ECTION 3*/}
    <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>
        <InstructorSection/>

        <h2 className='text-center text-4xl mt-10 font-semibold'>Reviews from other learners</h2>
        {/*REVIEW SLIDER */}
    
    </div>

    {/*FOOTER */}
    <div>
        <Footer/>
    </div>

    </div>
  );
}

export default Home;


