import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

export function SignInForm() {
  const { register, handleSubmit } = useForm();

  const submitLogin = async (data) => {
    await signIn("login", {
      name: data.name,
      password: data.password,
      redirect: false,
    });
  };

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <h2>Login info</h2>
      <form onSubmit={handleSubmit(submitLogin)}>
        <input
          {...register("name", { required: true })}
          placeholder="Username"
        />
        <br />
        <input
          {...register("password", { required: true })}
          placeholder="Password"
          type="password"
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
