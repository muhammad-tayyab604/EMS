import React, { useEffect, useState } from "react";
import axios from "axios";
import MyDiscounts from "../components/MyDiscounts";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Discounts = () => {
  const [discountType, setDiscountType] = useState("percent_off");
  const [percentOff, setPercentOff] = useState("");
  const [amountOff, setAmountOff] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [duration, setDuration] = useState("once");
  const [maxRedemptions, setMaxRedemptions] = useState("");
  const [message, setMessage] = useState("");
  const [discounts, setDiscounts] = useState([]);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch discounts from localStorage on component mount
    const storedDiscounts = JSON.parse(localStorage.getItem("discounts")) || [];
    setDiscounts(storedDiscounts);
  }, []);

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      const couponData = {
        duration,
        max_redemptions: maxRedemptions || null,
      };

      if (discountType === "percent_off") {
        couponData.percent_off = percentOff;
      } else {
        couponData.amount_off = amountOff;
        couponData.currency = currency;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:8000/api/stripe/create-coupon",
          couponData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Store the created coupon in localStorage
        const { coupon } = response.data;
        const storedDiscounts =
          JSON.parse(localStorage.getItem("discounts")) || [];
        localStorage.setItem(
          "discounts",
          JSON.stringify([...storedDiscounts, coupon])
        );

        setMessage(`Coupon created: ${coupon.id}`);
        setDiscounts([...storedDiscounts, coupon]);
        setLoading(false);
        toast.success("Discount Created");
      } catch (error) {
        setMessage(`Error: ${error.response?.data?.error || error.message}`);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h1>Create Coupon</h1>
      <Form noValidate validated={validated} onSubmit={handleCreateCoupon}>
        <Form.Group className="mb-3">
          <Form.Label>Discount Type:</Form.Label>
          <Form.Select
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
          >
            <option value="percent_off">Percentage</option>
            <option value="amount_off">Amount</option>
          </Form.Select>
        </Form.Group>
        {discountType === "percent_off" ? (
          <Form.Group className="mb-3">
            <Form.Label>Percent Off: </Form.Label>
            <Form.Control
              type="number"
              value={percentOff}
              onChange={(e) => setPercentOff(e.target.value)}
              placeholder="e.g, 25%"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide percentage off value
            </Form.Control.Feedback>
          </Form.Group>
        ) : (
          <Form.Group className="mb-3">
            <Form.Label>Amount Off:</Form.Label>
            <Form.Control
              type="number"
              value={amountOff}
              onChange={(e) => setAmountOff(e.target.value)}
              placeholder="e.g, 1200"
              required
            />
            <Form.Label>Currency:</Form.Label>
            <Form.Control
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide an amount that would be off
            </Form.Control.Feedback>
          </Form.Group>
        )}
        <Form.Group className="mb-3">
          <Form.Label>Duration:</Form.Label>
          <Form.Select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          >
            <option value="once">Once</option>
            <option value="forever">Forever</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Max Redemptions:</Form.Label>
          <Form.Control
            type="number"
            value={maxRedemptions}
            onChange={(e) => setMaxRedemptions(e.target.value)}
            placeholder="e.g, 10"
            required
            id="redemption"
          />
          <Form.Text id="redemption" muted>
            Please write that how much users can redeem this discount
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Please provide that how much users can redeem this discount
          </Form.Control.Feedback>
        </Form.Group>
        {loading ? (
          <Button variant="info" disabled type="submit">
            Loading...
          </Button>
        ) : (
          <>
            <Button variant="info" type="submit">
              Create Coupon
            </Button>
          </>
        )}
      </Form>
      {message && <p className="text-success mt-2">{message}</p>}

      <hr />
      <h1>Existing Coupons</h1>
      <MyDiscounts discounts={discounts} />
    </div>
  );
};

export default Discounts;
