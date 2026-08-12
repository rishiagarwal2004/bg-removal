//creation  of header section
import React from "react";
import { assets } from "../assets/assets";
import { TypeAnimation } from "react-type-animation";

const Header = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 px-6 md:px-12 lg:px-24 xl:px-36 py-10">

      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col gap-8">
        <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight">
          Remove the <br className="hidden md:block" />

          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            <TypeAnimation
              sequence={["background", 2000]}
              speed={50}
              repeat={Infinity}
              cursor={false}
            />
          </span>

          {" "}from <br className="hidden md:block" />
          image for free
        </h1>

        <div>
          <input type="file" id="upload1" hidden />

          <label
            htmlFor="upload1"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white hover:scale-105 transition-all duration-300"
          >
            <img src={assets.upload_btn_icon} width={20} alt="" />
            <p className="text-sm">Upload your image</p>
          </label>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={assets.header_img}
          alt="Header"
          className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
        />
      </div>

    </div>
  );
};

export default Header;