import React, { Component } from "react";

const Input = ({ name, label,error,...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        placeholder={`Enter ${label}`}
        {...rest}
        id={name}
        name={name}
      />
      {error && <div className="alert alert-danger">{ error}</div>}
    </div>
  );
};

export default Input;
