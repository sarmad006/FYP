import React from 'react'
import { TailSpin } from 'react-loader-spinner'
import LoadingOverlay from 'react-loading-overlay';

const Loader = ({isActive}) => {
  return (
    <LoadingOverlay
    active={isActive}
    spinner
    />
  )
}

export default Loader