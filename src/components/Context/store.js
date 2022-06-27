import { configureStore } from "@reduxjs/toolkit";

import coinSlice from "./coin.slice";

export default configureStore({
  reducer: coinSlice,
});
