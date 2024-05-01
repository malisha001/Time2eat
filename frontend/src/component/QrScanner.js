import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState('');

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      {scanResult && (
        <div>
          <p>Scan Result: {scanResult}</p>
          {/* Depending on the scan result, you can handle the logic here */}
        </div>
      )}
    </div>
  );
};

export default QRScanner;
