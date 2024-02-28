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
    <>
      <div className="flex h-10 w-full">
        <h1 className="ml-2 mt-1 text-2xl">Portfolio</h1>
        <button className="ml-auto" onClick={() => setDisplayPortfolio(false)}>
          <MdClose className="text-4xl" />
        </button>
      </div>
      {ownedStocks.map((stock) => (
        <div key={stock.symbol}>
          <div className="ml-2 flex w-full p-[2px] text-lg hover:bg-gray-100">
            <div className="h-8 w-8 rounded bg-gray-300" />
            <p className="ml-2 mt-[2px]">{stock.symbol}</p>
            <p className="ml-auto mr-4 mt-[2px] w-20">
              {stock.owned}
              &nbsp;
              {stock.owned == 1 ? "share" : "shares"}
            </p>
            <p className="ml-2 mr-2 mt-[2px] w-24">
              {Math.round(stock.owned * stock.currentPrice * 100) / 100} $
            </p>
            <p className="ml-2 mr-3 mt-[2px] w-16 text-right">
              {Math.round(
                ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) *
                  10000,
              ) / 100}
              %
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Portfolio;
