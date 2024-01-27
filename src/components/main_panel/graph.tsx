import { useState, type FC } from "react";
import XAxis from "./xAxis";
import YAxis from "./yAxis";

//in per thousands
const dummyPriceMoves: Array<number> = [
  11.991, -16.25, 24.567, -5.154, 0.797, -14.72, -14.241, 24.491, 19.167,
  -19.161, 10.853, -15.497, 9.321, 24.809, 2.463, 13.18, 3.927, 24.648, 22.068,
  17.592, 12.621, -8.815, -18.848, 10.864, 20.438, -17.659, 22.8, -19.585,
  6.057, 1.106, -15.151, -0.602, 19.218, -18.993, 12.403, 20.161, 24.718,
  -13.699, -1.298, 16.978, 3.127, 23.418, 1.081, -13.649, 20.329, 5.018, 23.833,
  -16.38, -4.361, -4.206, -13.598, -3.539, 14.845, 21.059, -3.988, -7.056,
  -3.363, -17.863, -5.33, 21.048, 3.306, -2.49, -3.705, 6.551, -10.993, 6.616,
  -1.856, -6.008, 2.509, 10.699, -13.315, -3.175, 22.379, 21.473, 1.974, 5.44,
  9.098, -11.732, 1.728, 13.305, -7.99, 24.003, 24.291, 1.161, -4.865, 4.282,
  3.449, 12.64, -15.527, 12.361, 3.816, -10.91, 7.883, -17.631, 0.133, -3.771,
  19.428, -14.997, -16.486, 1.776, 17.201, -19.062, 1.022, -10.301, 6.407,
  21.208, 3.757, -2.819, 2.663, 14.996, -18.161, -16.511, 2.285, -18.058, 9.568,
  23.774, 13.553, 1.931, -15.668, 16.057, 17.452, 24.783, 20.187, -8.737, -9.53,
  -15.993, 10.033, 23.281, 8.308, -15.5, -4.04, -9.557, 13.73, 13.092, -4.299,
  12.877, -3.295, -8.53, 14.912, -14.083, -4.891, -3.031, 6.012, 11.083, 21.035,
  9.277, 10.346, 13.822, 24.324, -14.734, 10.435, -19.818, 17.853, 11.743,
  -13.016, 13.157, 12.963, -8.277, -7.908, -14.722, 12.122, 15.445, 22.106,
  -5.322, 18.629, 20.992, 18.918, 13.648, -8.779, -8.784, 12.553, 21.147,
  20.582, -18.441, -11.806, -5.983, 21.216, -9.164, -3.199, 16.973, -18.48,
  15.386, 2.092, 23.717, 1.515, -18.855, -3.08, -7.145, -14.809, -12.397,
  18.451, 0.486, 20.271, 8.815, -8.974, 1.448, 12.146, -18.49, 23.628, 19.53,
  17.763, 2.331, -16.327, -3.125, 16.756, 8.008, -4.849, 18.645, -15.671,
  -15.843, 3.563,
];

const prefixProduct = (arr: Array<number>) => {
  const result: Array<number> = [];
  let product = 1;
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < arr.length; i++) {
    product *= (1000 + arr[i]!) / 1000;
    result.push(product);
  }
  return result;
};

const prefixedPriceMoves = prefixProduct(dummyPriceMoves);

const startPrice = 100;

const minPrice = Math.min(...prefixedPriceMoves) * startPrice;
const maxPrice = Math.max(...prefixedPriceMoves) * startPrice;

const Graph: FC = () => {
  let initX = 0;
  let initY = 0;
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [wCoef, setWCoef] = useState<number>(4);
  const today = new Date().getDate();
  const marginRight = (31 - today) * (wCoef + 2);
  return (
    <div
      className="relative z-10 h-full w-full min-w-full self-stretch"
      onMouseDown={(e) => {
        initX = e.clientX;
        initY = e.clientY;
        onmousemove = (e) => {
          if (x > -200 || e.clientX - initX > 0) {
            setX(x + e.clientX - initX);
          }
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
        <div className="flex h-full w-full flex-row">
          {prefixedPriceMoves.map((price, i) => (
            <Candle
              open={
                i === 0 ? startPrice : prefixedPriceMoves[i - 1]! * startPrice
              }
              close={price * startPrice}
              wCoef={wCoef}
              key={price + i}
            />
          ))}
        </div>
      </div>
      <YAxis y={y} maxPrice={maxPrice} />
      <XAxis wCoef={wCoef} x={x} />
    </div>
  );
};

type CandleProps = {
  open: number;
  close: number;
  wCoef: number;
};

const Candle: FC<CandleProps> = ({ open, close, wCoef }) => {
  const backgroundColor = open > close ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`${backgroundColor} mt-auto h-full`}
      style={{
        marginLeft: 1,
        marginRight: 1,
        width: wCoef,
        height: open > close ? (open - close) * 5 : (close - open) * 5,
        marginBottom:
          open > close ? (close - minPrice) * 5 : (open - minPrice) * 5,
      }}
    ></div>
  );
};

export default Graph;
