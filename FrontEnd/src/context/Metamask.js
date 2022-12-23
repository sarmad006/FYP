import metaContext from "./metaContext";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";

const injected = new InjectedConnector();

const MetaMask = (props) => {
  const {
    activate,
    active,
    library: provider,
    chainId,
    account,
    deactivate,
  } = useWeb3React();

  const [hasMetamask, setHasMetamask] = useState(false);
  

  const state = {
<<<<<<< HEAD
    address: "No address yet"
=======
    address: null,
>>>>>>> 486a3670e0c8666a718047db6faade4a3bde5556
  };
  // useEffect(async () => {
  //   if (typeof window.ethereum !== "undefined") {
  //     setHasMetamask(true);
  //     await connect();
  //     setAcn({"address":account})
  //   }
  // });
  const [acn, setAcn] = useState(state);
  async function connect() {
    try {
      await activate(injected); //waiting for connection with MetaMask
      setHasMetamask(true);
      return account
    } catch (e) {
      console.log(e);
    }  
  }
  let x;
  const accountSet = async()=>{
    x = await connect();
    setAcn({"address":x
  })
  }

  return (
    <metaContext.Provider value={{acn,accountSet}}>
      {props.children}
    </metaContext.Provider>
  );
};

export default MetaMask;
