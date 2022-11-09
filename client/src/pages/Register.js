import { useState, useEffect } from "react";
import { Logo, UserFormRow, Alert } from "../components";
import styled from "styled-components";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  showAlert: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  // global state and useNavigate

  const handleChange = (e) => {
    console.log(e.target);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h4>Login</h4>
        { values.showAlert && <Alert />}
        <UserFormRow 
          type="email" 
          name="email" 
          onChange={handleChange} 
        />
        <UserFormRow 
          type="text" 
          name="password" 
          onChange={handleChange}
        />
        <button 
          type="submit" 
          className="btn btn-block">
          submit
        </button>
      </form>
    </Wrapper>
  );
};
export default Register;

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;
