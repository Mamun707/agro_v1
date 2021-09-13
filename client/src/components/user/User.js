import React, { useEffect, useState } from "react";

import "./user.css";

import Modal from "../global/Modal";
import AddUser from "./AddUser";
import { BASE_URL } from "../../util/constants";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { VscLoading } from "react-icons/vsc";
import { MdDeleteForever } from "react-icons/md";

function User() {
  const total = 18;

  // const [user, setUser] = useState(userData.slice(0, total));
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const role = localStorage.getItem("agro_role");

  const loadData = async () => {
    try {
      setLoading(true);
      const users = await axios.get(`${BASE_URL}/users`);
      setUsers(users.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      // alert("Something went wrong")
    }
  };

  const handleDelete = async (id) => {
    const users = await axios.delete(`${BASE_URL}/users/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  const [isopen, setIsopen] = useState(false);

  if (isLoading) {
    return (
      <div className="loading">
        <VscLoading />
      </div>
    );
  } else
    return (
      <div>
        <div>
          <div className="user-header">
            <p>Users</p>
          </div>
          <div>
            <div className="user-add">
              <button
                onClick={() => {
                  setIsopen(true);
                }}
              >
                Add User
              </button>
            </div>

            <div>
              <Modal trigger={isopen} setTrigger={setIsopen}>
                <AddUser
                  trigger={isopen}
                  setTrigger={setIsopen}
                  loadData={loadData}
                />
              </Modal>
            </div>
          </div>
          <div className="table">
            <div className="user-title">
              <p>Name</p>
              <p>Email</p>
              <p>Password</p>
              <p>Action</p>
            </div>
            {users.map((item, key) => {
              return (
                <div key={key}>
                  <div className="userdetails">
                    <p>{item.name}</p>
                    <p>{item.email}</p>
                    <p>{item.password}</p>
                    {role === "admin" ? (
                      <div className="delete">
                        <AiFillDelete
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                        />
                      </div>
                    ) : (
                      <div className="delete">
                        <MdDeleteForever />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
}

export default User;
