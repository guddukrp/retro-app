import React, { useState } from "react";
// import {
//   CapacitorBarcodeScanner,
//   CapacitorBarcodeScannerTypeHint,
// } from "@capacitor/barcode-scanner";

const QrScanner: React.FC = () => {
  const [scanned, setScanned] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const startScan = async () => {
    try {
      setIsScanning(true);

      // const result = await CapacitorBarcodeScanner.scanBarcode({
      //   hint: CapacitorBarcodeScannerTypeHint.ALL, // QR + all barcodes
      // });

      // if (result.ScanResult) {
      //   setScanned(result.ScanResult);
      // } else {
      //   setScanned("No QR code detected.");
      // }
    } catch (err) {
      console.error("Scan failed:", err);
      setScanned("Error while scanning.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>

      <button
        onClick={startScan}
        disabled={isScanning}
        className={`px-6 py-3 rounded-lg text-white ${
          isScanning ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isScanning ? "Scanning..." : "Start Scan"}
      </button>

      {scanned && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg w-full max-w-md text-center">
          <p className="text-green-700 font-semibold">
            ✅ Scanned Result:
          </p>
          <p className="break-words text-gray-800">{scanned}</p>
        </div>
      )}
    </div>
  );
};

export default QrScanner;
