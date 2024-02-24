import { type FC, useContext } from "react";
import { StockContext, UserDataContext } from "~/dataContext";
import { api } from "~/utils/api";

type TransactionButtonProps = {
  company: string;
};

export const BuyButton: FC<TransactionButtonProps> = ({ company }) => {
  const stocks = useContext(StockContext);
  const userData = useContext(UserDataContext);

  const { mutate: updateStock } = api.stock.transaction.useMutation();
  const { mutate: updateUser } = api.userData.transaction.useMutation();

  const currentStock = stocks.find((stock) => stock.id === company);

  const utils = api.useUtils();

  const onUpdate = () => {
    updateStock(
      {
        owned: currentStock!.owned + 1,
        buyPrice:
          (currentStock!.owned * currentStock!.buyPrice +
            currentStock!.currentPrice) /
          (currentStock!.owned + 1),
        stockId: currentStock!.id,
      },
      {
        onSuccess: () =>
          updateUser(
            {
              cash: userData.cash - currentStock!.currentPrice * 1.01,
            },
            {
              onSuccess: () => {
                void utils.stock.all.invalidate();
                void utils.userData.getUserData.invalidate();
              },
            },
          ),
      },
    );
  };

  return (
    <button
      className="mr-2 flex h-14 w-[200px] flex-row items-center rounded-md bg-blue-500 text-xl hover:bg-blue-600"
      onClick={onUpdate}
    >
      <p className=" w-full text-center font-semibold text-white">SELL</p>
    </button>
  );
};

export const SellButton: FC<TransactionButtonProps> = ({ company }) => {
  const stocks = useContext(StockContext);
  const userData = useContext(UserDataContext);

  const { mutate: updateStock } = api.stock.transaction.useMutation();
  const { mutate: updateUser } = api.userData.transaction.useMutation();

  const currentStock = stocks.find((stock) => stock.id === company);

  const utils = api.useUtils();

  const onUpdate = () => {
    updateStock(
      {
        owned: currentStock!.owned - 1,
        buyPrice: currentStock!.buyPrice,
        stockId: currentStock!.id,
      },
      {
        onSuccess: () =>
          updateUser(
            {
              cash: userData.cash + currentStock!.currentPrice,
            },
            {
              onSuccess: () => {
                void utils.stock.all.invalidate();
                void utils.userData.getUserData.invalidate();
              },
            },
          ),
      },
    );
  };

  return (
    <button
      className="flex h-14 w-[200px] flex-row items-center rounded-md bg-blue-500 text-xl hover:bg-blue-600"
      onClick={onUpdate}
    >
      <p className=" w-full text-center font-semibold text-white">BUY</p>
    </button>
  );
};
