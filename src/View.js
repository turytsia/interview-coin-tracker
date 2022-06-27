import { useState } from "react";

import { useSelector, useDispatch } from "react-redux/es/exports";

import "./styles/app.css";
import "./styles/table.css";
import "./styles/responsive.css";

import { coinActions } from "./components/Context/coin.slice";

import TableHeaders from "./components/UI/table/TableHeaders";
import TableBody from "./components/UI/table/TableBody";

function View() {
  const coins = useSelector((state) => state.all);

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const coinsSearchHandler = () => {
    dispatch(coinActions.search(search));
  };

  const coinsSortHandler = (action) => {
    dispatch(coinActions.sort(action));
  };

  const onSearchKeyHandler = (e) => {
    if (e.keyCode === 13) {
      coinsSearchHandler();
    }
  };

  return (
    <>
      <header className="app__header-mobile">
        CoinCap API <i className="fa-solid fa-coins"></i>
      </header>
      <section className="app__page">
        <div className="app__search">
          <input
            value={search}
            onKeyDown={onSearchKeyHandler}
            onChange={onSearchChange}
            placeholder="Bitcoin..."
            type="text"
          />
          <button onClick={coinsSearchHandler}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="app__table-wrapper">
          <div className="app__header">
            CoinCap API <i className="fa-solid fa-coins"></i>
          </div>
          <table className="app__table">
            <TableHeaders onSort={coinsSortHandler} />
            <TableBody coins={coins} />
          </table>
        </div>
      </section>
    </>
  );
}

export default View;
