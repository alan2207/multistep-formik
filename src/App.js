import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Wizard, { Steps, Step } from './components/Wizard';
import NextButton from './components/NextButton';
import FieldWithError from './components/FieldWithError';

import './App.css';

const Schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/)
    .min(8, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required')
});

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
};

function App() {
  return (
    <div className="App">
      <h1>Multistep Formik</h1>
      <Formik
        validationSchema={Schema}
        initialValues={initialState}
        onSubmit={values => alert(JSON.stringify(values))}
      >
        {({
          values,
          errors,
          touched,
          validateForm,
          setTouched,
          submitForm
        }) => (
          <Wizard>
            <Steps>
              <Step>
                {({ next }) => (
                  <>
                    <h2>Personal Info</h2>
                    <label>
                      First Name:
                      <FieldWithError
                        errors={errors}
                        touched={touched}
                        name="firstName"
                      />
                    </label>

                    <label>
                      Last Name:
                      <FieldWithError
                        errors={errors}
                        touched={touched}
                        name="lastName"
                      />
                    </label>
                    <div>
                      <NextButton
                        setTouched={setTouched}
                        validateForm={validateForm}
                        next={next}
                        fields={['firstName', 'lastName']}
                      >
                        Next
                      </NextButton>
                    </div>
                  </>
                )}
              </Step>
              <Step>
                {({ previous, next }) => (
                  <>
                    <h2>Contact</h2>
                    <label>
                      Email:
                      <FieldWithError
                        errors={errors}
                        touched={touched}
                        type="email"
                        name="email"
                      />
                    </label>
                    <label>
                      Phone:
                      <FieldWithError
                        errors={errors}
                        touched={touched}
                        name="phone"
                      />
                    </label>
                    <div>
                      <button onClick={previous}>Back</button>
                      <NextButton
                        setTouched={setTouched}
                        validateForm={validateForm}
                        next={next}
                        fields={['email', 'phone']}
                      >
                        Next
                      </NextButton>
                    </div>
                  </>
                )}
              </Step>
              <Step>
                {({ jump, previous }) => (
                  <div>
                    <h2>Summary</h2>
                    <ul>
                      {Object.entries(values).map((x, i) => (
                        <li key={x[0]}>
                          {x.join(': ')}
                          <button onClick={() => jump(i > 1 ? 2 : 1)}>
                            Edit
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div>
                      <button onClick={submitForm}>Submit</button>
                    </div>
                    <div>
                      <button onClick={previous}>Back</button>
                    </div>
                  </div>
                )}
              </Step>
            </Steps>
          </Wizard>
        )}
      </Formik>
    </div>
  );
}

export default App;
