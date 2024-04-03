import { useContext } from 'react';
import { AuthContext } from 'src/contexts/auth-context';

export const useAuth = () => useContext(AuthContext);

// export const useAuth = () => {
//     const { users, setUsers } = useContext(AuthContext);
    

//     const signUp = (username, password, email) => {
//       const newUser = {
//         user_id: users.length + 1,
//         username: username,
//         password: password,
//         email: email,
//       };
  
//       // Update the users array with the new user
//     //   setUsers([...users, newUser]);
  
//       console.log('User sign-up successful!');
//     };
  
//     return { users, signUp };
//   };