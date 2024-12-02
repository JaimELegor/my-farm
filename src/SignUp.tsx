import React from 'react'
import Header from './Header'
import Footer from './Footer'
import * as Yup from "yup";
import { useAuth } from "./Context/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const validation = Yup.object().shape({
  userName: Yup.string().required("El nombre de usuario es requerido"),
  email: Yup.string().email("El correo debe ser valido").required("El correo es requerido"),
  password: Yup.string()
    .required("La contrasena es requerida")
    .min(8, 'La contrasena debe ser de al menos de 8 caracteres')
    .max(25, 'Tampoco te pases :/'),
  confirmPassword: Yup.string()
    .required('La confirmacion es requerida')
    .oneOf([Yup.ref('password')], 'Las contrasenas deben coincidir'),
});

type LoginFormsInputs = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface Props {
  edit: boolean;
}

function SignUp({ edit }: Props) {
  const { logout, registerUser, editUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginFormsInputs) => {
    if (edit) {
      editUser(form.email, form.userName, form.password);
    } else {
      registerUser(form.email, form.userName, form.password);
    }
    reset();
  };

  const handleLogout = () => logout();

  return (
    <>
      <Header tabs={!edit} />
      <div className="login">
        <div className="login-container">
          <div className="show-db-bar">
            <button onClick={handleLogout} className="show-db-btn" style={{ backgroundColor: 'red' }}>Logout</button>
          </div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="login-input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                //value={username}
                //onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
                {...register("userName")}
              />
            </div>
            <div className="login-input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                //value={email}
                //onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                {...register("email")}
              />
            </div>
            <div className="login-input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                //value={password}
                //onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                {...register("password")}
              />
            </div>
            <div className="login-input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                //value={confirmPassword}
                //onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
                {...register("confirmPassword")}
              />
              {errors.userName ? <p>{errors.userName.message}</p> : ""}
              {errors.email ? <p>{errors.email.message}</p> : ""}
              {errors.password ? <p>{errors.password.message}</p> : ""}
              {errors.confirmPassword ? <p>{errors.confirmPassword.message}</p> : ""}
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SignUp
