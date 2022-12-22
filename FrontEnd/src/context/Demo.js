import Nav from "../Components/LandingPage/Nav";
import { useContext, useEffect, useState } from "react";
import metaContext from "./metaContext";


const Demo = () => {
    const [add,setAdd] = useState("Hey")
    const con = useContext(metaContext);

    useEffect(() => {
    if (typeof window.ethereum !== "undefined"){
      fetchAddress();
      console.log("hello");
    }
    },[add])
    

    const fetchAddress = async () => {
        await con.accountSet();
        setAdd(con.acn.address);
    }
    return ( 
         <div>
        <Nav />
        <div class="text-white">
        <h1>Hello {add}</h1>
        {/* <button onClick={handleClick}>Get</button> */}
        </div>
    </div>);
}
 
export default Demo;