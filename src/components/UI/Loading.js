import { createPortal } from "react-dom";

import './styles/loading.css'

export default function Loading() {
  const content = (
    <div className="loading">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
  return createPortal(content, document.getElementById("root-modal"));
}
