import Container from "./utils/container";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter,FaInstagram,FaLocationDot,FaClock,FaPhoneVolume } from "react-icons/fa6";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="bg-black mt-auto pt-10">
    <Container>
    <div>
    <div className="text-white text-xl md:text-2xl font-semibold text-center mb-10">
    Employees Magamement System
    </div>
    <div className="px-16 flex flex-wrap gap-8 justify-center md:justify-between lg:gap-0">
    <div>
    <div className="flex justify-center md:justify-start gap-3">
    <a target="_blank" rel="noopener noreferrer" href="https://facebook.com"
    className="p-3 rounded-md bg-gray-400 text-xl text-white hover:bg-facebook duration-300">
        <FaFacebookF/>
    </a>
    <a target="_blank" rel="noopener noreferrer" href="https://twitter.com"
    className="p-3 rounded-md bg-gray-400 text-xl text-white hover:bg-twitter duration-300">
        <FaXTwitter/>
    </a>
    <a target="_blank" rel="noopener noreferrer" href="https://instagram.com"
    className="p-3 rounded-md bg-gray-400 text-xl text-white hover:bg-instagram duration-300">
        <FaInstagram/>
    </a>
    </div>
    <div className="text-white md:text-[18px] w-[300px] mt-6">
    Don 't hesitate to contact us if you have any questions, or problems
    </div>
    </div>
    <div className="flex flex-col gap-6">
    <div className="flex gap-6 items-center">
    <span className="text-xl md:text-2xl text-green-400"><FaLocationDot/></span>
    <div className="flex flex-col gap-2">
    <span className="text-white">Algeria, Relizen, Oued El Djemaa</span>
    <span className="text-white">Room number 10</span>
    </div>
    </div>
    <div className="flex gap-6 items-center">
    <span className="text-xl md:text-2xl text-green-400"><FaClock/></span>
    <div className="flex flex-col gap-2">
    <span className="text-white">business hours</span>
    <span className="text-white">from 10:00 to 18:00</span>
    </div>
    </div>
    <div className="flex gap-6 items-center">
    <span className="text-xl md:text-2xl text-green-400"><FaPhoneVolume/></span>
    <div className="flex flex-col gap-2">
    <span className="text-white">+213 672102874</span>
    <span className="text-white">+213 775154413</span>
    </div>
    </div>
    </div>
    </div>
    </div>
    </Container>
    <div className="text-center text-white mt-10 py-6 border-top-1 border-t-[1px] border-solid border-t-gray-600">
    &copy; {year} <span className="font-semibold text-green-400 mx-2 text-xl">-Beloued-</span> All Right Reserved
    </div>
    </div>
  )
}

export default Footer