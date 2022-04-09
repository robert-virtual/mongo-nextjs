import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import url from "../lib/contantes";
import styles from "../styles/Home.module.css";
import notaContext from "./notacontext";

export default function Nota() {
  const { nota, setNota } = useContext(notaContext);
  const [originalNota, setOriginalNota] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (nota._id == "") {
      router.push("/");
    }
    console.log(nota);
    console.log(originalNota);
  }, [nota, router, originalNota]);
  useEffect(() => {
    setOriginalNota(nota);
  }, []);
  async function updateNota() {
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(nota),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  }
  return (
    <div>
      <main className={styles.main}>
        <input
          className={styles.input}
          onChange={({ target }) => setNota({ ...nota, content: target.value })}
          value={nota.content}
        />
        <p>{nota.creted_at}</p>
        {nota.content != originalNota.content && (
          <div>
            <button onClick={updateNota}>guardar</button>
          </div>
        )}
      </main>
    </div>
  );
}
