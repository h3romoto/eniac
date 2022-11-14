import { useState, useEffect } from "react";
import { Logo, BuildFormRow, Alert } from "../components";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";

const initialState = {
  os: "",
  storage: "",
  ram: "",
  isAlive: true,
  showAlert: true,
};

const Instance = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert, inst_specs, buildInstance } = useAppContext();
  
  const connectInstance = async (e) => {
    try {
      console.log("Connecting to your instance...");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    console.log(e.target);
  };

  const onSubmit = (e) => {
    // setValues({ ...values, [inst_specs.exists]:true});
    buildInstance();
    e.preventDefault();
    // console.log(e.target);
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h4>Build your vm</h4>
        <BuildFormRow type="text" name="OS*" handleChange={handleChange} />

        <BuildFormRow type="text" name="Disk*" handleChange={handleChange} />

        <BuildFormRow type="text" name="RAM*" handleChange={handleChange} />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        {inst_specs.id === "123" && (
          <button type="submit" className="btn btn-block" onClick={connectInstance}>
            Connect
          </button>
        )}
      </form>
    </Wrapper>
  );
};

export default Instance;

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
