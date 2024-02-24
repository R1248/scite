import { useContext } from "react";
import { StockContext } from "~/dataContext";
import { api } from "~/utils/api";

const AccountValue = () => {
  const stocks = useContext(StockContext);
  const {
    data: userData,
    isLoading,
    isError,
  } = api.userData.getUserData.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  let cashInStocks = userData?.cash ?? 0;
  stocks.forEach((stock) => {
    cashInStocks += stock.currentPrice * stock.owned;
  });
  return <div className="ml-auto">${Math.round(cashInStocks * 100) / 100}</div>;
};

export default AccountValue;
