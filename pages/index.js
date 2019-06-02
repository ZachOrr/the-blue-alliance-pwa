import React from "react";
import Link from "next/link";

const Home = () => (
  <div>
    <h1>Home</h1>
    <Link href="/events">
      <a>Events</a>
    </Link>
    <br />
    <Link href="/event?eventKey=2019casj" as="/event/2019casj">
      <a>2019casj</a>
    </Link>
  </div>
);

export default Home;
