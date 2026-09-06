import QRCode from "qrcode";
import { useState, useEffect } from "react";
export default function QR_Gen() {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [weblink, setWeblink] = useState("");

  useEffect(() => {
    if (data) {
      const holder = document.getElementById("holder");
      QRCode.toCanvas(
        holder,
        data,
        { width: 200, margin: 2 },
        function (error) {
          if (error) {
            alert("Facing some problems while creating QR: " + error.message);
          }
        },
      );
    }
  }, [data]);

  const handleGenerate = () => {
    const userInfo = JSON.stringify({
      Name: name,
      Phone: phone,
      Email: email,
      Website: weblink,
    });
    setData(userInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f4f7f6] font-sans p-4">
      <div className="bg-white p-7 rounded-xl shadow-lg w-full max-w-[400px] box-border">
        <h2 className="m-0 mb-5 text-[22px] text-[#333333] text-center font-semibold">
          QR Code Generator
        </h2>
        <div className="flex flex-col gap-3 mb-5">
          <input
            className="p-3 rounded-md border border-[#ccc] text-sm outline-none transition-colors duration-200 focus:border-[#007BFF]"
            value={name}
            placeholder="Enter Your Full Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="p-3 rounded-md border border-[#ccc] text-sm outline-none transition-colors duration-200 focus:border-[#007BFF]"
            value={phone}
            placeholder="Enter Your Number with Country Code"
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="p-3 rounded-md border border-[#ccc] text-sm outline-none transition-colors duration-200 focus:border-[#007BFF]"
            value={email}
            placeholder="Please Enter Your Mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-3 rounded-md border border-[#ccc] text-sm outline-none transition-colors duration-200 focus:border-[#007BFF]"
            value={weblink}
            placeholder="Please Enter Your Website"
            onChange={(e) => setWeblink(e.target.value)}
          />
        </div>
        <button
          className="w-full p-3 bg-[#007BFF] text-white border-none rounded-md text-base font-bold cursor-pointer transition-colors duration-200 hover:bg-[#0056b3]"
          onClick={handleGenerate}
        >
          Generate QR
        </button>
        <div className="flex justify-center mt-5">
          <canvas id="holder" className="rounded-lg shadow-sm"></canvas>
        </div>
      </div>
    </div>
  );
}
