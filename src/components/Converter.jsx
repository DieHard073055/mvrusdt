import React, { useState } from "react";

const Converter = () => {
  const [mvr, setMvr] = useState("");
  const [usdt, setUsdt] = useState("");
  const [mvrToUsdRate, setMvrToUsdRate] = useState(20); // Default rate: 20 MVR to 1 USD

  const usdToUsdtRate = 1 / 1.1; // 1 USDT = 1.1 USD

  const handleMvrChange = (e) => {
    const mvrAmount = parseFloat(e.target.value) || 0;
    setMvr(mvrAmount);

    // Calculate USD from MVR, then calculate USDT from USD
    const usdAmount = mvrAmount / (mvrToUsdRate || 20); // Use default rate if empty
    const usdtAmount = usdAmount * usdToUsdtRate;
    setUsdt(usdtAmount.toFixed(2));
  };

  const handleUsdtChange = (e) => {
    const usdtAmount = parseFloat(e.target.value) || 0;
    setUsdt(usdtAmount);

    // Calculate USD from USDT, then calculate MVR from USD
    const usdAmount = usdtAmount / usdToUsdtRate;
    const mvrAmount = usdAmount * (mvrToUsdRate || 20); // Use default rate if empty
    setMvr(mvrAmount.toFixed(2));
  };

  const handleRateChange = (e) => {
    const rate = parseFloat(e.target.value) || 0;
    setMvrToUsdRate(rate > 0 ? rate : 20); // Default to 20 if input is empty or invalid

    // Recalculate values based on the new rate
    if (mvr) {
      const usdAmount = parseFloat(mvr) / (rate || 20);
      const usdtAmount = usdAmount * usdToUsdtRate;
      setUsdt(usdtAmount.toFixed(2));
    } else if (usdt) {
      const usdAmount = parseFloat(usdt) / usdToUsdtRate;
      const mvrAmount = usdAmount * (rate || 20);
      setMvr(mvrAmount.toFixed(2));
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h1>MVR to USDT Converter</h1>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px", textAlign: "left" }}>MVR Amount</label>
        <input
          type="number"
          placeholder="Enter MVR amount"
          value={mvr}
          onChange={handleMvrChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <label style={{ display: "block", marginBottom: "5px", textAlign: "left" }}>MVR to USD Rate</label>
        <input
          type="number"
          placeholder="Enter MVR to USD rate"
          value={mvrToUsdRate}
          onChange={handleRateChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <label style={{ display: "block", marginBottom: "5px", textAlign: "left" }}>USDT Amount</label>
        <input
          type="number"
          placeholder="Enter USDT amount"
          value={usdt}
          onChange={handleUsdtChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <h2>Results:</h2>
      <p>MVR Amount: {mvr || "0"}</p>
      <p>USDT Amount: {usdt || "0.00"}</p>
    </div>
  );
};

export default Converter;

