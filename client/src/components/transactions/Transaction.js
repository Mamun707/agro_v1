import React, { useState, useEffect } from "react";

import "../transactions/transaction.css";

import Paginate from "../global/Paginate";
import tranData from "../../data/transaction.json";

import AddTransaction from "./AddTransaction";
import Modal from "../global/Modal";
import { VscLoading } from "react-icons/vsc";

import axios from "axios";
import { BASE_URL } from "../../util/constants";
import moment from "moment";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const transactionsPerPage = 6;
  const pageVisited = transactionsPerPage * pageNumber;

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/transaction`);
      let transaction = res.data.data.transaction;
      setTransactions(transaction);
      setLoading(false);
    } catch (err) {
      console.log(err);
      // alert("Something went wrong")
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const displayTranList = transactions
    .slice(pageVisited, pageVisited + transactionsPerPage)
    .map((tranDetails, index) => {
      return (
        <div key={index}>
          <div className="trandetails">
            <p>{tranDetails.title}</p>
            <p>{tranDetails.category}</p>
            <p>{tranDetails.amount}</p>
            <p>{tranDetails.type}</p>
            <p>{moment(tranDetails.createdAt).format("DD-MM-YYYY")}</p>

            <p>{tranDetails.buyerName}</p>
            <p>{tranDetails.buyerPhone}</p>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(transactions.length / transactionsPerPage);
  const pageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const [isopen, setIsopen] = useState(false);

  if (isLoading) {
    return (
      <div className="loading">
        <VscLoading />
      </div>
    );
  }
  return (
    <div>
      <div className="tran-header">
        <p>Transaction</p>
      </div>
      <div>
        <div className="tran-add">
          <button
            onClick={() => {
              setIsopen(true);
            }}
          >
            Add Transaction
          </button>
        </div>

        <div>
          <Modal trigger={isopen} setTrigger={setIsopen}>
            <AddTransaction
              trigger={isopen}
              setTrigger={setIsopen}
              load={loadData}
            />
          </Modal>
        </div>
      </div>

      <div className="tableData">
        <div className="tran-title">
          <p>Name</p>
          <p>Category</p>
          <p>Amount</p>
          <p>Inward/Outward</p>
          <p>Date</p>
          <p>Buyer Name</p>
          <p>Buyer Number</p>
        </div>
        {displayTranList}
        <div className="pagination">
          <div className="show-result">
            <p>
              Showing Result {pageVisited + 1} to{" "}
              {transactionsPerPage + pageVisited} of {transactions.length + 1}
            </p>
          </div>
        </div>
      </div>

      <div className="pageNumber">
        <Paginate pageChange={pageChange} pageCount={pageCount} />
      </div>
    </div>
  );
}

export default Transaction;
