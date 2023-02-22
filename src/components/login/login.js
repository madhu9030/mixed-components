import React, { useState, useRef } from "react";
import { Link, Route, useLocation, Redirect, Switch, Router } from "react-router-dom";

import TextField from "../textField/textField";
import Button from "../button/button";
import "./login.scss";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [dob, setDOB] = useState("");
  const inputAttrs = {
    "data-parse": "date",
    pattern: "d{2}/d{2}/d{4}",
    required: "required",
  };

  return (
    <>
      <div className="login-wrapper fade-in enable">
        <div className="login-fields enable">
          <div className="login-title">Enter SignUp Details</div>
          <form>
            <TextField
              inputLabel="FirstName"
              id="firstName"
              setInput={setFirstName}
              input={firstName}
              onBlur={() => null}
              type="text"
            />
            <TextField
              inputLabel="LastName"
              id="lastName"
              onBlur={() => null}
              setInput={setLastName}
              input={lastName}
              type="text"
            />
            <TextField
              inputLabel="Email Address"
              id="email"
              setInput={setEmail}
              onBlur={() => null}
              input={email}
              type="email"
            />
            <TextField
              inputLabel="DOB"
              id="dob"
              inputAttrs={inputAttrs}
              setInput={setDOB}
              input={dob}
              onBlur={() => null}
              type="date"
            />
            <TextField
              inputLabel="Password"
              id="password"
              setInput={setPassword}
              input={password}
              onBlur={() => null}
              type="password"
            />
            <TextField
              inputLabel="Re-Enter Passord again"
              id="reenterpassword"
              setInput={setReEnterPassword}
              onBlur={() => null}
              input={reEnterPassword}
              type="password"
            />
            <div className="login-buttons">
              <Button label="Sign Up" type="submit" />
              <Button label="Login" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const Login = ({isLogin, login}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailVaild, setEmailVaild] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(["Please enter Email"]);
  const [disable, setDisable] = useState(false);
  const [isLoading, setloading] = useState(null);

  let location = useLocation();
  // useEffect(() => {
  //   if(Loading) return <Switch><Route path="/login" render={() => <Redirect to="/home" />} /></Switch>
  // }, [isLoading]);

  // const onBlur = (e) => {
  //   if (e.target.value === "") {
  //     setPasswordValid(true);
  //   } else {
  //     setPasswordValid(false);
  //   }
  // };

  const emailValid = (e) => {
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    e.target.id === "email" &&
      e.target.value !== "" &&
      !pattern.test(e.target.value) &&
      setErrorMessage(["Please enter valid Email"]);
    if (
      e.target.id === "email" &&
      e.target.value !== "" &&
      pattern.test(e.target.value)
    ) {
      setEmailVaild(false);
    } else if (e.target.value === "") {
      setEmailVaild(true);
    }
  };
  const ref = useRef(null);
  const validation = (e) => {
    setloading(true)
    e.preventDefault();
    if (email.toLocaleLowerCase() === "msreddy490@gmail.com" && password === "M@dhu9030") {
      window.localStorage.setItem('sessionId', `madhu9030`)
      setTimeout(() => {
        setloading(false)
      }, 2000);
      return <Router><Switch><Route path="/login" render={() => <Redirect to="/home" />} /></Switch></Router>
    } else {
      setPasswordValid(true);
      setEmailVaild(true);
      ref.current.focus();
    }
  };
  const passwordBlur = (e) => {
    // debugger;
    let inputVal = e.target.value;
    if (inputVal.length < 6 && e.target.value !== "") {
      setPasswordValid(true);
      setErrorMessage(["Password must be 6 characters"]);
      console.log(errorMessage);
    } else if (e.target.value === "") {
      setPasswordValid(true);
      setErrorMessage(["Please enter the password"]);
    } else {
      setPasswordValid(false);
      setErrorMessage([]);
    }
  };
  return (
    <div className="login-wrapper fade-in">
      <div className={`login-fields ${disable ? "disable" : ""}`}>
        <div className="login-title">Enter Login Details</div>
        <form onSubmit={(e) => validation(e)} method="POST">
          <TextField
            inputLabel="Email"
            id="email"
            ref={ref}
            setInput={setEmail}
            input={email}
            type="email"
            onBlur={emailValid}
            error={emailVaild}
            disabled={disable}
            errorMessage={errorMessage}
          />
          <TextField
            id="password"
            inputLabel="Password"
            setInput={setPassword}
            input={password}
            type="password"
            disabled={disable}
            onBlur={passwordBlur}
            error={passwordValid}
            errorMessage={errorMessage}
          />
          <div className="login-buttons">
              <Button label="Login" type="submit" disabled={disable} isLoading= {isLoading} />

            <Button buttonLink label="Forgot Password" disabled={disable} />
          </div>
        </form>
        <div className="new-user">
          <span>New User?</span>
          <Link
            to={`/login/newuser`}
            onClick={() => {
              if (location !== "/login") setDisable(true);
            }}
          >
            <Button buttonLink label="Sign Up" disabled={disable} />
          </Link>
        </div>
      </div>

      <Route path="/login/newuser" component={SignUp} />
    </div>
  );
};

export default Login;
