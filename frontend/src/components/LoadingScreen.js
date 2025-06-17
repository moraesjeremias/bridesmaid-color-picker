import React from "react";

export default function LoadingScreen() {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(255,224,239,0.8)", zIndex: 9999, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center"
    }}>
      <img src="/loading.gif" alt="Loading..." style={{ width: 120, marginBottom: 24 }} />
      <div style={{ color: "#e75480", fontWeight: "bold", fontSize: 22 }}>Confirming your selection...</div>
    </div>
  );
}
