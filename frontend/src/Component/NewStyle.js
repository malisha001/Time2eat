// import React, { useState } from 'react';

// const FormValidationExample = () => {

//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   })

//   const [errors, setErrors] = useState({})

//   const handleChange = (e) => {
//     const {name, value} = e.target;
//     let validationErrors = {...errors};

//     switch(name) {
//       case 'username':
//         validationErrors.username = value.trim() ? '' : 'username is required';
//         break;
//       case 'email':
//         validationErrors.email = value.trim() ? (/^\S+@\S+\.\S+$/.test(value) ? '' : 'email is not valid') : 'email is required';
//         break;
//       case 'password':
//         validationErrors.password = value.length >= 6 ? '' : 'password should be at least 6 char';
//         validationErrors.confirmPassword = formData.confirmPassword === value ? '' : 'password not matched';
//         break;
//       case 'confirmPassword':
//         validationErrors.confirmPassword = formData.password === value ? '' : 'password not matched';
//         break;
//       default:
//         break;
//     }

//     setErrors(validationErrors);
//     setFormData({
//         ...formData,
//         [name]: value
//     });
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     if(Object.values(errors).every(error => !error)) {
//         alert("Form Submitted successfully");
//     } else {
//         alert("Please fix the errors in the form before submitting");
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Username:</label>
//         <input
//           type="text"
//           name="username"
//           placeholder='username'  
//           autoComplete='off'  
//           onChange={handleChange}   
//         />
//         {errors.username && <span>{errors.username}</span>}  
//       </div>
//       <div>
//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           placeholder='example@gmail.com'
//           autoComplete='off'
//           onChange={handleChange} 
//         />
//         {errors.email && <span>{errors.email}</span>}  
//       </div>
//       <div>
//         <label>Password:</label>
//         <input
//           type="password"
//           name="password"
//           placeholder='******'
//           onChange={handleChange} 
//         />
//         {errors.password && <span>{errors.password}</span>}  
//       </div>
//       <div>
//         <label>Confirm Password:</label>
//         <input
//           type="password"
//           name="confirmPassword"
//           placeholder='******'
//           onChange={handleChange} 
//         />
//         {errors.confirmPassword && <span>{errors.confirmPassword}</span>}  
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default FormValidationExample;
