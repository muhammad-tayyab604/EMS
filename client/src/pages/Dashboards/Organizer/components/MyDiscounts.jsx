import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const MyDiscounts = ({ discounts, onDeleteCoupon }) => {
  const [error, setError] = useState("");
  const [delDiscounts, setDelDiscounts] = useState([]);

  const handleDeleteCoupon = async (couponId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8000/api/stripe/delete-coupon/${couponId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const storedDiscounts =
        JSON.parse(localStorage.getItem("discounts")) || [];
      const updatedDiscounts = storedDiscounts.filter(
        (discount) => discount.id !== couponId
      );
      localStorage.setItem("discounts", JSON.stringify(updatedDiscounts));

      // Update state to reflect the changes in discounts
      setDelDiscounts(updatedDiscounts);
      window.location = "/organizerdashboard/discount";
      toast.success("Discount Deleted");
    } catch (error) {
      setError(
        `Error deleting coupon: ${error.response?.data?.error || error.message}`
      );
    }
  };

  return (
    <div>
      {discounts.length === 0 ? (
        <p
          style={{
            fontSize: "28px",
            fontWeight: "bold",
          }}
          className="text-center text-secondary"
        >
          No discounts found for this organizer.
        </p>
      ) : (
        <>
          <table className="table">
            <thead className="thead-light bg-body-tertiary">
              <tr>
                <th scope="col">Discount Code</th>
                <th scope="col">Dicount OFF </th>
                <th scope="col">Maximum Redemptions</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((coupon) => (
                <tr key={coupon.id}>
                  <td>{coupon.id}</td>
                  {coupon.percent_off ? (
                    <td>{coupon.percent_off}% off</td>
                  ) : (
                    <td>RS. {coupon.amount_off}</td>
                  )}
                  <td>
                    (<b>{coupon.max_redemptions || "Unlimited"}</b>) Max
                    Redemptions
                  </td>
                  <td>
                    <button onClick={() => handleDeleteCoupon(coupon.id)}>
                      <FaTrashAlt color="red" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default MyDiscounts;
