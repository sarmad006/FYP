import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Link } from "react-router-dom";
import MetaMask from "../../context/Metamask";

const injected = new InjectedConnector();

const Nav = () => {
  const {
    activate,
    active,
    library: provider,
    chainId,
    account,
    deactivate,
  } = useWeb3React();

  const [hasMetamask, setHasMetamask] = useState(false);
  const [acc, setAcc] = useState("");

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
      setAcc(account);
    }
  },[]);

  async function connect() {
    try {
      await activate(injected);
      setHasMetamask(true);
      
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div class="sm:hidden lg:block tb:block xl:block sm:flex-col">
      <nav id="Maingird-nav" className="mx-20">
        <Link
          to="/"
          className="top_Nav_Span_Left"
          class="text-white hover:text-limgreen"
        >
          Home
        </Link>
        <div class="-ml-20">
          {hasMetamask ? (
            active ? (
              <h3 class="text-limgreen xl:mr-20 lg:ml-20">Connected to MetaMask</h3>
            ) : (
              <a
                href="#"
                className="top_Nav_Span_Left"
                class="text-white hover:text-orangee px-10 w-80"
                onClick={() => connect()}
              >
                Login with Metamask
              </a>
            )
          ) : (
            <a
                href="
                https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                target = "_blank"
                className="top_Nav_Span_Left"
                class="text-white hover:text-orangee px-10 w-80"
              >
                Install MetaMask
              </a>
          )}
        </div>

        <span
          className="top_Nav_Span_Middle "
          class="w-80 text-white text-center xl:mr-40"
        >
          DEDOC
        </span>
        <div id="leftComb">
          <div>
            {active ? (
              <Link
                to="/login"
                className="top_Nav_Span_Right"
                class="text-white -ml-5 hover:text-indigo-300"
              >
                Login
              </Link>
            ) : (
              <Link
                to="/reg"
                className="top_Nav_Span_Right"
                class="text-white -ml-5 hover:text-indigo-300"
              >
                Register
              </Link>
            )}
          </div>
          <div class="w-40 px-6">
            <a
              href="#"
              className="top_Nav_Span_Right"
              class="hover:text-indigo-300 text-white"
            >
              Contact Us
            </a>
          </div>
          <div>
          
            <Link
              to="/about"
              className="top_Nav_Span_Right"
              class="text-white -ml-5 hover:text-indigo-300"
            >
              About
            </Link>
          </div>
          <div className="top_Nav_Span_Right" class="px-6">
            <img src={require("../Images/MetaMask_Fox.png")} alt="MetaMask" />
          </div>
          {active ? (
            <div className="bg-limgreen mt-1 ml-0 w-2.5 h-2.5 rounded-full"></div>
          ) : (
            <div className="bg-red-600 ml-0 mt-1 w-2.5 h-2.5 rounded-full"></div>
          )}
        </div>
      </nav>
    </div> //
  );
};

export default Nav;
