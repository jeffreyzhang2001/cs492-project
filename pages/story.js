import { useState } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Story.module.css";
import { CaretRightOutlined } from "@ant-design/icons";
// import testPic from "../public/testPic.png";
import { useStateContext } from "../context/state";
import { setGlobalState } from "../context/state";
import { Button } from "antd";
import story from "../public/story.json" assert { type: "json" };

export default function Home() {
  const state = useStateContext();
  const { name } = state;
  const [pageNum, setPageNum] = useState(1);
  const pages = Object.keys(story);
  const page = story[pageNum];

  return (
    <div className={styles.container}>
      <Head>
        <title>CYOA!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* TEMP PAGE SELECTOR */}
      <div className={styles.pageSelector}>
        {pages.map((p) => (
          <Button key={p} onClick={() => setPageNum(p)}>
            {p}
          </Button>
        ))}
      </div>
      <main className={styles.main}>
        <div className={styles.visualsBox}>
          {page.background && (
            <Image alt="Background image" layout="fill" src={page.background} />
          )}
        </div>
        {page.options && (
          // 'option' represents the index of the page in the dict to navigate to
          <div className={styles.optionsContainer}>
            {Object.keys(page.options).map((option) => (
              <div
                className={styles.optionBox}
                key={option}
                onClick={() => setPageNum(option)}
              >
                <p className={styles.mainText} key={option}>
                  {page.options[option]}
                </p>
              </div>
            ))}
          </div>
        )}
        <div
          className={styles.dialogueBox}
          onClick={() => {
            if (page.next) setPageNum(page.next);
          }}
        >
          {/* Speaker is optional (only if dialogue is coming from someone, not 3rd person) */}
          {
            <h1
              className={styles.speaker}
              style={{
                visibility: !page?.speaker && "hidden",
              }}
            >
              {/* X is placeholder to push down content */}
              {page?.speaker}
            </h1>
          }
          {page.text && <p className={styles.mainText}>{page.text}</p>}
          <CaretRightOutlined className={styles.nextTriangle} />
        </div>
      </main>
    </div>
  );
}
