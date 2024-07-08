import React from "react";
import { IoRocket } from "react-icons/io5";
import { ImTicket } from "react-icons/im";
import { TbBrandBooking } from "react-icons/tb";
import { LineChart } from "@mui/x-charts/LineChart";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { BarChart } from "@mui/x-charts/BarChart";
import Cards from "../../Cards";

const ADashBoard = () => {
  return (
    <>
      <div className="d-flex gap-4 justify-content-between flex-wrap mt-5">
        <Cards
          title={"Total Events"}
          icon={<IoRocket />}
          subTitle={"Completed Events"}
          bgColor={"bg-c-green"}
        />
        <Cards
          title={"Total Tickets"}
          icon={<ImTicket />}
          subTitle={"Electornic Tickets"}
          bgColor={"bg-c-blue"}
        />
        <Cards
          title={"Booked Events"}
          icon={<TbBrandBooking />}
          subTitle={"Cancelled Events"}
          bgColor={"bg-c-yellow"}
        />
      </div>
      <div className="d-flex flex-wrap gap-5 bg-body-tertiary">
        <div className="">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
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
            ]}
            width={500}
            height={300}
          />
        </div>
      </div>
    </>
  );
};

export default ADashBoard;
