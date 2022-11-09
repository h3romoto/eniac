import { useState, useEffect } from "react";
import { Logo, BuildFormRow, Alert } from "../components";
import styled from "styled-components";

const initialState = {
  os: "",
  storage: "",
  ram: "",
  isAlive: true,
  showAlert: true,
};

const BuildInstance = () => {
  const [values, setValues] = useState(initialState);
  // global state and useNavigate

  const handleChange = (e) => {
    console.log(e.target);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h4>Build your vm</h4>
        <BuildFormRow 
          type="text" 
          name="OS*" 
          onChange={handleChange} 
        />
        
        <BuildFormRow 
          type="text" 
          name="Disk*" 
          onChange={handleChange} 
        />

        <BuildFormRow 
          type="text" 
          name="RAM*" 
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

export default BuildInstance;

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
