import React from "react";

const Cards = ({ title, icon, subTitle, bgColor, count }) => {
  return (
    <div class="col-md-4 col-xl-3">
      <div class={`card ${bgColor} order-card`}>
        <div class="card-block">
          <h6 class="mb-20">{title}</h6>
          <h2 class="text-right d-flex justify-content-between">
            <i class="">{icon}</i>
            <span>{count}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Cards;
