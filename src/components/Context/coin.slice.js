import { createSlice } from "@reduxjs/toolkit";

import {
  sortAscendingAlphabetical,
  sortAscendingNumeric,
  sortDescendingAlphabetical,
  sortDescendingNumeric,
} from "../../utils/sort";

const coinSlice = createSlice({
  name: "coins",
  initialState: {
    all: [],
    filtered: [],
  },
  reducers: {
    set(state, action) {
      state.all = action.payload;
      state.initial = action.payload;
    },
    search(state, action) {
      const search = action.payload;
      state.all = [...state.initial].filter((coin) => {
        if (search) {
          return coin.name.toLowerCase().includes(search.toLowerCase());
        } else {
          return true;
        }
      });
    },
    sort(state, action) {
        state.all.sort((first, second) => {
        if (action.payload.col === "name" || action.payload.col === "abbr") {
          if (action.payload.type === "ASCENDING") {
            return sortAscendingAlphabetical(
              first[action.payload.col],
              second[action.payload.col]
            );
          }
          return sortDescendingAlphabetical(
            first[action.payload.col],
            second[action.payload.col]
          );
        } else {
          if (action.payload.type === "ASCENDING") {
            return sortAscendingNumeric(first[action.payload.col], second[action.payload.col]);
          }
          return sortDescendingNumeric(first[action.payload.col], second[action.payload.col]);
        }
      });
    },
    update(state, action) {
      const updated = action.payload;
      for (const coin in updated) {
        const index = state.all.findIndex((row) => row.id === coin);
        if (index !== -1) {
          state.all[index].price = updated[coin];
        }
      }
    },
  },
});

export const coinActions = coinSlice.actions;
export default coinSlice.reducer;
