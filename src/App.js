import "./App.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./components/pages/Home";

function App() {
  const [islogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const toggleHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredname = emailInputRef.current.value;
    const enteredpassword = passwordInputRef.current.value;
    

    setIsLoading(true);
    let url = "";
    if (islogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsjlqSxSJstWgnPxkEclW4139wbkcTVk0";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsjlqSxSJstWgnPxkEclW4139wbkcTVk0";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredname,
        password: enteredpassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication error";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        navigate('/',<Home/>)
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="App">
      <h1>{islogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" ref={emailInputRef} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={passwordInputRef} />
        {!islogin && (
          <div>
            <label htmlFor="new-password">New Password:</label>
            <input
              type="password"
              id="new-password"
              ref={newPasswordInputRef}
            />
          </div>
        )}
        {!isLoading && (
          <button type="submit">{islogin ? "Login" : "Signup"}</button>
        )}
        {isLoading && <p>Loading...</p>}
      </form>
      <button type="button" onClick={toggleHandler}>
        Have an Account? Login
      </button>
    </div>
  );
}

export default App;
