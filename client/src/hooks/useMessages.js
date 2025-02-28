import { useEffect, useState } from "react";
import axios from "axios";

const useMessages = (mechanicId, token) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/messages/${mechanicId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data);
    } catch (err) {
      setError("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [mechanicId, token]);

  return { messages, setMessages, loading, error };
};

export default useMessages;
