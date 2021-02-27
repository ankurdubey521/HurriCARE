import React, { useState, useEffect } from "react";
import Titlebar from "./Titlebar";
import getSuperfluidSdk from "../utils/superfluid";

const Homepage = () => {
  const [superFluidFramerwork, setSuperFluidFramerwork] = useState(undefined);

  useEffect(() => {
    getSuperfluidSdk().then((sf) => setSuperFluidFramerwork(sf));
  }, []);

  return (
    <>
      <Titlebar /> <div>Homepage</div>
    </>
  );
};

export default Homepage;
