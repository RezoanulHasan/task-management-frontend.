import { FC } from "react";

interface SectionTitleProps {
  heading: string;
  subHeading: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ heading, subHeading }) => {
  return (
    <div className="mx-auto text-center md:w-4/12 my-8">
      <p className="text-teal-600 font-bold text-3xl mb-2">{subHeading}</p>
      <h3 className="text-xl uppercase border-y-4 py-4">{heading}</h3>
    </div>
  );
};

export default SectionTitle;
