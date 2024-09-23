import React from "react";

const Token = () => {
  return (
    <section className="token pt-125">
      <div className="container">
        <div className="row align-items-center mt-none-30">
          <div className="col-lg-5 mt-30">
            <div className="token__content wow fedInLeft">
              <div className="sec-title mb-20">
                <h5 className="sec-title__subtitle">Tokenomics</h5>
                <h2 className="sec-title__title">WoofiInu Token Allocation</h2>
              </div>
              <ul className="nav nav-tabs token__tab" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button 
                    className="nav-link active" 
                    id="home-tab" 
                    data-bs-toggle="tab" 
                    type="button"
                    data-bs-target="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Funding Allocation
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button 
                    className="nav-link" 
                    id="profile-tab" 
                    data-bs-toggle="tab" 
                    type="button"
                    data-bs-target="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="true"
                  >
                    Token Allocation
                  </button>
                </li>
              </ul>
              <div className="token__info mt-40">
                <h4 className="">
                  1ETH = 1,000,000$WOOFI
                </h4>
                <p>
                  Georgeis good for crypto Georgeis good for crypto Georgeis good for crypto 
                  Georgeis good for crypto Georgeis good for crypto Georgeis good for crypto 
                  Georgeis good for crypto Georgeis good for crypto Georgeis good for crypto 
                  Georgeis good for crypto Georgeis good for crypto Georgeis good for crypto   
                </p>

                <div  className="token-btn mt-40">
                  <a href="#" className="thm-btn">Buy NOW</a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7 mt-30">
            <div className="tab-content wow fadeInRight" data-wow-delay="100ms" id="myTabContent">
              <div 
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-aria-labelledby="home-tab"
              >
                <div className="token__image">
                  <img src="assets/img/token/token_chart.png" alt="" />
                </div>
              </div>
              <div 
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-aria-labelledby="profile-tab"
              >
                <div className="token__image">
                  <img src="assets/img/token/token_chart2.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Token;
