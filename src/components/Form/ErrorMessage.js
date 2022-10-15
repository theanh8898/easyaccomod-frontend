import React from 'react';
import {ErrorMessage as FMErrorMessage} from 'formik';

function ErrorMessage({name}) {
  return (
    <FMErrorMessage name={name} component="div" className="error-message"/>
  );
}

export default ErrorMessage;
