/* eslint-disable @typescript-eslint/no-unused-vars */
import useTitle from "../../../Hooks/useTitle";
import { useEffect } from "react";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import Heading from "../../Shared/Heading/Heading";
import Show from "./Show";
const Home = () => {
  useTitle("Home"),
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div>
      <h1 className="text-4xl">home</h1>
      <SectionTitle
        subHeading="Explorer"
        heading="Featured Item"
      ></SectionTitle>

      <Heading title="Explorer" subtitle="Featured Item"></Heading>

      <Show></Show>
    </div>
  );
};

export default Home;
