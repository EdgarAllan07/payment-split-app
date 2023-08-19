"use client";
import { useForm } from "react-hook-form";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";

function FormPayment() {
  const { setData } = useApp();
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    setData({
      amount: data.amount,
      address1: data.address1,
      address2: data.address2,
    });
    navigate.push("/confirm");
  });

  return (
    <>
      <h1 className="text-center text-4xl font-bold mt-12 mb-6 text-white">
        Welcome to Payment Splitting
      </h1>
      <div className="flex  items-center justify-between">
        <form
          onSubmit={onSubmit}
          className="px-7 py-8 h-full  bg-slate-800 text-white  mx-auto my-0 rounded-md"
        >
          <label htmlFor="amount">
            How many satoshis do you want to send, and then send half to each of
            the emails?
          </label>
          <input
            type="number"
            name="amount"
            className="block w-full text-sm text-white bg-slate-600 my-2 px-5 py-3 rounded-md"
            {...register("amount", { required: true })}
            required
            placeholder="Example: 2000 "
          />
          <label htmlFor="address1">
            Enter the Lightning Network addresses to pay
          </label>
          <input
            type="email"
            name="address1"
            className="block w-full text-sm text-white bg-slate-600 my-2 px-5 py-3 rounded-md mb-4"
            {...register("address1", { required: true })}
            placeholder="First Lightning address"
            required
          />
          <input
            type="email"
            name="address2"
            className="block w-full text-sm text-white bg-slate-600 my-2 px-5 py-3 rounded-md"
            {...register("address2", { required: true })}
            placeholder="First Lightning address"
            required
          />
          <div className="flex justify-center items-center mt-5">
            <button className="bg-blue-700 rounded-md shadow-md p-2 cursor-pointer hover:bg-blue-900 ">
              Continue
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormPayment;
