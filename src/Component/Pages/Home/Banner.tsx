import { motion } from "framer-motion";
import play from "../../../assets/Play.svg";
import { Fade } from "react-awesome-reveal";
import task_hub_cover from "../../../assets/task_hub_cover.jpeg";
const heroSection = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};
const heroSectionImage = {
  initial: { y: 0, rotate: -90, scale: 5 },
  animate: {
    y: -20,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 1,
      y: {
        repeat: Infinity,
        duration: 2,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  },
};

const Banner = () => {
  return (
    <div className="pt-4 mx-auto bg-[#F5F6F7]  overflow-hidden">
      <motion.div
        variants={heroSection}
        initial="hidden"
        animate="visible"
        className=" pl-2 lg:pl-0"
      >
        <div className="lg:flex lg:gap-[128px] text-[#061C3D] items-center justify-between">
          <Fade direction="left">
            <h1 className="text-3xl lg:text-[64px] mb-4 lg:mb-0 font-extrabold uppercase  lg:leading-[70px]">
              Welcome to <span className="text-teal-500"> Task Hub </span>{" "}
              <p> Online Task management</p>
            </h1>
          </Fade>
        </div>
      </motion.div>
      <motion.div
        variants={heroSectionImage}
        initial="initial"
        animate="animate"
        className="relative"
      >
        <div className="mt-12 md:h-[600px] bg-red-400 md:relative">
          <img
            loading="lazy"
            src={task_hub_cover}
            className="object-cover md:absolute inset-0 w-full h-full"
            alt=""
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white size-16 md:size-24 rounded-full flex items-center justify-center  border-[8px] md:border-[16px] border-opacity-5">
            <img
              loading="lazy"
              src={play}
              alt=""
              className="size-5 md:size-7"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
