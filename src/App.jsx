import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import QR_scan from "./QRscanner";
import QR_Gen from "./QRgenerator";

export default function Main() {
  const [value, setValue] = useState(0);

  return (
    <div>
     
      <div style={{ paddingBottom: "60px" }}>
        {value === 0 ? <QR_Gen /> : <QR_scan />}
      </div>

      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigationAction label="Generator" icon={<ArchitectureIcon />} />
        <BottomNavigationAction label="Scanner" icon={<QrCodeScannerIcon />} />
      </BottomNavigation>
    </div>
  );
}
