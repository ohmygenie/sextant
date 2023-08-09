import React, { useEffect, useState } from 'react';

function PacketLatency() {
  const [latency, setLatency] = useState(null);
  const [status, setStatus] = useState('Connecting...');
  const websocketURL = "ws://localhost:55455";

  useEffect(() => {
    const ws = new WebSocket(websocketURL);

    ws.onopen = () => {
      setStatus('Connected. Waiting for packets...');
    };

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      if (receivedData && receivedData.timestamp) {
        const currentTime = new Date().getTime();
        const packetLatency = currentTime - receivedData.timestamp;
        setLatency(packetLatency);
      }
    };

    ws.onclose = (event) => {
      if (event.wasClean) {
        setStatus(`Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
      } else {
        setStatus('Connection died unexpectedly.');
      }
    };

    ws.onerror = (error) => {
      setStatus('WebSocket encountered an error.');
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
        <p>{status}</p>
      )}
    </div>
  );
}

export default PacketLatency;
