import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import Homepage from "./Components/Homepage";
import "./App.css";

const App = () => {
  return (
    <Web3ReactProvider
      getLibrary={(provider, connector) => new Web3Provider(provider)}
    >
      <h1>learning_curve</h1>;
      <Homepage />
    </Web3ReactProvider>
  );
};

export default App;
