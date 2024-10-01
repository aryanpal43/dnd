const Footer = () => {
  return (
    <div className="h-[65vh] bg-slate-900 p-8 overflow-hidden">
      <div className="flex flex-col sm:grid sm:grid-cols-3 md:grid-cols-4  ">
        <div className="mt-40 hidden md:block">
          {/* <img
            src="./src/assets/images/logo/logo.png"
            className="h-12 rounded-md "
            alt=""
          /> */}
        </div>
        <div className="flex flex-col gap-2 sm:gap-4 mt-10 sm:mt-20">
          <h1 className="text-slate-100 text-xl md:text-4xl font-light">
            Links
          </h1>
          <a className="text-gray-400 hover:underline text-xl" href="">
            Home
          </a>
          <a className="text-gray-400 text-xl hover:underline" href="">
            About us
          </a>
          <a className="text-gray-400 text-xl hover:underline" href="">
            Blogs
          </a>
        </div>
        <div className="flex flex-col gap-2 sm:gap-4 mt-10 sm:mt-20">
          <h1 className="text-slate-100 text-xl md:text-4xl font-light ">
            Product
          </h1>
          <a className="text-gray-400 text-xl hover:underline" href="">
            Schedule a call
          </a>
        </div>
        <div className="flex flex-col gap-2 sm:gap-4 mt-10 sm:mt-20 overflow-hidden">
          <h1 className="text-slate-100 text-xl md:text-4xl font-light">
            Contact Us!
          </h1>
          <a
            className="text-gray-400  hover:underline flex flex-row items-center gap-1 text-xl  break-words"
            href=""
          >
            <span className="break-all">aryan2002@garvishmedia.com</span>
          </a>
        </div>
      </div>
      <div class="mx-auto w-full max-w-screen-lg h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent mt-10"></div>
      <p className="  bottom-20 text-center mt-6 text-gray-50 text-xl">
        Copyright 2024 Gravish MarketingTM All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
