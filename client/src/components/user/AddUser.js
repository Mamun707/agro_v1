import React from "react";
import { useForm } from "react-hook-form";
import "./AddUser.css";
import axios from "axios"
import {BASE_URL}from "../../util/constants"


const AddUser = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = async(data, e) => {

   try{
    const res = await axios.post(`${BASE_URL}/users`,data);
    alert("Thank you, your user has been created")
    
    props.loadData() 
   }catch(err){
     alert(err.response.data.message)
   }
 

   
  };
  console.log(errors);
  return (
    <>
      <div className="addUser-title">
        <p>Add User</p>
      </div>
      <div className="hr"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="add-user">
        <div className="users-details">
          <div>
            <label>Name</label>
            <input
              type="text"
              {...register("name", {
                required: true,
                maxLength: 80,
              })}
              placeholder="Enter a Name"
              className="outline"
              required
            />

            {/* <div className="errors">
            {errors.TransactionName && errors.TransactionName.message}
          </div> */}
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              placeholder="Enter a Email"
              className="outline"
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="Text"
              {...register("password", {
                required: true,
                maxLength: 16,
                minLength: 6,
              })}
              placeholder="Enter a Password"
              className="outline"
              required
            />
          </div>
        </div>
        <div className="adduser-submition">
          <div className="adduser-reset">
            <input
              type="reset"
              value="Cancel"
              className="outline"
              onClick={() => props.setTrigger(false)}
            />
          </div>
          <div className="adduser-submit">
            <input type="submit" className="outline" value="Add" />
          </div>
        </div>
      </form>
    </>
  );
};
export default AddUser;
