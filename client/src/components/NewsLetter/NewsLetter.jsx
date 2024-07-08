import React from "react";

const NewsLetter = () => {
  return (
    <section className="newsletter mb-5">
      <div className="container mt-4 bg-info p-4 text-light rounded">
        <div className="row">
          <div className="col-sm-12">
            <div className="content">
              <h2 className="text-center">SUBSCRIBE TO OUR NEWSLETTER</h2>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <span className="input-group-btn">
                  <button className="btn btn-warning" type="submit">
                    Subscribe Now
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
