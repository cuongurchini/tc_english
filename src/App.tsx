import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import CardGrid from "./cardGrid/cardGrid";
import LoadingPage from "./loadingPage/loadingPage";

// interface AppState {
//   [index: number]: {
//     word: string;
//     meaning: string;
//   };
//   length: number;
// }

function App() {
  const [wordList, setWordList] = useState<any>([]);

  const API_URL =
    "https://script.google.com/macros/s/AKfycbwmH6kB4JccCOawKz5vw4ZgYC0R6SQblCYSyZ455oxaquUO-Tc6sN_AWbrz7I2lBFtCyA/exec";

  const fetchWordList = async () => {
    try {
      const result = await axios.get(API_URL);
      setWordList(result?.data);
    } catch (error) {
      console.error("Failed to fetch word list: ", error);
    }
  };

  useEffect(() => {
    fetchWordList();
  }, []);

  return wordList.length > 0 ? (
    <CardGrid wordList={wordList} />
  ) : (
    <LoadingPage />
  );
}

export default App;
