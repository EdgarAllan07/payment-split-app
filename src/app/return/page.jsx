"use client";
import { useApp } from "@/context/AppContext";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";

function PageReturn() {
  const { data, getWithdrawal, postWithdrawal, setData } = useApp();
  const sats = parseInt(data.amount) * 1000;
  const [id, setID] = useState("");
  const [bolt11, setBolt11] = useState("");
  const [status, setStatus] = useState("pending");
  const [qrCodeData, setQRCodeData] = useState("");
  const navigate = useRouter();

  useEffect(() => {
    const postWD = async () => {
      if (data.amount == "" || data.amount == undefined) {
        toast.error("You must fill out the form fields first");
        return navigate.push("/");
      }
      const res = await postWithdrawal(sats.toString());
      setBolt11(res.data.invoice.request);
      setID(res.data.id);
    };
    postWD();
  }, []);

  useEffect(() => {
    const getWD = async () => {
      if (id !== "") {
        const res = await getWithdrawal(id);
        
        setStatus(res.data.status);
      }
    };
    setInterval(getWD, 3000);
  }, [id]);

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
    if (status === "completed") {
      setData({
        amount: "",
        address1: "",
        address2: "",
      });
      toast.success("All your sats have returned to you");
      return navigate.push("/");
    }
  }, [status]);

  return (
    <div className="container mx-auto max-w-2xl">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-center text-2xl">
           Sorry, it seems that some of the Lightning Network emails you
          entered are incorrect. If you wish to recover your satoshis, you can
          scan or copy the following QR code
        </h1>
        <div className="flex flex-col align-center justify-center mt-5">
          {status !== "pending" ? (
            <h1 className="text-center text-4xl font-bold mt-12 mb-6 text-green-900 border-x-gray-50">
              Succesed
            </h1>
          ) : (
            <img src={qrCodeData} className="max-h-min max-w-sm my-0 mx-auto" />
          )}
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(bolt11);
          }}
          className="bg-blue-700 rounded-md shadow-md py-2 px-4 cursor-pointer mt-3 hover:bg-blue-900  text-white font-bold mx-2"
          hidden={status === "completed" ? true : false}
        >
          Copy
        </button>
      </div>
    </div>
  );
}

export default PageReturn;
