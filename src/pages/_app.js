import { useState } from "react";
import "../styles/globals.css";
import notaContext from "./notacontext";

function MyApp({ Component, pageProps }) {
  const [nota, setNota] = useState({ _id: "", content: "", created_at: "" });
  return (
    <notaContext.Provider value={{ nota, setNota }}>
      <Component {...pageProps} />
    </notaContext.Provider>
  );
}

export default MyApp;
