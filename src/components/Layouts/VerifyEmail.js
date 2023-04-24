import React from 'react'
import { useSelector } from 'react-redux'



const VerifyEmail = () => {
const idToken = useSelector(state=>state.auth.token)


const verifyEmailHandler=()=>{
    const url='https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCsjlqSxSJstWgnPxkEclW4139wbkcTVk0'
    const requestBody={
        requestType: 'VERIFY_EMAIL',
        idToken:idToken
    };
    fetch(url,{
        method: 'POST',
        body:JSON.stringify(requestBody),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response)=>{
                if(!response.ok){
                    console.log('failed')
                    throw new Error('failed verification')
                }
                return response.json()    
    })
    .then((data)=>{
           console.log(data)
           console.log('profile updated')         
    })
    .catch((error)=>{
        // handle error
    })
}


  return (
    <button onClick={verifyEmailHandler}>Verify Email</button>
  )
}

export default VerifyEmail
