import { useState, type FC } from "react";
import XAxis from "./xAxis";
import YAxis from "./yAxis";
import { api } from "~/utils/api";
import { type PriceMove } from "@prisma/client";

type GraphProps = {
  company: string;
  startPrice: number;
};

const Graph: FC<GraphProps> = ({ company, startPrice }) => {
  let initX = 0;
  let initY = 0;
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [wCoef, setWCoef] = useState<number>(4);
  const today = new Date().getDate();
  const marginRight = (31 - today) * (wCoef + 2);

  const {
    data: priceMoves,
    isLoading,
    isError,
  } = api.stock.allPriceMoves.useQuery({
    stockId: company,
  });

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

  const prefixProduct = (arr: Array<PriceMove>) => {
    const result: Array<number> = [];
    let product = 1;
    for (const element of arr) {
      product *= (100 + element.price) / 100;
      result.push(product);
    }
    return result;
  };

  const prefixedPriceMoves = prefixProduct(priceMoves);

  const minPrice = Math.min(...prefixedPriceMoves) * startPrice;
  const maxPrice = Math.max(...prefixedPriceMoves) * startPrice;
  const hCoef = 500 / maxPrice;

  return (
    <div
      className="relative z-10 h-full w-full min-w-full self-stretch"
      onMouseDown={(e) => {
        initX = e.clientX;
        initY = e.clientY;
        onmousemove = (e) => {
          setX(x + e.clientX - initX);
          setY(y + e.clientY - initY);
        };
        onmouseup = () => {
          onmousemove = null;
          onmouseup = null;
        };
      }}
      onMouseLeave={() => {
        onmousemove = null;
        onmouseup = null;
      }}
      onWheel={(e) => {
        if (wCoef > 3 || e.deltaY < 0) {
          setWCoef(wCoef - e.deltaY / 200);
        }
      }}
    >
      <div
        className="h-max w-max min-w-full overflow-hidden"
        style={{
          position: "absolute",
          top: y + 100,
          right: -x + marginRight,
        }}
      >
        <div className="flex h-full w-full flex-row justify-end">
          {prefixedPriceMoves.map((price, i) => (
            <Candle
              open={
                i === 0 ? startPrice : prefixedPriceMoves[i - 1]! * startPrice
              }
              minPrice={minPrice}
              close={price * startPrice}
              wCoef={wCoef}
              key={price + i}
              hCoef={hCoef}
            />
          ))}
        </div>
      </div>
      <YAxis y={y} maxPrice={maxPrice} hCoef={hCoef} company={company} />
      <XAxis wCoef={wCoef} x={x} />
    </div>
  );
};

type CandleProps = {
  open: number;
  close: number;
  wCoef: number;
  minPrice: number;
  hCoef: number;
};

const Candle: FC<CandleProps> = ({ open, close, wCoef, minPrice, hCoef }) => {
  const backgroundColor = open > close ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`${backgroundColor} mt-auto h-full`}
      style={{
        marginLeft: 1,
        marginRight: 1,
        width: wCoef,
        height: open > close ? (open - close) * hCoef : (close - open) * hCoef,
        marginBottom:
          open > close ? (close - minPrice) * hCoef : (open - minPrice) * hCoef,
      }}
    ></div>
  );
};

export default Graph;
