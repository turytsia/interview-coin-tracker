import { createContext, useState, useEffect } from "react";
import useHttp, { retrieveData } from "../../hooks/use-http";

import Socket from "../../websockets/socket";

import {
  sortAscendingAlphabetical,
  sortAscendingNumeric,
  sortDescendingAlphabetical,
  sortDescendingNumeric,
} from "../../utils/sort";

export const CoinsContext = createContext({
  coins: [],
  loading: false,
  classOnChange: "",
  onSearchCoins: () => {},
  onSortCoins: () => {},
});

export default function CoinsProvider(props) {
  const [coins, setCoins] = useState([]);

  const [getData, loading] = useHttp(retrieveData);

  const getDataHandler = async (search) => {
    const response = await getData();
    setCoins(
      response
        .map((coin) => {
          return {
            id: coin["id"],
            rank: coin["rank"],
            abbr: coin["symbol"],
            name: coin["name"],
            price: coin["priceUsd"],
            change: coin["changePercent24Hr"],
          };
        })
        .filter((coin) => {
          if (search) {
            return coin.name.toLowerCase().includes(search.toLowerCase());
          } else {
            return true;
          }
        })
    );
  };

  Socket.onmessage = (msg) => {
    const updated = JSON.parse(msg.data);
    for (const coin in updated) {
      setCoins((prevRows) => {
        const index = prevRows.findIndex((row) => row.id === coin);
        if (index !== -1) {
          const newRows = [...prevRows];
          newRows[index].price = updated[coin];
          return newRows;
        }
        return prevRows;
      });
    }
  };

  const onSearchCoins = (search) => {
    getDataHandler(search);
  };

  const onSortCoins = (action) => {
    const sorted = [...coins].sort((first, second) => {
      if (action.col === "name" || action.col === "abbr") {
        if (action.type === "ASCENDING") {
          return sortAscendingAlphabetical(
            first[action.col],
            second[action.col]
          );
        }
        return sortDescendingAlphabetical(
          first[action.col],
          second[action.col]
        );
      } else {
        if (action.type === "ASCENDING") {
          return sortAscendingNumeric(first[action.col], second[action.col]);
        }
        return sortDescendingNumeric(first[action.col], second[action.col]);
      }
    });

    setCoins(sorted);
  };

  useEffect(() => {
    getDataHandler();
  }, []);

  return (
    <CoinsContext.Provider
      value={{
        coins,
        loading,
        onSearchCoins,
        onSortCoins,
      }}
    >
      {props.children}
    </CoinsContext.Provider>
  );
}
