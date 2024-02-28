import { useContext, type FC } from "react";
import { StockContext } from "~/dataContext";

type XAxisProps = {
  maxPrice: number;
  y: number;
  hCoef: number;
  company: string;
};

const YAxis: FC<XAxisProps> = ({ y, maxPrice, hCoef, company }) => {
  const startAxisPrice = Math.round(maxPrice / 100) * 100;
  const delta = startAxisPrice - maxPrice;
  const stocks = useContext(StockContext);
  const currentPrice = stocks.find(
    (stock) => stock.id === company,
  )!.currentPrice;
  let interval = 10;
  if (hCoef < 3) {
    interval = 50;
  }
  return (
    <div className="absolute right-0 h-full">
      <hr
        className="absolute right-0 w-screen border-t-2 border-dashed border-blue-400/50"
        style={{ top: y + 100 + (maxPrice - currentPrice) * hCoef }}
      />
      {[...Array(100).keys()].map((i) => {
        return (
          <div
            className="absolute right-0 mr-2 flex flex-row text-xs"
            style={{
              top: y + 100 + (i - 20) * interval * hCoef - delta * hCoef - 8,
            }}
            key={`xaxis-${i}`}
          >
            {startAxisPrice - (i - 20) * interval}
            <div
              className="absolute right-[-8px] h-[1px] w-1 bg-black"
              style={{ bottom: "50%" }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default YAxis;
