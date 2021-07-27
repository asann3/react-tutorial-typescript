import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game'
import "./index.css";

// Gameコンポーネントがrootコンポーネントであることを示している。
// ~/public/index.htmlにあるdivタグのid"=root"を指している
ReactDOM.render(<Game />, document.getElementById("root"));
