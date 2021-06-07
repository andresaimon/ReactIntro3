import React, { useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import './App.css';
import { Scope } from '@unform/core';
import Input from './components/Form/Input';
import * as Yup from 'yup';

function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {

    try {
          /*Yup add */
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrgigatório'),
      email: Yup.string()
        .email('Digite um e-mail válido')
        .required('O e-mail é obrigatório'),
        address: Yup.object().shape({
          city: Yup.string()
          .min(3, 'No mínimo 3 caracteres')
          .required('A cidade é obrigatória')
        })
    });
    
    
    /*
    if (data.name === "") {
      formRef.current.setErrors({
        name: 'o nome é obrigatório',
        address: {
          city: 'A cidade é obrigatória'
        }
      });
    }
    */

    await schema.validate(data, {
      abortEarly: false,
    })

    console.log(data);

    formRef.current.setErrors({});

    reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
            }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: 'teste name',
        email: 'teste@email.com',
        address: {
          city: 'teste cidade'
        }
      })
    }, 2000);
  }, []);

  return (
    <div className="App">
      <h1>Hello World</h1>


      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" />
        <Input name="email" />

      <Scope path="address">
        <Input name="street" />
        <Input name="neighborhood" />
        <Input name="city" />
        <Input name="state" />
        <Input name="number" />
      </Scope>

        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
