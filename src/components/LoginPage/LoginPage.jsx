import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./LoginPage.css";
import OTPInput from "../OTPInput/OTPInput";

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const mobileNumberRef = useRef(null);
  const otpNumberRef = useRef(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const { fetchUserDetails } = useContext(UserContext);

  useEffect(() => {
    mobileNumberRef.current.focus();
  }, []);

  const handleLogin = () => {
    const mobileNumber = mobileNumberRef.current.value;
    const isValidMobileNumber =
      mobileNumber.length === 10 && mobileNumber[0] !== "0";

    if (!isValidMobileNumber) {
      alert(
        "Please enter a valid 10-digit mobile number that does not start with 0."
      );
      return;
    }

    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    otpNumberRef.current.value = generatedOtp;
    setOtpValue(generatedOtp);
    setOtpSent(true);
    alert(
      `OTP sent to mobile ${mobileNumberRef.current.value}: ${generatedOtp}`
    );
  };

  const compareOTP = (otpInput) => {
    if (otpInput === otpValue) {
      setIsLoggedIn(true);
      fetchUserDetails(3);
      localStorage.setItem("user", JSON.stringify(3));
      alert("Login success...");
      navigate("/products");
    } else {
      alert("Invalid OTP...");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <input
          ref={mobileNumberRef}
          type="number"
          placeholder="Enter mobile no."
          className="login-input"
        />
        <input ref={otpNumberRef} hidden />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>

        {otpSent && (
          <div>
            <div className="otp-display">
              OTP sent to your mobile: <strong>{otpValue}</strong>
            </div>
            <OTPInput onVerify={compareOTP} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
