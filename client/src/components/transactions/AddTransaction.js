import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../transactions/addTransaction.css";

import axios from "axios";
import { BASE_URL } from "../../util/constants";

const AddTransaction = (props) => {
  const [isLoading, setLoading] = useState(true);

  const createTransaction = async (body) => {
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/transaction`, { ...body });
      setLoading(false);
      props.setTrigger(false);
      props.load();
    } catch (err) {
      console.log(err);
      // alert("Something went wrong")
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data, e) => {
    createTransaction(data);
  };
  console.log(errors);
  return (
    <>
      <div className="addTransaction-title">
        <p>Add Transaction</p>
      </div>
      <div className="hr"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="add-transaction">
        <div className="left-addtransaction">
          <div>
            <label>Transaction Name</label>
            <input
              type="text"
              {...register("title", {
                required: true,
                maxLength: 80,
              })}
              placeholder="Enter a Transaction Name"
              className="outline"
              required
            />

            {/* <div className="errors">
            {errors.TransactionName && errors.TransactionName.message}
          </div> */}
          </div>
          <div>
            <label>Amount</label>
            <input
              type="text"
              {...register("amount", { required: true, maxLength: 100 })}
              placeholder="Enter a Amount"
              className="outline"
              required
            />
          </div>
          <div>
            <label>Buyer Number</label>
            <input
              type="tel"
              {...register("buyerPhone", {
                required: true,
                maxLength: 11,
                minLength: 8,
              })}
              placeholder="Enter a Buyer Number"
              className="outline"
              required
            />
          </div>
        </div>

        <div className="right-addtransaction">
          <div>
            <label>Categories</label>
            <br />
            <select
              {...register("category", { required: true })}
              className="outline"
              defaultValue=""
            >
              <option value="" hidden>
                Select a Category
              </option>
              <option value="fish">Fish</option>
              <option value="rice">Rice</option>
              <option value="animal">Animals</option>
              <option value="others">Other</option>
            </select>
          </div>
          <div>
            <label>Buyer Name</label>
            <input
              type="text"
              {...register("buyerName", { required: true, maxLength: 100 })}
              placeholder="Enter a Buyer Name"
              className="outline"
              required
            />
          </div>

          <div>
            <label>Select a Transaction</label>
            <br />
            <div className="seletct-transaction">
              <div className="inward">
                <input
                  type="radio"
                  value="inward"
                  {...register("type", { required: true })}
                  className="outline"
                />
                <label>Inward</label>
              </div>
              <div className="outward">
                {" "}
                <input
                  type="radio"
                  value="outward"
                  {...register("type", { required: true })}
                  className="outline"
                />
                <label>Outward</label>
              </div>
            </div>
          </div>
          <div className="addtransaction-submit">
            <div className="add-reset">
              <input
                type="reset"
                value="Cancel"
                className="outline"
                onClick={() => props.setTrigger(false)}
              />
            </div>
            <div className="add-submit">
              <input
                type="submit"
                className="outline"
                value={isLoading ? "saving..." : "save"}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default AddTransaction;
