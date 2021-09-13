import React, { useState, useEffect } from "react";
import "./dashboard.css";
import axios from "axios";
import { BASE_URL } from "../../util/constants";
import { VscLoading } from "react-icons/vsc";

function Dashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/transaction/report`);

      console.log(res.data.data)
      setData(res.data.data);
      console.log(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      // alert("Something went wrong")
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <VscLoading />
      </div>
    );
  }
  return (
    <div>
      {data.map((dashDetail, index) => {
        return (
          <div key={index}>
            <div className="dash-card">
              <div className="t-title">
                {" "}
                <p>{dashDetail.category} Overview</p>
              </div>

              <div className="d-hr"></div>
              <div className="t-detail">
                <div className="t-cost t-card">
                  {" "}
                  <div className="t-img">
                    <img src="../taka1.png" alt="taka" />
                  </div>
                  <div className="t-info">
                    <h3>Total Cost</h3>
                    <p>{dashDetail.totalDebit} Taka</p>
                  </div>
                </div>
                <div className="t-revenue t-card">
                  {" "}
                  <div className="t-img">
                    <img src="../taka2.png" alt="taka" />
                  </div>
                  <div className="t-info">
                    <h3>Total Revenue</h3>
                    <p>{dashDetail.totalCredit} Taka</p>
                  </div>
                </div>
                <div className="t-profit t-card">
                  {" "}
                  <div className="t-img">
                    <img src="../taka3.png" alt="taka" />
                  </div>
                  <div className="t-info">
                    <h3>Total Profit</h3>
                    <p>{dashDetail.totlProfit} Taka</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;
