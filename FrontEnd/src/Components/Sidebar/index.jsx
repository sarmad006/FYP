
const Sidebar = () => {
  return (
    <div className="main">
      <div className="Nav">
        <div className="left">
          <div className="navLeft">
            <h6>Home</h6>
            <h6>Login with MetMask</h6>
          </div>
        </div>
        <div className="center">
          <div className="navCenter">
            <h4>DEDOC</h4>
          </div>
        </div>
        <div className="left">
          <div className="navLeft">
            <h6>Register</h6>
            <h6>Contact</h6>
            <h6>About Us</h6>
            <img src="./metamask.svg" style={{ width: "8%" }} />
          </div>
        </div>
      </div>
      <div className="side">
        <h3 className="sidebar">Sidebar</h3>
        <h3 className="sidebar">Sidebar</h3>
        <h3 className="sidebar">Sidebar</h3>
        <h3 className="sidebar">Sidebar</h3>
        <h3 className="sidebar">Sidebar</h3>
        <h3 className="sidebar">Sidebar</h3>
        <h3 className="sidebar">Sidebar</h3>
        <h3 className="sidebar">Sidebar</h3>
        <h3 className="sidebar">Sidebar</h3>
        <h3 className="sidebar">Sidebar</h3>
      </div>
      <div className="content">content</div>
      <div className="content_to_write">Content Here</div>
      <div className="footer">Footer</div>
    </div>
  );
};

export default Sidebar;
