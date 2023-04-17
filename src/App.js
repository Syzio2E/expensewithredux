import './App.css';
import { useRef } from 'react';

function App() {
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const newPasswordInputRef = useRef()
  const submitHandler=(e)=>{
      e.preventDefault()
      const enteredname = emailInputRef.current.value
      const enteredpassword = passwordInputRef.current.value
      const enterednewpassword = newPasswordInputRef.current.value

      if(enteredpassword === enterednewpassword){
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsjlqSxSJstWgnPxkEclW4139wbkcTVk0',{
          method: 'POST',
          body: JSON.stringify({
            email: enteredname,
            password: enteredpassword,
            returnSecureToken: true
          }),
          headers: {
              'Content-Type': 'application/json'
          }
        }).then(res=>{
          if(res.ok){
            console.log('user has successful signup')
          } else {
            res.json().then(data=>{
              console.log(data)
            })
          }
        })
      }

  }

  return (
    <div className="App">
     <form onSubmit={submitHandler}>
      <label htmlFor='email'>Email:</label>
      <input type='text' id='email' ref={emailInputRef}/>
      <label htmlFor='password'>Password:</label>
      <input type='password' id='password' ref={passwordInputRef}/>
      <label htmlFor='new-password'>Password:</label>
      <input type='password' id='new-password' ref={newPasswordInputRef}/>
      <button type='submit'>Sign Up</button>
     </form>
     <button type='button'>Have an Account? Login</button>
    </div>
  );
}

export default App;
