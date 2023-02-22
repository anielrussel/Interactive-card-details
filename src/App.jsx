import "./App.css";
import bgDesktop from "./assets/images/bg-main-desktop.png";
import bgMobile from "./assets/images/bg-main-mobile.png";
import front from "./assets/images/bg-card-front.png";
import back from "./assets/images/bg-card-back.png";
import logo from "./assets/images/card-logo.svg";
import submit from "./assets/images/icon-complete.svg";
import { useState } from "react";


function App() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    cardMonth: "",
    cardYear: "",
    cardCvc: "",
  });

  //check if there is an error
  const [errors, setErrors] = useState({
    cardName: "",
    cardNumber: "",
    cardMonth: "",
    cardYear: "",
    cardCvc: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
  
    if (
      (name === "cardName" && value.length <= 50) ||
      (name === "cardNumber" && value.length <= 16) ||
      (((name === "cardMonth" && (value >= 0 && value <= 12) || name === "cardYear") && value.length <= 2)) ||
      (name === "cardCvc" && value.length <= 3)
    ) {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          [name]: value,
        };
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Check if the form data is valid
    const newErrors = {};
    if (formData.cardName.trim() === "") {
      newErrors.cardName = "Name is required";
    }
    if (formData.cardNumber.trim() === "") {
      newErrors.cardNumber = "Can't be blank";
    }
    if ((formData.cardMonth.trim() === "") || (formData.cardYear.trim() === ""))  {
      newErrors.cardMonth = "Can't be blank";
    }
    if (formData.cardCvc.trim() === "") {
      newErrors.cardCvc = "Can't be blank";
    }
    setErrors(newErrors);

    // If there are no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      console.log(formData);
      // TODO: Submit the form data to the server
    }
  }

  //back to form after clicking continue
  const handleContinue = () => {
    setSubmitted(false);
    setFormData({
      cardName: '',
      cardNumber: '',
      cardMonth: '',
      cardYear: '',
      cardCvc: '',
    });
  };

  return (
    <div className="App">
      <img src={bgDesktop} alt="" className="bgDesktop" />
      <img src={bgMobile} alt="" className="bgMobile" />
      <div className="app-container">
        <div className="app-container-cards">
          <div className="container-cards-front">
            <div className="cards-front-details">
              <img src={logo} alt="" className="logo" />
              <h1>
                {formData.cardNumber === ""
                  ? "0000 0000 0000 0000"
                  : formData.cardNumber
                      .substring(0, 16)
                      .match(/\d{1,4}/g)
                      .join(" ")}
              </h1>
              <div className="cards-front-details-name">
                <p>
                  {formData.cardName === ""
                    ? "Jane Appleseed"
                    : formData.cardName}
                </p>
                <div className="time">
                  <p>
                    {formData.cardMonth === ""
                      ? "00/"
                      : formData.cardMonth + "/"}
                    {formData.cardYear === "" ? "00" : formData.cardYear}
                  </p>
                </div>
              </div>
            </div>
            <img src={front} alt="" className="card-front" />
          </div>
          <div className="container-cards-back">
            <p className="back-number">
              {formData.cardCvc === "" ? "000" : formData.cardCvc}
            </p>
            <img src={back} alt="" className="card-back" />
          </div>
        </div>
        <div className="app-container-form">
          {submitted ? (
            <div className="form-submitted">
              <img src={submit} alt="" />
              <h1>THANK YOU!</h1>
              <p>We've added your card details</p>
              <button onClick={handleContinue}>Continue</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                CARDHOLDER'S NAME
                <input
                  type="text"
                  placeholder="e.g. Jane Applessed"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                />
                {errors.cardName && <div style={{ color: 'hsl(0, 100%, 66%)', fontSize: 14}}>{errors.cardName}</div>}
              </label>
              <label>
                CARD NUMBER
                <input
                  type="number"
                  placeholder="e.g. 12334 5678 9123 0000"
                  maxLength={16}
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
                {errors.cardNumber && <div style={{ color: 'hsl(0, 100%, 66%)', fontSize: 14}}>{errors.cardNumber}</div>}
              </label>
              <div className="app-container-form-expiry">
                <label>
                  EXP. DATE (MM/YY)
                  <input
                    type="number"
                    placeholder="MM"
                    className="month"
                    min={0}
                    max={12}
                    name="cardMonth"
                    value={formData.cardMonth}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    placeholder="YY"
                    className="year"
                    name="cardYear"
                    value={formData.cardYear}
                    onChange={handleChange}
                  />
                  {errors.cardMonth && <div style={{ color: 'hsl(0, 100%, 66%)', fontSize: 14}}>{errors.cardMonth}</div>}
                </label>

                <label>
                  CVC
                  <input
                    type="number"
                    placeholder="e.g. 123"
                    name="cardCvc"
                    value={formData.cardCvc}
                    onChange={handleChange}
                  />
                  {errors.cardCvc && <div style={{ color: 'hsl(0, 100%, 66%)', fontSize: 14}}>{errors.cardCvc}</div>}
                </label>
              </div>
              <button>Confirm</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
