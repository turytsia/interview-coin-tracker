import { useEffect, useState } from "react";

export default function Row(props) {
  const [className, setClassName] = useState("");
  const [price, setPrice] = useState(null);

  useEffect(() => {
    if (price) {
      if (price > props.price) {
        setClassName("on-drop");
      }
      if (price < props.price) {
        setClassName("on-rise");
      }
      setTimeout(() => {
        setClassName("");
      }, 400);
    }
    setPrice(props.price);
  }, [props.price,price]);
  return (
    <tr className={className}>
      <td>{props.rank}</td>
      <td>{props.abbr}</td>
      <td>{props.name}</td>
      <td>${parseFloat(props.price).toFixed(2)}</td>
      <td>{parseFloat(props.change).toFixed(2)}</td>
    </tr>
  );
}
