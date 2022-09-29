import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCoinSchema } from "../../utils/db/zodSchema";
import axios from "axios";

export function DepositForm({ setRefetchUserinfo }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addCoinSchema),
  });


  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/deposit", {
        ...data,
      });
      setRefetchUserinfo(true);
    } catch (error) {
      console.error({
        message: "Something went wrong!",
        error: error,
      });
    }
  };

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <h2>Deposit Coin</h2>
      <form style={{ zoom: "1.5" }} onSubmit={handleSubmit(onSubmit)}>
        <select {...register("value", { required: true, valueAsNumber: true })}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        {errors?.value?.message && <p>{errors.value.message}</p>}
        <br />
        <input type="submit" value="deposit" />
      </form>
      <br />
    </div>
  );
}
