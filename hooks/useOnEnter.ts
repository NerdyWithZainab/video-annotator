import { useEffect } from "react";

export default function useOnEnter(callback: (arg0: any) => void) {
  function onKeyUp(e: { key: string; preventDefault: () => void }) {
    if (e.key === "Enter") {
      e.preventDefault();
      callback(e);
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keyup", onKeyUp);
    };
  });
}
