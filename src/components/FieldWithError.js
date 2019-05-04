import React from 'react';
import { Field } from 'formik';
import { object, string } from 'prop-types';

// wrapper around Formik's Field component
// handles error displaying properly
const FieldWithError = props => {
  const hasError = props.errors[props.name] && props.touched[props.name];
  return (
    <div className="field-with-error">
      <div>
        <Field {...props} className={hasError ? 'field-error' : ''} />
      </div>
      {hasError && (
        <span style={{ color: 'red' }}>{props.errors[props.name]}</span>
      )}
    </div>
  );
};

FieldWithError.propTypes = {
  errors: object.isRequired,
  touched: object.isRequired,
  name: string.isRequired,
  type: string
};

FieldWithError.defaultProps = {
  type: 'text'
};

export default FieldWithError;
