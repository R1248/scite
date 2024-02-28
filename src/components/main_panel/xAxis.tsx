import { type FC } from "react";

type XAxisProps = {
  wCoef: number;
  x: number;
};

const XAxis: FC<XAxisProps> = ({ wCoef, x }) => {
  const thisMonth = new Date().getMonth() + 1;
  return (
    <div className="absolute bottom-0 w-full">
      {[...Array(200).keys()].map((i) => {
        return (
          <div
            className="absolute bottom-0 pb-1 text-xs"
            style={{ right: (i - 150) * (wCoef + 2) * 30 - x }}
            key={`xaxis-${i}`}
          >
            {((((thisMonth - i + 6) % 12) + 12) % 12) + 1}
            <div
              className="absolute bottom-0 h-1 w-[1px] bg-black"
              style={{ left: "50%" }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default XAxis;
