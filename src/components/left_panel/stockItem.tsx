import { type FC } from "react";

type Stock = {
  name: string;
  price: number;
  changePercent: number;
  id: string;
  setGraphData: (graphData: {
    name: string;
    startPrice: number;
    curentPrice: number;
  }) => void;
  firstPrice: number;
};

const StockItem: FC<Stock> = ({
  name,
  price,
  firstPrice,
  changePercent,
  setGraphData,
  id,
}) => {
  let color = "gray";

  if (changePercent > 0) {
    color = "green";
  }
  if (changePercent < 0) {
    color = "red";
  }
  return (
    <button
      key={name}
      className="flex w-full border-b border-solid border-gray-300 p-[2px] hover:bg-gray-100"
      onClick={() =>
        setGraphData({ name: id, startPrice: firstPrice, curentPrice: price })
      }
    >
      <div className="h-6 w-6 rounded bg-gray-300" />
      <div className="ml-2 mt-[2px] flex w-16 grow flex-row justify-between text-sm">
        <div>{name}</div>
        <div>{Math.round(price * 100) / 100}</div>
        <div className={`text-${color}-500`}>
          {Math.round(changePercent * 100) / 100}%
        </div>
      </div>
    </button>
  );
};

export default StockItem;

export const TailwindBuster = () => {
  return (
    <>
      <i className="text-green-500" />
      <i className="text-red-500" />
      <i className="text-gray-500" />
    </>
  );
};
