import { type FC } from "react";

type XAxisProps = {
  maxPrice: number;
  y: number;
};

const YAxis: FC<XAxisProps> = ({ y, maxPrice }) => {
  const startAxisPrice = Math.round(maxPrice / 100) * 100;
  console.log(maxPrice);
  const delta = startAxisPrice - maxPrice;
  return (
    <div className="absolute right-0 h-full">
      {[...Array(100).keys()].map((i) => {
        return (
          <div
            className="absolute right-0 mr-2 flex flex-row text-xs"
            style={{ top: y + 100 + (i - 10) * 50 - delta * 5 - 8 }}
            key={`xaxis-${i}`}
          >
            {startAxisPrice - (i - 10) * 10}
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
