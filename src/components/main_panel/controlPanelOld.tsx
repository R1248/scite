import { type FC } from "react";
import { GoInfo } from "react-icons/go";
import { TbChartDonut4 } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { HiFastForward } from "react-icons/hi";
import { BuyButton, SellButton } from "./transactionButtons";

type ControlPanelProps = {
  setDisplayPortfolio: (displayPortfolio: boolean) => void;
  company: string;
};

const ControlPanel: FC<ControlPanelProps> = ({
  setDisplayPortfolio,
  company,
}) => {
  return (
    <div className="z-10 flex min-h-[180px] w-full flex-row border-t border-solid border-black bg-white px-[2px] pb-[3px] pt-[2px]">
      <div
        className="grid h-full w-full grid-cols-3 gap-[2px]"
        style={{ gridTemplateColumns: "160px auto 160px" }}
      >
        <button className="w-full bg-gray-200 hover:bg-gray-300">
          <p>Free funds</p>
          <p>data</p>
        </button>
        <div className="row-span-3 flex h-full flex-col">
          <div className="mx-auto mt-4 text-8xl">
            <button>
              <HiFastForward />
            </button>
          </div>
          <div className="mt-auto flex h-1/3 flex-row content-end">
            <BuyButton company={company} />
            <button className="mx-[2px] h-full w-14 bg-green-500 hover:bg-green-400">
              <IoSettingsOutline className="mx-auto text-4xl" />
            </button>
            <SellButton company={company} />
            <button className="mr-auto h-full w-14 bg-red-500 hover:bg-red-400">
              <IoSettingsOutline className="mx-auto text-4xl" />
            </button>
          </div>
        </div>
        <button className="row-span-1 flex flex-row items-center bg-gray-200 hover:bg-gray-300">
          <GoInfo className="ml-auto mr-2 text-2xl" />
          <p className="mr-auto">Company info</p>
        </button>
        <button className="w-full bg-gray-200 hover:bg-gray-300">
          <p>Shares owned</p>
          <p>data</p>
        </button>
        <button
          onClick={() => setDisplayPortfolio(true)}
          className="row-span-2 flex flex-row items-center bg-gray-200 hover:bg-gray-300"
        >
          <TbChartDonut4 className="ml-auto mr-2 text-3xl" />
          <p className="mr-auto text-xl">Portfolio</p>
        </button>
        <button className="w-full bg-gray-200 text-left hover:bg-gray-300">
          <p>Gain</p>
          <p className="w-full text-center">data</p>
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
