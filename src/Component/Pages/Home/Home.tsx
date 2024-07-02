/* eslint-disable @typescript-eslint/no-unused-vars */
import useTitle from "../../../Hooks/useTitle";
import { useEffect } from "react";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

import TaskList from "./TaskList";
import Banner from "./Banner";

const Home = () => {
  useTitle("Home"),
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="mt-1 rounded-2xl overflow-hidden">
      <Banner></Banner>
      <SectionTitle
        subHeading="Boost Your Efficiency"
        heading="START YOUR TASK JOURNEY!"
      ></SectionTitle>

      <TaskList></TaskList>
    </div>
  );
};

export default Home;
