import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import type { QRCodeProps } from "@/types/card";

export const QRCode = ({ address }: QRCodeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (!ref.current) return;
      const { width, height } = ref.current.getBoundingClientRect();
      setSize(Math.min(width, height));
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (!ref.current || !size) return;

    const qrCode = new QRCodeStyling({
      type: "svg",
      width: size,
      height: size,
      data: address,
      margin: 0,
      dotsOptions: {
        type: "dots",
        color: "#000000",
      },
      cornersSquareOptions: {
        type: "dot",
      },
      cornersDotOptions: {
        type: "dot",
      },
    });

    qrCode.append(ref.current);

    return () => {
      if (ref.current) {
        ref.current.innerHTML = "";
      }
    };
  }, [address, size]);

  return <div ref={ref} className="w-full h-full" />;
};