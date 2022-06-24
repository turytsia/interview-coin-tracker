import { useContext, useState } from "react";
import { CoinsContext } from "./components/Context/CoinsProvider";

import "./styles/app.css";
import "./styles/table.css";
import "./styles/responsive.css";


import Wrapper from "./components/UI/Wrapper";
import Loading from "./components/UI/Loading";

import TableHeaders from "./components/UI/table/TableHeaders";
import TableBody from "./components/UI/table/TableBody";

function App() {
  const { coins, loading, onSortCoins, onSearchCoins } =
    useContext(CoinsContext);

  const [search, setSearch] = useState("");

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const onSearchHandler = () => {
    onSearchCoins(search);
  };

  const onSearchKeyHandler = (e) => {
    if (e.keyCode === 13) {
      onSearchHandler();
    }
  };

  return (
    <Wrapper>
      {loading && <Loading />}
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
          <button onClick={onSearchHandler}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="app__table-wrapper">
          <div className="app__header">
            CoinCap API <i className="fa-solid fa-coins"></i>
          </div>
          <table className="app__table">
            <TableHeaders onSortCoins={onSortCoins} />
            <TableBody coins={coins} />
          </table>
        </div>
      </section>
    </Wrapper>
  );
}

export default App;
