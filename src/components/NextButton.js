import React from 'react';
import { func, arrayOf, string } from 'prop-types';

// click handler for next step - checks given fields and allows user to proceed to the next step if those fields are valid
const validateAndMoveForward = (fields, options) => async () => {
  // options must be injected from within the component when they become available from render props functions
  // next is a function from Wizard's Step render props
  // setTouched, validateForm are functions from Formik's render props
  const { next, setTouched, validateForm } = options;

  await setTouched(fields.reduce((acc, curr) => (acc[curr] = true && acc), {}));
  const errors = await validateForm();

  if (fields.every(field => !errors[field])) {
    next();
  }
};

const NextButton = ({ setTouched, validateForm, next, fields, ...props }) => {
  const options = {
    setTouched,
    validateForm,
    next
  };
  return (
    <button {...props} onClick={validateAndMoveForward(fields, options)}>
      {props.children}
    </button>
  );
};

NextButton.propTypes = {
  setTouched: func.isRequired,
  validateForm: func.isRequired,
  next: func.isRequired,
  fields: arrayOf(string).isRequired
};

export default NextButton;
