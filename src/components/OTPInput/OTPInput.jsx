import { useEffect, useRef } from "react";
import "./OTPInput.css";

const OTPInput = (props) => {
  const { onVerify } = props;

  const numRef1 = useRef(null);
  const numRef2 = useRef(null);
  const numRef3 = useRef(null);
  const numRef4 = useRef(null);

  useEffect(() => {
    numRef1.current.focus();
  }, []);

  const handleFocus = (event) => {
    const id = parseInt(event.target.id);
    if (event.target.value.length === 1) {
      if (id < 4) {
        if (id === 1) numRef2.current.focus();
        else if (id === 2) numRef3.current.focus();
        else if (id === 3) numRef4.current.focus();
      }
    } else if (event.target.value.length === 0) {
      if (id > 1) {
        if (id === 2) numRef1.current.focus();
        else if (id === 3) numRef2.current.focus();
        else if (id === 4) numRef3.current.focus();
      }
    }

    if (id === 4 && event.target.value.length === 1) {
      const completeOTP = `${numRef1.current.value}${numRef2.current.value}${numRef3.current.value}${numRef4.current.value}`;
      onVerify(completeOTP);
    }
  };

  return (
    <div className="otp-input-container">
      <input id="1" ref={numRef1} onKeyUp={handleFocus} maxLength={1} />
      <input id="2" ref={numRef2} onKeyUp={handleFocus} maxLength={1} />
      <input id="3" ref={numRef3} onKeyUp={handleFocus} maxLength={1} />
      <input id="4" ref={numRef4} onKeyUp={handleFocus} maxLength={1} />
    </div>
  );
};

export default OTPInput;
