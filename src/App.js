import { useEffect } from "react";
import useHttp, { retrieveData } from "./hooks/use-http";

import { useDispatch } from "react-redux";
import { coinActions } from "./components/Context/coin.slice";

import Socket from "./websockets/socket";

import View from "./View";
import Wrapper from "./components/UI/Wrapper";
import Loading from "./components/UI/Loading";

export default function App() {
  const dispatch = useDispatch();

  const [getCoins, getCoinsLoading] = useHttp(retrieveData);

  const getCoinsHandler = async () => {
    const rawCoins = await getCoins();

    const coins = rawCoins.map((coin) => {
      return {
        id: coin["id"],
        rank: coin["rank"],
        abbr: coin["symbol"],
        name: coin["name"],
        price: coin["priceUsd"],
        change: coin["changePercent24Hr"],
      };
    });

    dispatch(coinActions.set(coins));
  };

  Socket.onmessage = (msg) => {
    dispatch(coinActions.update(JSON.parse(msg.data)));
  };

  useEffect(() => {
    getCoinsHandler();
  }, []);

  return (
    <Wrapper>
      {getCoinsLoading && <Loading />}
      <View/>
    </Wrapper>
  );
}
