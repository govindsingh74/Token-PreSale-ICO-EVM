import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Hero = ({
  setBuyModel,
  account,
  CONNECT_WALLET,
  setAccount,
  setLoader,
  detail,
  addtokenToMetaMask,
}) => {

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const connectWallet = async () => {
    setLoader(true);
    try {
      const address = await CONNECT_WALLET();
      setAccount(address);
      notifySuccess("Wallet Connected Successfully!");
    } catch (error) {
      notifyError("Failed to connect wallet");
    } finally {
      setLoader(false);
    }
  };

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const calculatePercentage = () => {
      const tokenSold = detail?.soldTokens ?? 0;
      const tokenTotalSupply = detail?.soldTokens + (Number(detail?.tokenBal) || 1);

      if (tokenTotalSupply === 0) {
        console.log("Token sale balance is zero, cannot calculate percentage");
      } else {
        const percentageNew = (tokenSold / tokenTotalSupply) * 100;
        setPercentage(percentageNew);
      }
    };

    const timer = setTimeout(calculatePercentage, 1000);

    return () => clearTimeout(timer);
  }, [detail]);

  const ADD_TOKEN_METAMASK = async () => {
    setLoader(true);
    try {
      const response = await addtokenToMetaMask();
      notifySuccess(response);
    } catch (error) {
      notifyError("Failed to add token to MetaMask");
    } finally {
      setLoader(false);
    }
  };

  return (
    <section className="hero hero__ico pos-rel">
      <div className="hero__bg" data-background="assets/img/bg/hero_bg.png" />

      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="hero__content">
              <h1 className="title mb-45">
                Participate in the <span>Ongoing ICO</span> sale
              </h1>

              <div className="btns">
                {account ? (
                  <a className="thm-btn" onClick={() => setBuyModel(true)}>
                    PURCHASE TOKEN
                  </a>
                ) : (
                  <a className="thm-btn" onClick={connectWallet}>
                    Connect Wallet
                  </a>
                )}

                <a className="thm-btn thm-btn__dark" onClick={ADD_TOKEN_METAMASK}>
                  Add Metamask
                </a>
              </div>

              <div className="hero__progress mt-50">
                <div className="progress-title ul_li_between">
                  <span>
                    <span>Raised -</span> {detail?.soldTokens} Tokens
                  </span>
                  <span>
                    <span>Total ICO -</span>{" "}
                    {detail?.soldTokens + Number(detail?.tokenBal)} {detail?.symbol}
                  </span>
                </div>

                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${percentage}%` }} // Ensure percentage is a valid number or string
                  />
                </div>
                <ul className="ul_li_between">
                  <li>Pre Sell</li>
                  <li>Soft Cap</li>
                  <li>Bonus</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="hero__explore-wrap text-center">
              <div className="hero__explore text-center">
                <div className="scroll-down" />
                <span>Explore Cause</span>
              </div>
              <div className="hero__countdown">
                <h6 className="text-center">ICO Will Start In...</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero__shape">
        <div className="shape shape--1">
          <img src="assets/img/shape/h_shape.png" alt="" />
        </div>
        <div className="shape shape--2">
          <img src="assets/img/shape/h_shape2.png" alt="" />
        </div>
        <div className="shape shape--3">
          <img src="assets/img/shape/h_shape3.png" alt="" />
        </div>
      </div>

      <div className="hero__coin">
        <div className="coin coin--1">
          <img src="assets/img/icon/coin1.png" alt="" />
        </div>
        <div className="coin coin--2">
          <img src="assets/img/icon/coin2.png" alt="" />
        </div>
        <div className="coin coin--3">
          <img src="assets/img/icon/coin3.png" alt="" />
        </div>
        <div className="coin coin--4">
          <img src="assets/img/icon/coin4.png" alt="" />
        </div>
        <div className="coin coin--5">
          <img src="assets/img/icon/coin5.png" alt="" />
        </div>
        <div className="coin coin--6">
          <img src="assets/img/icon/coin6.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
