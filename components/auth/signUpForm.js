import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

export function SignUpForm() {
  const { register, handleSubmit } = useForm();

  const submitSignUp = async (data) => {
    console.log("submitSignUp =>", data);
    await signIn("signup", {
      name: data.name,
      password: data.password,
      role: data.role,
      redirect: false,
    });
  };

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <h2>Sign Up info</h2>
      <form onSubmit={handleSubmit(submitSignUp)}>
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
        <span>I am a </span>
        <select {...register("role", { required: true })}>
          <option value="BUYER">BUYER</option>
          <option value="SELLER">SELLER</option>
        </select>
        <br />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
}
