import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Index.module.css";
import { Input, Button } from "antd";

import { useStateContext } from "../context/state";
import { setGlobalState } from "../context/state";

export default function Home() {
  const [name, setName] = useState("");
  const state = useStateContext();

  return (
    <div className={styles.container}>
      <Head>
        <title>CYOA!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>Choose Your Own Adventure!</h1>
          <p className={styles.description}>
            A CS492 Project exploring the social implications of various
            technologies.
          </p>
        </div>
        <p className={styles.description}>What&apos;s your name? </p>
        <Input
          placeholder="Name"
          size="large"
          style={{ width: "20%" }}
          onChange={(e) => setName(e.target.value)}
        />
        <Link href="/story">
          <Button onClick={() => setGlobalState({ ...state, name })}>
            Start
          </Button>
        </Link>
      </main>
    </div>
  );
}
