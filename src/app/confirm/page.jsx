"use client";
import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import QRCode from "qrcode"; // Import the qrcode library
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function Page() {
  const { data, charge, sendPay, consult,setData } = useApp();
  const sats = parseInt(data.amount) * 1000;
  const [half, setHalf] = useState(sats / 2);
  const navigate = useRouter();
  const [bolt11, setBolt11] = useState("");
  const [estado, setEstado] = useState("pending");
  const [qrCodeData, setQRCodeData] = useState("");
  const [id, setID] = useState("");

  useEffect(() => {
    const getQR = async () => {
      if (data.amount == "") {
        toast.error("You must fill out the form fields first");
        return navigate.push("/");
      } else {
        const res = await charge(sats.toString());
        setBolt11(res.data.invoice.request);
        setID(res.data.id);
      }
    };
    getQR();
  }, []);

  useEffect(() => {
    const getID = async () => {
      try {
        if (id) {
          const res = await consult(id);
          setEstado(res.data.status); 
        } 
      } catch (error) {
        console.error(error);
      }
    };
    setInterval(getID, 3000);
  },[id]);

  useEffect(() => {
    if (bolt11) {
      QRCode.toDataURL(bolt11, (error, data) => {
        if (error) {
          console.error("Error generating QR code:", error);
        } else {
          setQRCodeData(data);
        }
      });
    }
  }, [bolt11]);

  useEffect(() => {
    const makePay = async () => {
      try {
        if (estado == "completed") {
          const pay1 = await sendPay(half.toString(), data.address1);
          const pay2 = await sendPay(half.toString(), data.address2);

          if(pay1.success ===  false || pay2.success == false)
          {
            return navigate.push("/return")
          }

          toast.success(
            `Payment sent to ${data.address1} for ${half / 1000} satoshis.`
          );
          
          toast.success(
            `Payment sent to ${data.address2} for ${half / 1000} satoshis.`
          );
          setData({
            amount: "",
            address1: "",
            address2: "",
          })
          navigate.push("/");
        }
      } catch (error) {
        console.error(error);
         
      }
    };
    makePay();
  }, [estado]); // This effect will only run once on initial render

  return (
    <>
    <div>
      <h1 className="text-center text-4xl font-bold mt-12 mb-6 text-white">
        Pay Charge to split payment
      </h1>
      <div className="flex flex-col align-center justify-center">
        {estado !== "pending" ? (
          <h1 className="text-center text-4xl font-bold mt-12 mb-6 text-green-900 border-x-gray-50">
            Scan completed
          </h1>
        ) : (
          <img src={qrCodeData} className="max-h-min max-w-sm my-0 mx-auto" />
        )}
      </div>
      <div className="flex justify-center align-middle mt-10">
        <button
          onClick={() => {
            navigator.clipboard.writeText(bolt11);
          }}
          className="bg-blue-700 rounded-md shadow-md py-2 px-4 cursor-pointer hover:bg-blue-900  text-white font-bold mx-2"
          hidden={estado === "completed"? true :false }
        >
          Copy
        </button>
        <button
          className="bg-blue-700 rounded-md shadow-md py-2 px-4 cursor-pointer hover:bg-blue-900  text-white font-bold mx-2"
          onClick={() => {
            navigate.push("/");
          }}
        >
          Return
        </button>
      </div>
      </div>
    </>
  );
}

export default Page;
