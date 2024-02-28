import { useContext, type FC, useState, useEffect } from "react";
import { BuyButton, SellButton } from "./transactionButtons";
import { StockContext } from "~/dataContext";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { TbArrowForwardUp } from "react-icons/tb";
import { api } from "~/utils/api";
import nvididaLogo from "../../../public/Nvidia.png";
import appleLogo from "../../../public/Apple.png";
import microsoftLogo from "../../../public/Microsoft.png";
import Image from "next/image";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";

type ControlPanelProps = {
  company: string;
};

const ControlPanel: FC<ControlPanelProps> = ({ company }) => {
  const stocks = useContext(StockContext);
  const currentStock = stocks.find((stock) => stock.id === company);

  const { mutate: newPriceMoveTimeframe } =
    api.stock.newPriceMoveTimeframe.useMutation();
  const { mutate: newStockTimeframe } =
    api.stock.newStockTimeframe.useMutation();
  const utils = api.useUtils();

  const onUpdate = () => {
    stocks.map((stock) => {
      const newPriceMove = Math.round((Math.random() * 10 - 5) * 1000) / 1000;
      newPriceMoveTimeframe(
        {
          stockId: stock.id,
          priceMove: newPriceMove,
        },
        {
          onSuccess: () => void utils.stock.allPriceMoves.invalidate(),
        },
      );
      newStockTimeframe(
        {
          stockId: stock.id,
          newCurrentPrice: stock.currentPrice * (1 + newPriceMove / 100),
          newPreviousPrice: stock.currentPrice,
        },
        {
          onSuccess: () => void utils.stock.all.invalidate(),
        },
      );
    });
  };

  const [timeFlowOn, setTimeFlowOn] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (timeFlowOn) {
      intervalId = setInterval(onUpdate, 500);
    } else {
      intervalId ? clearInterval(intervalId) : null;
    }

    return () => clearInterval(intervalId);
  });

  const disabler = () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 2000);
  };

  let logo: StaticImport | string = "";
  switch (currentStock!.name.toLowerCase()) {
    case "nvidia":
      logo = nvididaLogo;
      break;
    case "apple":
      logo = appleLogo;
      break;
    case "microsoft":
      logo = microsoftLogo;
      break;
  }

  return (
    <div className="z-10 flex min-h-[180px] w-full flex-row border-t border-solid border-black bg-white p-1">
      <div className="w-[440px]">
        <div className="flex flex-row">
          <div className="mb-1 flex h-28 w-28 items-center justify-center rounded-md bg-gray-300">
            <Image src={logo} alt={currentStock!.name} height={64} />
          </div>
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
        <button className="mr-3 flex h-24 w-24 items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600">
          <MdSettings className="text-[64px] text-white" />
        </button>
        <button
          className="flex h-24 w-24 items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600"
          onClick={() => setTimeFlowOn(!timeFlowOn)}
        >
          {!timeFlowOn ? (
            <FaPlay className="text-5xl text-white" />
          ) : (
            <FaPause className="text-5xl text-white" />
          )}
        </button>
        <button
          className="ml-3 flex h-24 w-24 items-center justify-center rounded-md bg-blue-500 transition duration-150 ease-in-out hover:bg-blue-600 disabled:bg-blue-700"
          onClick={() => {
            onUpdate();
            disabler();
          }}
          disabled={disabled}
        >
          <TbArrowForwardUp className="text-6xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
