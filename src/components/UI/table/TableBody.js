import Row from "./Row";

export default function TableBody(props) {
  const content = props.coins.map((row) => (
    <Row
      key={row.id}
      rank={row.rank}
      abbr={row.abbr}
      name={row.name}
      price={row.price}
      change={row.change}
    />
  ));
  return <tbody>{content}</tbody>;
}
