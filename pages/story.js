import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Story.module.css";
import {
  CaretRightOutlined,
  StepBackwardOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
// import testPic from "../public/testPic.png";
import { useStateContext } from "../context/state";
import { setGlobalState } from "../context/state";
import { Button, Modal, Popover } from "antd";
import story from "../public/story.json" assert { type: "json" };

const API_KEY = "01a71dcd61f94b4da903c4b52475e1f3";

export default function Home() {
  const state = useStateContext();
  const { name } = state;

  const [pageNum, setPageNum] = useState(1);
  const pages = Object.keys(story);
  const page = story[pageNum];

  const [pagesStack, setPagesStack] = useState(["1"]);
  const goBackPage = () => {
    if (pagesStack.length > 1) {
      const newPagesStack = [...pagesStack];
      newPagesStack.pop();
      setPagesStack(newPagesStack);
      setPageNum(newPagesStack[newPagesStack.length - 1]);
    }
  };

  const [ipData, setIpData] = useState(null);
  useEffect(() => {
    // Fetch IP data
    fetch("https://api.ipgeolocation.io/ipgeo?apiKey=") //+ API_KEY)
      .then((res) => res.json())
      .then((data) => {
        setIpData(data);
      });
  }, []);

  const { city, state_prov, country_flag, latitude, longitude, isp } =
    ipData || {};

  return (
    <div className={styles.container}>
      <Head>
        <title>CYOA!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* TEMP PAGE SELECTOR */}
      {/* <div className={styles.pageSelector}>
        {pages.map((p) => (
          <Button key={p} onClick={() => setPageNum(p)}>
            {p}
          </Button>
        ))}
      </div> */}

      {/* POPUP ADS */}
      {page.has_location_ad && <LocationAd city={city} name={name} />}
      {page.has_isp_ad && <ISPAd city={city} name={name} isp={isp} />}

      <main className={styles.main}>
        <div className={styles.visualsBox}>
          {page.background && (
            <Image
              alt="Background image"
              layout="fill"
              className={styles.img}
              src={page.background}
            />
          )}
        </div>
        {page.options && (
          // 'option' represents the index of the page in the dict to navigate to
          <div className={styles.optionsContainer}>
            {page.options.map((option, i) => (
              <div
                className={styles.optionBox}
                key={i}
                onClick={() => {
                  setPagesStack([...pagesStack, option[0]]);
                  setPageNum(option[0]);
                }}
              >
                <p className={styles.mainText}>{option[1]}</p>
              </div>
            ))}
          </div>
        )}
        <div
          className={styles.dialogueBox}
          onClick={() => {
            if (page.next) {
              setPagesStack([...pagesStack, page.next]);
              setPageNum(page.next);
            }
          }}
        >
          {/* Speaker is optional (only if dialogue is coming from someone, not 3rd person). Use visibility hidden to pad space when no speaker. */}
          <h1
            className={styles.speaker}
            style={{
              visibility: !page?.speaker && "hidden",
            }}
          >
            {/* X is placeholder to push down content */}
            {page?.speaker}
          </h1>
          {page.text && <p className={styles.mainText}>{page.text}</p>}
          {/* To show real life relevance through articles/examples */}
          {page.context && (
            <Popover
              content={
                <div onClick={(e) => e.stopPropagation()}>{page.context}</div>
              }
              placement="leftTop"
              title="Real Life Context"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <InfoCircleOutlined className={styles.infoIcon} />
            </Popover>
          )}
          <StepBackwardOutlined
            className={styles.backBtn}
            onClick={(e) => {
              e.stopPropagation();
              goBackPage();
            }}
          />
          {page.is_ending && <h1 className={styles.endingText}>END</h1>}
          <CaretRightOutlined className={styles.nextTriangle} />
        </div>
      </main>
    </div>
  );
}

const LocationAd = ({ city, name }) => {
  // Fetch IP data
  const [isModalOpen, setIsModalOpen] = useState(true);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Meet HOT local singles in your area!"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <p>
          {/* Need to escape this ' or linter will throw error and Vercel won't deploy */}
          🚨🚨 HEY {name}! It{"'"}s YOUR lucky night ... 🚨🚨
        </p>
        {/* <p>💦 Come see Jason Lin ... 3km away in {city}. 💦</p> */}
        <div className={styles.singlesList}>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="blank">
            <Button className={styles.singleButton}>
              💦 Jason Lin ... 3km away in {city}. 💦
            </Button>
          </a>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="blank">
            <Button className={styles.singleButton}>
              💦 Jennifer Lawrrence ... 5km away in {city}. 💦
            </Button>
          </a>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="blank">
            <Button className={styles.singleButton}>
              💦 Angelina Jolieee ... 2.3km away in {city}. 💦
            </Button>
          </a>
        </div>
      </Modal>
    </>
  );
};

const ISPAd = ({ city, name, isp }) => {
  // Fetch IP data
  const [isModalOpen, setIsModalOpen] = useState(true);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={`IS ${isp?.toUpperCase()} FEELING SLOW? 🐢🐢`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={600}
      >
        <p>
          🚨🚨 {name} ... HAS {isp?.toUpperCase()} BEEN SLOW LATELY? 🐌🦥 ...
          🚨🚨
        </p>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="blank">
          CLICK HERE TO SWITCH FROM {isp?.toUpperCase()} TO GIGA FAST INTERNET
          IN {city.toUpperCase()} TODAY!
        </a>
      </Modal>
    </>
  );
};
