import { useContext } from "react";
import { StockContext, UserDataContext } from "~/dataContext";

const AccountValue = () => {
  const stocks = useContext(StockContext);
  const user = useContext(UserDataContext);

  let cashInStocks = user.cash;
  stocks.forEach((stock) => {
    cashInStocks += stock.currentPrice * stock.owned;
  });
  return (
    <button className="ml-auto w-40 text-left">
      <div className="mb-[-4px] text-xs">Account Data</div>
      <div className="text-xl">${Math.round(cashInStocks * 100) / 100}</div>
    </button>
  );
};

export default AccountValue;
