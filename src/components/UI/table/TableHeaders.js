import { useReducer } from "react";

const emptySortState = {
  rank: "NONE",
  abbr: "NONE",
  name: "NONE",
  price: "NONE",
  change: "NONE",
};

const initialSortState = { ...emptySortState, rank: "ASCENDING" };

const defaultAction = { col: "rank", type: "ASCENDING" };

const reducerSort = (state, action) => {
  switch (action.col) {
    case "rank":
      return { ...emptySortState, rank: action.type };
    case "name":
      return { ...emptySortState, name: action.type };
    case "abbr":
      return { ...emptySortState, abbr: action.type };
    case "price":
      return { ...emptySortState, price: action.type };
    case "change":
      return { ...emptySortState, change: action.type };
    default:
      return { ...emptySortState, rank: "ASCENDING" };
  }
};

const nextSort = (type) => {
  switch (type) {
    case "NONE":
      return "ASCENDING";
    case "ASCENDING":
      return "DESCENDING";
    default:
      return "NONE";
  }
};

export default function TableHeaders(props) {
  const [sortConfig, dispatchSortConfig] = useReducer(
    reducerSort,
    initialSortState
  );

  const onSortHandler = (col) => {
    const nextType = nextSort(sortConfig[col]);

    const action =
      nextType === "NONE" ? defaultAction : { col, type: nextType };

    props.onSort(action);

    dispatchSortConfig(action);
  };

  const headers = Object.keys(emptySortState);

  const HeadersLIst = headers.map((header) => (
    <th key={header}>
      <div>
        <span>{header}</span>
        <button onClick={onSortHandler.bind(null, header)}>
          {sortConfig[header] === "ASCENDING" ? (
            <>
              <i className="fa-solid fa-sort-up"></i>
            </>
          ) : sortConfig[header] === "DESCENDING" ? (
            <>
              <i className="fa-solid fa-sort-down"></i>
            </>
          ) : (
            <>
              <i className="fa-solid fa-sort"></i>
            </>
          )}
        </button>
      </div>
    </th>
  ));

  return (
    <thead>
      <tr>{HeadersLIst}</tr>
    </thead>
  );
}
