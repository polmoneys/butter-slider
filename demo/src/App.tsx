import * as React from "react";
import "./styles.css";
import { Slideable } from "./slideable";

export default function App() {
  return (
    <div className="App">
      <Slideable className="text">
        HELLO DARKNESS MY OLD FRIEND
        <button type="button" onClick={() => console.log("y")}>
          DO OI ¿?
        </button>
      </Slideable>
    </div>
  );
}
