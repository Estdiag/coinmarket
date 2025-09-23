import { useCallback, useState } from "react";
import Home from "./pages/Home"
import CoinHistory from "./pages/CoinHistory";

function App() {
   const [showHistory, setShowHistory] = useState(false);
    const [currentCoin, setCurrentCoin] = useState<number | null>(null);
  
    const handleShowHistory = useCallback((coinId: number) => {
      setCurrentCoin(coinId);
      setShowHistory(true);
    }, []);

    const handleBack = useCallback(() => {
      setCurrentCoin(null);
      setShowHistory(false);
    }, []);

    if(showHistory&& currentCoin) {
      return <CoinHistory id={currentCoin} handleBack={handleBack}/>;
    }

  return (
    <>
       <Home handleShowHistory={handleShowHistory}/>
    </>
  )
}

export default App
