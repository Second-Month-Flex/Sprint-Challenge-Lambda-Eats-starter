import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1> Lets eat some Lambda Pizza!</h1>
      <Link to={"/pizza"}>
        <button> Click me for Pizza! </button>
      </Link>
    </div>
  );
}

export default Home;
