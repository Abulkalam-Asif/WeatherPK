import React from 'react'
import "./loader.css";
import { Puff } from 'react-loader-spinner';

const Loader = () => {
  return (
    <>
      <div className="loader_bg">
        < Puff
          color="#ff4d00"
          wrapperClass="loader"
          ariaLabel="puff-loading"
        />
      </div>
    </>
  )
}

export default Loader