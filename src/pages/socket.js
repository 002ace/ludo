const wss = new WebSocket("ws://localhost:8080");

// Log connection status
wss.onopen = () => console.log("🌐 WebSocket connected!");
wss.onclose = () => console.log("❌ WebSocket disconnected!");
wss.onerror = (error) => console.error("⚠️ WebSocket error:", error);

export default wss;