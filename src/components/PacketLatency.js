import React, { useEffect, useState } from 'react';

function PacketLatency() {
  const [latency, setLatency] = useState(null);
  const websocketURL = "ws://localhost:55455";

  useEffect(() => {
    const ws = new WebSocket(websocketURL);

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      if (receivedData && receivedData.timestamp) {
        const currentTime = new Date().getTime();
        const packetLatency = currentTime - receivedData.timestamp;
        setLatency(packetLatency);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };

    // Close the WebSocket when the component is unmounted
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      {latency !== null ? (
        <p>Packet Latency from Pylon: {latency} milliseconds</p>
      ) : (
        <p>Waiting for packets...</p>
      )}
    </div>
  );
}

export default PacketLatency;
