import QrScanner from "qr-scanner";
import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Button,
  Typography,
  Box,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import StopIcon from "@mui/icons-material/Stop";

export default function QR_scan() {
  const [status, setStatus] = useState(false);
  const [data, setData] = useState(null);
  const scannerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    QrScanner.hasCamera().catch(() => {
      alert("Your Device Has No Camera");
    });

    if (videoRef.current && !scannerRef.current) {
      const scanner = new QrScanner(
        videoRef.current,
        (result) => {
          const scanValue = result.data || result;
          try {
            const parsed = JSON.parse(scanValue);
            setData(parsed);
          } catch (e) {
            setData({ Name: scanValue, Phone: "", Email: "", Website: "" });
          }
          setStatus(false);
          scanner.stop();
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        },
      );
      scannerRef.current = scanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.destroy();
        scannerRef.current = null;
      }
    };
  }, []);

  const toggleScanner = async () => {
    if (!scannerRef.current) return;

    if (status) {
      scannerRef.current.stop();
      setStatus(false);
    } else {
      try {
        await scannerRef.current.start();
        setStatus(true);
      } catch (err) {
        alert(
          "Failed to start the camera. Please check permissions and ensure you are using HTTPS or localhost.",
        );
        setStatus(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f2f5] p-5 box-border">
      <div className="w-full max-w-[450px] p-6 rounded-2xl bg-white flex flex-col items-center shadow-md">
        <Typography variant="h5" className="font-bold mb-5 text-[#333333]">
          QR Code Scanner
        </Typography>

        <Button
          variant="contained"
          color={status ? "error" : "primary"}
          startIcon={status ? <StopIcon /> : <PhotoCameraIcon />}
          onClick={toggleScanner}
          className="w-full py-2.5 text-base rounded-lg normal-case mb-5 shadow-none"
        >
          {status ? "Stop Scanner" : "Start Scanner"}
        </Button>

        {/* Video Viewport Container */}
        <div
          className={`w-full rounded-xl overflow-hidden bg-black mb-5 ${
            status ? "block" : "hidden"
          }`}
        >
          <video
            ref={videoRef}
            id="camera"
            className="w-full h-auto block"
          ></video>
        </div>

        {data && (
          <Card
            variant="outlined"
            className="w-full rounded-xl mt-2.5 overflow-hidden border border-[#e0e0e0] shadow-none"
          >
            {data.Website && (
              <CardMedia
                component="iframe"
                height="140"
                src={data.Website}
                alt={`${data.Name}'s website preview`}
                className="border-none"
              />
            )}
            <CardContent>
              <Stack spacing={2}>
                <Typography
                  variant="h4"
                  className="text-gray-900 text-xl font-bold"
                >
                  {data.Name || "Unknown Name"}
                </Typography>
                <Stack direction="column" spacing={1}>
                  <Typography variant="body1" className="text-gray-600">
                    📞 {data.Phone || "No Phone Provided"}
                  </Typography>
                  <Typography variant="body1" className="text-gray-600">
                    ✉️ {data.Email || "No Email Provided"}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
