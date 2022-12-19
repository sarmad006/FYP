import Nav from "./Nav";
import "./Thankyou.css";

const Thankyou = () => {
  return (
    <div>
      <Nav />
      <div class="flex flex-col mt-20 text-center">
        <div class="text-limgreen" id="mainheading">
          THANKYOU FOR
        </div>
        <span id="main_heading_span" class="text-limgreen">
          REGISTERING </span>
        <div className="Application_Received_1">
          We have received your application , Our team is in the process of
          reviewing your application according to our SOP
        </div>
        <div className="Application_Received_1" >
          You will receive the confirmation of your Application viathe Email
          provided earlier .
        </div>
      </div>
    </div>
  );
}; 

export default Thankyou;
