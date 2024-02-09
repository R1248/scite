import { useContext, type FC } from "react";
import { MdClose } from "react-icons/md";
import { StockContext } from "~/dataContext";

type PortfolioProps = {
  setDisplayPortfolio: (displayPortfolio: boolean) => void;
};

const Portfolio: FC<PortfolioProps> = ({ setDisplayPortfolio }) => {
  const stocks = useContext(StockContext);
  const ownedStocks = stocks.filter((stock) => stock.owned > 0);
  return (
    <div className="flex h-10 w-full">
      <button className="ml-auto" onClick={() => setDisplayPortfolio(false)}>
        <MdClose className="text-4xl" />
      </button>
    </div>
  );
};

export default Portfolio;
