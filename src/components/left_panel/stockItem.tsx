import { type FC } from "react";

type Stock = {
  name: string;
  price: number;
  changePercent: number;
  id: string;
  setGraphData: (graphData: { name: string; startPrice: number }) => void;
};

const StockItem: FC<Stock> = ({
  name,
  price,
  changePercent,
  setGraphData,
  id,
}) => {
  const color =
    changePercent > 0 ? "green" : changePercent < 0 ? "red" : "gray";
  return (
    <button
      key={name}
      className="flex w-full border-b border-solid border-gray-300 p-[2px] hover:bg-gray-200"
      onClick={() => setGraphData({ name: id, startPrice: price })}
    >
      <div className="h-6 w-6 rounded bg-gray-300" />
      <div className="mt-[2px] flex grow flex-row justify-between px-2 text-sm">
        <div>{name}</div>
        <div>{price}</div>
        <div className={`text-${color}-500`}>{changePercent}%</div>
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
