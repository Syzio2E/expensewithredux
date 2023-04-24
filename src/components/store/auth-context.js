// import React from "react"; 
// import { useState } from "react";





// const AuthContext = React.createContext({
//     token: '',
//     isLoggedIn: false,
//     profileComplete: false,
//     currentUser: '',
//     email: '',
//     login: (token,localid,email) => {},
//     logout: () => {},
//     complete: () => {}
// });

// export const AuthContextProvider = (props) => {
//     const [token, setToken] = useState(null);
//     const [completeProfile, setCompleteProfile] = useState(false);
//     const [currentUser, setCurrentUser] = useState('');
//     const [email,setEmail] = useState('')
//     const userIsLoggedIn = !!token;

//     const loginHandler = (token,email,localid) => {
//         setToken(token);
//         setCurrentUser(localid);
//         setEmail(email)
//         localStorage.setItem('token', token)
//         localStorage.setItem('currentUser', localid)
//         localStorage.setItem('email', email)
        
//     };

//     const logoutHandler = () => {
//         setToken(null);
//         setCurrentUser(null);
//     };

//     const completeHandler = () => {
//         if(completeProfile===true){
//             return
//         } else {
//             setCompleteProfile(true)
//         }
//     };

//     const contextValue = {
//         token: token,
//         isLoggedIn: userIsLoggedIn,
//         profileComplete: completeProfile,
//         currentUser: currentUser,
//         email:email,
//         login: loginHandler,
//         logout: logoutHandler,
//         complete: completeHandler
//     };

//     return (
//         <AuthContext.Provider value={contextValue}>
//             {props.children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthContext;