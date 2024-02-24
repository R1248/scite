import { type FC, useState, useContext } from "react";
import StockItem from "./stockItem";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { StockContext } from "~/dataContext";

type StockSidebarProps = {
  setGraphData: (graphData: {
    name: string;
    startPrice: number;
    curentPrice: number;
  }) => void;
};

const StockSidebar: FC<StockSidebarProps> = ({ setGraphData }) => {
  const [openedTech, setOpenedTech] = useState(true);
  const [openedBanking, setOpenedBanking] = useState(true);
  const [openedAutomotive, setOpenedAutomotive] = useState(true);

  const stocks = useContext(StockContext);

  return (
    <div className="z-10 h-full w-64 min-w-[256px] border-r border-solid border-black bg-white">
      <CategoryHeading
        category="Technology"
        opened={openedTech}
        setOpened={setOpenedTech}
      />
      {openedTech &&
        stocks
          .filter((stock) => stock.category === "Technology")
          .map((stock) => (
            <StockItem
              id={stock.id}
              setGraphData={setGraphData}
              key={stock.symbol}
              name={stock.symbol}
              changePercent={
                ((stock.currentPrice - stock.previousPrice) /
                  stock.previousPrice) *
                100
              }
              price={stock.currentPrice}
              firstPrice={stock.firstPrice}
            />
          ))}
      <CategoryHeading
        category="Banking"
        opened={openedBanking}
        setOpened={setOpenedBanking}
      />
      {openedBanking &&
        stocks
          .filter((stock) => stock.category === "Banking")
          .map((stock) => (
            <StockItem
              id={stock.id}
              setGraphData={setGraphData}
              key={stock.symbol}
              name={stock.symbol}
              changePercent={
                ((stock.currentPrice - stock.previousPrice) /
                  stock.previousPrice) *
                100
              }
              price={stock.currentPrice}
              firstPrice={stock.firstPrice}
            />
          ))}
      <CategoryHeading
        category="Automotive"
        opened={openedAutomotive}
        setOpened={setOpenedAutomotive}
      />
      {openedAutomotive &&
        stocks
          .filter((stock) => stock.category === "Automotive")
          .map((stock) => (
            <StockItem
              id={stock.id}
              setGraphData={setGraphData}
              key={stock.symbol}
              name={stock.symbol}
              changePercent={
                ((stock.currentPrice - stock.previousPrice) /
                  stock.previousPrice) *
                100
              }
              price={stock.currentPrice}
              firstPrice={stock.firstPrice}
            />
          ))}
    </div>
  );
};

export default StockSidebar;

type CategoryHeadingProps = {
  category: string;
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

const CategoryHeading: FC<CategoryHeadingProps> = ({
  category,
  opened,
  setOpened,
}) => {
  return (
    <button
      className="flex w-full flex-row border-y border-solid border-gray-300 p-[2px] hover:bg-gray-100"
      onClick={() => setOpened(!opened)}
    >
      <div className="ml-1">{category} sector</div>
      <div className="ml-auto">
        {opened ? (
          <IoIosArrowUp className="mt-1 text-lg" />
        ) : (
          <IoIosArrowDown className="mt-1 text-lg" />
        )}
      </div>
    </button>
  );
};
