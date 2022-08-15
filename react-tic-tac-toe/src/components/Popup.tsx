import React, { ReactNode } from "react";
import ReactDom from "react-dom";

interface PopupProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export default function Popup({ open, onClose, children }: PopupProps) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 z-30"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-16 rounded-lg z-40">
        <button type="button" className="absolute top-4 right-4" onClick={onClose}>
          Close
        </button>
        <p className="text-2xl break-words">{children}</p>
      </div>
    </>,
    document.getElementById("portal")
  );
}
