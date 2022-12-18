const Nav = () => {
    return (
        <div>
            <nav id="Maingird-nav" className="mx-20">
          <a href="#" className="top_Nav_Span_Left" class="text-white hover:text-limgreen">
            Home
          </a>
          <a
            href="#"
            className="top_Nav_Span_Left"
            class="text-white hover:text-orangee px-10 w-80"
          >
            Login with Metamask
          </a>
          <span className="top_Nav_Span_Middle " class="w-80 text-white text-center">D E D O C</span>
          <a href="#" className="top_Nav_Span_Right">
            Register
          </a>
          <a href="#" className="top_Nav_Span_Right">
            Contact Us
          </a>
          <a href="#" className="top_Nav_Span_Right">
            About
          </a>
          <span className="top_Nav_Span_Right">
            <img src={ require('../Images/MetaMask_Fox.png') } alt="MetaMask" />
          </span>
        </nav>
        </div>
      );
}
 
export default Nav;
<div>

</div>