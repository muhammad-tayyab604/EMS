import React, { useEffect } from "react";
import { IoRocket } from "react-icons/io5";
import { ImTicket } from "react-icons/im";
import { TbBrandBooking } from "react-icons/tb";
import { LineChart } from "@mui/x-charts/LineChart";
import { VscFeedback } from "react-icons/vsc";
import { BarChart } from "@mui/x-charts/BarChart";
import Cards from "../../Cards";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganizerEvents } from "../../../../slices/eventSlice";

const DashBoard = () => {
  const dispatch = useDispatch();
  const { events, status, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchOrganizerEvents());
  }, [dispatch]);

  // Filter events specifically for organizers
  const organizerEvents = events.filter((event) => event.organizer); // Assuming events have an organizer field

  // Count total number of organizer events
  const totalEvents = organizerEvents.length;

  // Filter paid events specifically for organizers
  const paidEvents = organizerEvents.filter((event) => event.status === "paid");

  // Count booked events specifically for organizers
  const bookedEventsCount = paidEvents.length;

  // Count the total number of feedbacks for organizer events
  const totalFeedbacks = paidEvents.reduce(
    (acc, event) => acc + event.feedbacks.length,
    0
  );

  // Calculate total discounts for organizer events
  const totalDiscounts = paidEvents.reduce(
    (acc, event) => acc + event.discountAmount,
    0
  ); // Assuming events have a discountAmount field

  return (
    <>
      <div className="d-flex gap-5 justify-content-between flex-wrap mt-5">
        <Cards
          title={"Total Events"}
          icon={<IoRocket />}
          bgColor={"bg-c-green"}
          count={totalEvents}
        />
        <Cards
          title={"Booked Events"}
          icon={<TbBrandBooking />}
          subTitle={"Cancelled Events"}
          bgColor={"bg-c-yellow"}
          count={bookedEventsCount}
        />
        <Cards
          title={"Total Feedbacks"}
          icon={<VscFeedback />}
          subTitle={"Reviewed Feedback"}
          bgColor={"bg-c-pink"}
          count={totalFeedbacks}
        />
        <Cards
          title={"Total Discount"}
          icon={<ImTicket />}
          subTitle={"Total Discount Amount"}
          bgColor={"bg-c-blue"}
          count={totalDiscounts}
        />
      </div>
      <div className="d-flex flex-wrap gap-5 bg-body-tertiary">
        <div className="">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 1.5, 5],
              },
            ]}
            width={500}
            height={300}
          />
        </div>
        <div className="">
          <BarChart
            xAxis={[
              { scaleType: "band", data: ["group A", "group B", "group C"] },
            ]}
            series={[
              { data: [4, 3, 5] },
              { data: [1, 6, 3] },
              { data: [2, 5, 6] },
              { data: [2, 5, 6] },
            ]}
            width={500}
            height={300}
          />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
