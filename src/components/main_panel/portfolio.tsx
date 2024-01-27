import { type FC } from "react";
import { MdClose } from "react-icons/md";

type PortfolioProps = {
  setDisplayPortfolio: (displayPortfolio: boolean) => void;
};

const Portfolio: FC<PortfolioProps> = ({ setDisplayPortfolio }) => {
  return (
    <div className="flex h-10 w-full">
      <button className="ml-auto" onClick={() => setDisplayPortfolio(false)}>
        <MdClose className="text-4xl" />
      </button>
    </div>
  );
};

export default Portfolio;
