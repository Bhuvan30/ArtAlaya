import React, { useEffect, useRef, useState } from "react";

const WorkshopScreen = () => {
  const videoRef = useRef(null);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  useEffect(() => {
    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    }

    getMedia();
  }, []);

  const toggleAudio = () => {
    setIsAudioOn((prev) => !prev);
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
    }
  };

  const toggleVideo = () => {
    setIsVideoOn((prev) => !prev);
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Workshop Meet Preview</h2>
      <div style={styles.videoContainer}>
        <video ref={videoRef} autoPlay muted playsInline style={styles.video} />
      </div>
      <div style={styles.controls}>
        <button onClick={toggleAudio} style={styles.button}>
          {isAudioOn ? "Mute" : "Unmute"}
        </button>
        <button onClick={toggleVideo} style={styles.button}>
          {isVideoOn ? "Stop Video" : "Start Video"}
        </button>
        <a
          href="https://meet.google.com/"
          target="_blank"
          rel="noreferrer"
          style={styles.joinButton}
        >
          Join Meeting
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#ffff",
    color: "#202124",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    marginBottom: 20,
    color: "#202124",
  },
  videoContainer: {
    border: "2px solid #444",
    borderRadius: 8,
    overflow: "hidden",
    width: "500px",
    maxWidth: "90%",
    backgroundColor: "#202124",
  },
  video: {
    width: "100%",
    height: "auto",
  },
  controls: {
    display: "flex",
    gap: "10px",
    marginTop: 20,
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#5f6368",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  joinButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#0F9D58",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default WorkshopScreen;
