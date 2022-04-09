import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import url from "../lib/contantes";
import styles from "../styles/Home.module.css";
import notaContext from "./notacontext";
export default function Home({ notas }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  // console.log(notas);
  async function createNota(e) {
    if (e.key == "Enter") {
      console.log("enviando datos de nueva nota");
      console.log(e.target.value);
      const body = {
        content: e.target.value,
      };
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      refreshData();
      console.log(await res.json());
    }
  }
  async function deleteNota(_id) {
    const body = {
      _id: _id,
    };
    const res = await fetch(url, {
      body: JSON.stringify(body),
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    refreshData();
    console.log(await res.json());
  }
  const { _, setNota } = useContext(notaContext);
  function openNota(nota) {
    setNota(nota);
    router.push("/nota");
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Hola mundo</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hola <a href="#">Mundo</a>
        </h1>
        <input onKeyUp={createNota} type="text" />
        <hr />
        <h2>Notas</h2>
        <div className={styles.notas}>
          {notas.map(({ _id, content, created_at }) => (
            <div
              onClick={() => openNota({ _id, content, created_at })}
              key={_id}
              className={styles.nota}
            >
              <h2>{content}</h2>
              <p>{new Date(created_at).toLocaleString()}</p>
              <button onClick={() => deleteNota(_id)}>delete</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  //solicitud de datos
  const res = await fetch("http://localhost:3000/api/notas");
  const notas = await res.json();
  return {
    props: {
      notas,
    },
  };
}
