import React from 'react'
import { useRef } from 'react'

const Passwordreset = () => {
   
    const emailInputRef = useRef()

    const submitHandler=(e)=>{
        e.preventDefault()
        const enteredEmail = emailInputRef.current.value
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCsjlqSxSJstWgnPxkEclW4139wbkcTVk0'
        const requestBody = {
            requestType: 'PASSWORD_RESET',
            email:enteredEmail
        }
        fetch(url,{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response)=>{
            if(!response.ok){
                console.log('reset error')
                throw new Error('Reset error')
            }
            return response.json()
        })
        .then((data)=>{
            console.log(data)
           alert('Reset link sent')
        })
        .catch((error)=>{
            
        })

    }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor='email' >Enter Email:</label>
      <input id='email' type='email' ref={emailInputRef}/>
      <button type='submit'>Send reset link</button>
    </form>
  )
}

export default Passwordreset
