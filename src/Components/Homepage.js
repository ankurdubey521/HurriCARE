import React, { useState, useEffect } from "react";
import getSuperfluidSdk from "../Superfluid/superfluid";

const Homepage = () => {
  const [superFluidFramerwork, setSuperFluidFramerwork] = useState(undefined);

  useEffect(() => {
    getSuperfluidSdk().then((sf) => setSuperFluidFramerwork(sf));
  }, []);

  return <div>Homepage</div>;
};

export default Homepage;
