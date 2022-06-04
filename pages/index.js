import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Vsl.module.css";
import YouTube from "react-youtube";

import { useState, useEffect } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";

export default function Home() {
  const [videoId, setVideoId] = useState("");
  const [video, setVideo] = useState(null);
  const [videoBG, setVideoBG] = useState(null);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);

  const _onReady = (event) => {
    setVideo(event.target);
  };

  const _onReadyBG = (event) => {
    setVideoBG(event.target);
  };

  useEffect(() => {
    setVideoId("khw9FlZY5Bg");
  }, []);

  return (
    <div>
      <Head>
        <title>YouTube API "Redirect" Page</title>
      </Head>

      <div className={styles.blurryBG}>
        <div className={styles.videoWrapper}>
          {videoId && (
            <YouTube
              videoId={videoId}
              opts={{
                height: "390",
                width: "640",
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  modestbranding: 1,
                  rel: 0,
                  mute: 1,
                },
              }}
              onReady={_onReadyBG}
            />
          )}
        </div>
      </div>

      {playing && (
        <div className={`${styles.container} ${styles.scaleUp}`}>
          <div className={styles.mainContent}>
            <div className={styles.fadeIn}>
              <div className={styles.videoWrapper}>
                {videoId && (
                  <YouTube
                    videoId={videoId}
                    opts={{
                      height: "390",
                      width: "640",
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        modestbranding: 1,
                        rel: 0,
                      },
                    }}
                    onReady={_onReady}
                    onEnd={() => {
                      window.location.href = "https://marketingsecrets.com/";
                    }}
                    onStateChange={(state) => {
                      let progressTimer = "";
                      const playerDuration = video.getDuration();

                      if (state.data) {
                        progressTimer = setInterval(() => {
                          const playerCurrentTime = video.getCurrentTime();
                          const playerTimeDifference =
                            (playerCurrentTime / playerDuration) * 100;
                          setProgress(playerTimeDifference);
                        }, 1000);
                      } else {
                        clearTimeout(progressTimer);
                      }
                    }}
                  />
                )}
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                  }}
                ></div>
              </div>

              <div>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${
                      (typeof window !== "undefined"
                        ? progress * window.innerWidth
                        : 0) / 100
                    }px`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!playing && (
        <>
          <div className={styles.container}>
            <div className={styles.mainContent}>
              <div
                style={{
                  position: "relative",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                <h1>Watch Trailer</h1>
                <div
                  className={styles.playButton}
                  onClick={() => {
                    setPlaying(true);
                  }}
                >
                  <AiOutlinePlayCircle />
                </div>
                <h4>You can watch entirely for free right now!</h4>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
