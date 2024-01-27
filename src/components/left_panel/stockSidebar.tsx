import { type FC, useState } from "react";
import StockItem from "./stockItem";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { api } from "~/utils/api";

type StockSidebarProps = {
  setGraphData: (graphData: string) => void;
};

const StockSidebar: FC<StockSidebarProps> = ({ setGraphData }) => {
  const [openedTech, setOpenedTech] = useState(true);
  const [openedBanking, setOpenedBanking] = useState(true);
  const [openedAutomotive, setOpenedAutomotive] = useState(true);

  const { data: stocks, isLoading, isError } = api.stock.all.useQuery();

  if (isLoading) {
    return (
      <div className="z-10 h-full w-64 min-w-[256px] border-r border-solid border-black bg-white">
        Loading...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="z-10 h-full w-64 min-w-[256px] border-r border-solid border-black bg-white">
        Error
      </div>
    );
  }

  return (
    <div className="z-10 h-full w-64 min-w-[256px] border-r border-solid border-black bg-white">
      {stocks.length !== 0 ? (
        <>
          <>
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
                    setGraphData={setGraphData}
                    key={stock.symbol}
                    name={stock.symbol}
                    changePercent={2}
                    category={stock.category}
                    price={stock.firstPrice}
                  />
                ))}
          </>
          <>
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
                    setGraphData={setGraphData}
                    key={stock.symbol}
                    name={stock.symbol}
                    changePercent={2}
                    category={stock.category}
                    price={stock.firstPrice}
                  />
                ))}
          </>
          <>
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
                    setGraphData={setGraphData}
                    key={stock.symbol}
                    name={stock.symbol}
                    changePercent={2}
                    category={stock.category}
                    price={stock.firstPrice}
                  />
                ))}
          </>
        </>
      ) : (
        /*<button
          className="w-full border-b border-solid border-gray-300 p-[2px] text-center hover:bg-gray-200"
          onClick={createStocks}
        >
          Create Stocks
        </button>*/
        <></>
      )}
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
      className="flex w-full flex-row border-y border-solid border-gray-300 p-[2px] hover:bg-gray-200"
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
