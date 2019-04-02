import React, { Component } from "react";
import SpinningSquare from "./SpinningSquare";
import "./App.css";

const colors = {
  red: "#db1e1e",
  green: "#05bc8e",
  blue: "#4b81bf"
};

class App extends Component {
  N = 24;
  z = 0.7;

  getWidth = (m, n) => {
    // get coords relative to center
    const centerTransform = (this.N - 1) / 2;
    const u = m - centerTransform;
    const v = n - centerTransform;

    // perp distance to center
    const p = Math.max(Math.abs(u), Math.abs(v));

    return (
      this.z / this.N +
      ((16 * (1 - this.z)) / this.N ** 3) * (p - this.N / 4) ** 2
    );
  };

  renderSquare = ({ m, n }) => {
    const center = {
      x: (n + 0.5) / this.N,
      y: (m + 0.5) / this.N
    };

    // const s = 0.9 / this.N;
    const s = this.getWidth(m, n);

    let color = colors.blue;

    if (n >= this.N / 4 && n < (3 * this.N) / 4) {
      if (m >= this.N / 4 && m < (3 * this.N) / 4) {
        color = colors.green;
      }
    }

    return (
      <SpinningSquare
        key={`${m},${n}`}
        fill={color}
        width={s}
        height={s}
        x={center.x - s / 2}
        y={center.y - s / 2}
      />
    );
  };

  buildSquares = () => {
    const squares = [];
    for (let n = 1; n < this.N - 1; n++) {
      for (let m = 1; m < this.N - 1; m++) {
        squares.push({ m, n });
      }
    }

    return squares;
  };

  render() {
    return (
      <div className="App">
        <svg width={600} height={600} viewBox="0 0 1 1">
          <rect width="100%" height="100%" fill={colors.red} />
          {this.buildSquares().map(this.renderSquare)}
        </svg>
      </div>
    );
  }
}

export default App;
