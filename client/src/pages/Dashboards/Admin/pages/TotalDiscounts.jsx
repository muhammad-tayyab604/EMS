import axios from "axios";
import React, { useEffect, useState } from "react";

const TotalDiscounts = () => {
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllCoupons = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/stripe/all-coupons"
        );
        setCoupons(response.data.data); // Assuming the response structure from Stripe is { data: [array of coupons] }
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };
    getAllCoupons();
  }, []);

  return (
    <div>
      <h1>Total Discounts</h1>

      {error && <p>Error fetching coupons: {error}</p>}
      {coupons.length === 0 ? (
        <p>No discounts found.</p>
      ) : (
        <table className="table">
          <thead className="thead-light bg-body-tertiary">
            <tr>
              <th scope="col">Coupon Code</th>
              <th scope="col">Discount OFF</th>
              <th scope="col">Maximum Users Can Redeem</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id}>
                <td>{coupon.id}</td>
                {coupon.percent_off ? (
                  <td>Percent Off: {coupon.percent_off}%</td>
                ) : (
                  <td>Amount Off: {coupon.amount_off}</td>
                )}
                <td>{coupon.max_redemptions || "Unlimited"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TotalDiscounts;
