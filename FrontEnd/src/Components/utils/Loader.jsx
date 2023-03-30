import React from "react";
import LoadingOverlay from "react-loading-overlay";

const Loader = ({ isActive }) => {
  return (
    <LoadingOverlay
      active={isActive}
      spinner
      text="Loading ..."
    ></LoadingOverlay>
  );
};

export default Loader;
