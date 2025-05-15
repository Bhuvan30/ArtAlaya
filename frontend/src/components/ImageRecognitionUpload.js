import React, { useState } from "react";

const ImageRecognitionUpload = ({ history }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setPrediction("");
    }
  };

  const handleButtonClick = () => {
    if (!selectedFile) {
      document.getElementById("fileInput").click();
    } else {
      handleSubmit();
    }
  };

  // Updated to accept prediction value directly
  const submitHandler = (e, predictionValue) => {
    if (e) e.preventDefault();
    if (predictionValue && predictionValue.trim()) {
      history.push(`/search/${predictionValue}`);
    } else {
      history.push("/");
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Prediction response:", data); // for debugging

      setPrediction(data.prediction);
      setSelectedFile(null);
      submitHandler(null, data.prediction); // use prediction directly
    } catch (error) {
      console.error("Prediction error:", error);
      setPrediction("Failed to get prediction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "inline-block" }}>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <button
        onClick={handleButtonClick}
        disabled={loading}
        style={{
          backgroundColor: "#b08c33",
          border: "none",
          borderRadius: "5px",
          padding: "8px 15px",
          color: "#fff",
          fontWeight: "600",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "0.9rem",
          textTransform: "uppercase",
          minWidth: "120px",
        }}
      >
        {loading
          ? "Recognizing..."
          : selectedFile
          ? "Recognize"
          : "Upload Image"}
      </button>
    </div>
  );
};

export default ImageRecognitionUpload;
