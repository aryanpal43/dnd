import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const LandingText = () => {
  return (
    <div className="">
      <motion.h1
        className="font-serif font-semibold text-3xl md:text-6xl text-stone-100 leading-tight tracking-wide uppercase"
        style={{ wordSpacing: "0.25rem" }}
        // initial={{ opacity: 0, y: 20 }}
        // whileInView={{ opacity: 1, y: 0 }}
        // transition={{ duration: 1, ease: "easeOut" }}
      >
        Enjoy Online <br /> Shopping
      </motion.h1>
      <Button
        className="mt-4 p-4 md:p-6 text-lg md:text-xl  text-white border-white border-2"
        variant="ghost"
      >
        Shop Now
      </Button>
    </div>
  );
};

export default LandingText;
