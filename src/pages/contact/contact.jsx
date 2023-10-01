import React, { useState } from "react";
import "./contact.css";

const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the contact form data to your server here
  };

  return (
    <div className="landing_page">
      <div className="responsive-container-block big-container">
        <img
          className="bg-img"
          id="iq5bf"
          src="https://img5.goodfon.com/wallpaper/nbig/6/e6/pchioly-ulei-priroda.jpg"
          alt="bgImg"
        />
        <div className="responsive-container-block container">
          <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12 left-one">
            <div className="content-box">
              <p className="text-blk section-head">
                killerBee
               
              </p>
              <p className="description-contact">
                  {" "}
                  If you have any questions or inquiries, please feel free to
                  reach out to Killer Bee Company
                </p>
              <div className="icons-container">
                <a
                  className="share-icon"
                  href="https://api.whatsapp.com/send?text=Your%20Message%20Here%20https://your-website.com"
                >
                  <img
                    className="img"
                    src="https://freepngimg.com/download/whatsapp/77079-logo-whatsapp-computer-icons-free-hq-image.png"
                    alt="WhatsApp"
                  />
                </a>
                <a href className="share-icon">
                  <img
                    className="img"
                    src="https://th.bing.com/th/id/R.84669eb4301059aa602096c83a13e15f?rik=FkFOcs3CThcCJQ&pid=ImgRaw&r=0"
                    alt=""
                  />
                </a>
                <a href className="share-icon">
                  <img
                    className="img"
                    src="https://th.bing.com/th/id/R.5e2aed4afbb877d185f8902e09124806?rik=UniOcSct6MQozg&pid=ImgRaw&r=0"
                    alt=""
                  />
                </a>
                <a href className="share-icon">
                  <img
                    className="img"
                    src="https://th.bing.com/th/id/R.24223c92569a035c382c2b658e9789a0?rik=SsJgrmXtdiNaEw&pid=ImgRaw&r=0"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div
            className="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-6 right-one"
            id="i1zj"
          >
            <form className="form-box" onSubmit={handleSubmit}>
              <div className="container-block form-wrapper">
                <p className="text-blk contactus-subhead">
                  We will get back to you in 24 hours
                </p>
                <div className="responsive-container-block">
                  <div
                    className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                    id="i10mt-7"
                  >
                    <input
                      className="input"
                      id="ijowk-7"
                      name="FirstName"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div
                    className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                    id="i1ro7"
                  >
                    <input
                      className="input"
                      id="indfi-5"
                      name="Last Name"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div
                    className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-6 wk-ipadp-6 emial"
                    id="ityct"
                  >
                    <input
                      className="input"
                      id="ipmgh-7"
                      name="Email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                    <input
                      className="input"
                      id="imgis-6"
                      name="PhoneNumber"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div
                    className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                    id="i634i-7"
                  >
                    <textarea
                      aria-placeholder="Type message here"
                      className="textinput"
                      id="i5vyy-7"
                      placeholder="Type message here"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
                <button className="submit-btn">Get quote</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
