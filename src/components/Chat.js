import { useState, useEffect } from "react";
import axios from "axios";

export default function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = () => {
      axios
        .get("http://uim.gt/api/messages/")
        .then((response) => setMessages(response.data.messages))
        .catch((error) => console.error("Error fetching messages:", error));
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000); // Refresh every 2s

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Transacciones de puntos actuales</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>
            <strong>{msg.usuario}:</strong> {msg.puntos} points
            <br />
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#28a84f",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
  },
  chatBox: {
    maxHeight: "400px",
    overflowY: "auto",
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#fff",
  },
  message: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
};
