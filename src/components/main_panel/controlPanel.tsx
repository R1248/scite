import { useContext, type FC } from "react";
import { BuyButton, SellButton } from "./transactionButtons";
import { StockContext } from "~/dataContext";
import { FaPlay } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { TbArrowForwardUp } from "react-icons/tb";

type ControlPanelProps = {
  company: string;
};

const ControlPanel: FC<ControlPanelProps> = ({ company }) => {
  const stocks = useContext(StockContext);
  const currentStock = stocks.find((stock) => stock.id === company);

  return (
    <div className="z-10 flex min-h-[180px] w-full flex-row border-t border-solid border-black bg-white p-1">
      <div className="w-[440px]">
        <div className="flex flex-row">
          <div className="mb-1 h-28 w-28 rounded-md bg-gray-300" />
          <div className="pl-2">
            <div className="text-3xl">{currentStock!.name}</div>
            <div>{currentStock!.symbol}</div>
            <div className="mt-4 flex w-72 flex-row">
              <div className="text-3xl">
                ${Math.round(currentStock!.currentPrice * 100) / 100}
              </div>
              <div className="ml-auto mr-1 mt-auto text-xl">
                {Math.round(
                  ((currentStock!.currentPrice - currentStock!.previousPrice) /
                    currentStock!.previousPrice) *
                    10000,
                ) / 100}
                %
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <BuyButton company={company} />
          <SellButton company={company} />
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-center">
        <button className="mr-2 flex h-24 w-24 items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600">
          <MdSettings className="text-[64px] text-white" />
        </button>
        <button className="flex h-24 w-24 items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600">
          <FaPlay className="text-5xl text-white" />
        </button>
        <button className="ml-2 flex h-24 w-24 items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600">
          <TbArrowForwardUp className="text-6xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
