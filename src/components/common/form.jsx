import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validateSubmit();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validateSubmit = () => {
    const abortEarly = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, abortEarly);
  
    if (!error) return null;
    
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        options={options}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderButton = (label) => {
    return (
      <button className="btn btn-primary" disabled={this.validateSubmit()}>
        {label}
      </button>
    );
  };
}

export default Form;
