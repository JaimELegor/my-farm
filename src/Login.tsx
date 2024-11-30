import Header from "./Header";
import Footer from "./Footer";

import * as Yup from "yup";
import { useAuth } from "./Context/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
type LoginFormsInputs = {
  userName: string;
  password: string;
};


const validation = Yup.object().shape({
  userName: Yup.string().required("El nombre de usuario es requerido"),
  password: Yup.string().required("La contrasena es requerida"),
});

function Login() {
  const { loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });
  const handleLogin = (form: LoginFormsInputs) => {
    loginUser(form.userName, form.password);
    reset();
  };
  return (
    <>
      <Header tabs={true} />
      <div className="login">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="login-input-group">
              <label htmlFor="email">Username</label>
              <input
                type="text"
                id="username"
                //value={email}
                //onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Ingrese su username"
                {...register("userName")}
              />
              {errors.userName ? <p>{errors.userName.message}</p> : ""}
            </div>
            <div className="login-input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                //value={password}
                //onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Ingrese su contrasena"
                {...register("password")}
              />
              {errors.password ? <p>{errors.password.message}</p> : ""}
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login;
