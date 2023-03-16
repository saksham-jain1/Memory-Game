import { useEffect, useState } from "react";
import "./App.css";
import Tile from "./Components/Tile/Tile";

function App() {
  const [tilesData, setTilesData] = useState([
    { value: "", status: "" },
    { value: "", status: "" },
    { value: "", status: "" },
    { value: "", status: "" },
    { value: "", status: "" },
    { value: "", status: "" },
  ]);
  const [prev, setPrev] = useState({});
  const [words, setWords] = useState({ 1: "", 2: "", 3: "" });
  const [visibility, setVisibility] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    let flag = 0;
    for (let i in tilesData) {
      if (tilesData[i].status === "correct") {
        flag += 1;
      }
    }
    if (flag === 6) setWon(true);
  }, [tilesData]);

  const handleNxtClick = () => {
    if (words[1] === "" && words[2] === "" && words[3] === "") {
      alert("Please enter all three words.");
      return;
    }
    let wordArr = [words[1], words[2], words[3], words[1], words[2], words[3]];
    wordArr.sort(() => {
      return 0.5 - Math.random();
    });
    const temp = wordArr.map((item) => {
      return { value: item, status: "" };
    });
    setTilesData(temp);
    setPrev({});
    setVisibility(true);
  };

  const handleTileClick = (index) => {
    if (prev.index === index || tilesData[index].status === "correct") return;
    const temp = tilesData;
    temp[index].status = "active";
    setTilesData([...temp]);
    if (Object.keys(prev).length === 0) {
      setPrev({ ...temp[index], index });
      setTilesData([...temp]);
      return;
    } else {
      if (prev.value === temp[index].value) {
        temp[index].status = "correct";
        temp[prev.index].status = "correct";
        setTilesData([...temp]);
        setPrev({});
      } else {
        temp[index].status = "wrong";
        temp[prev.index].status = "wrong";
        setTilesData([...temp]);
        setPrev({});
        setTimeout(() => {
          temp[index].status = "";
          temp[prev.index].status = "";
          setTilesData([...temp]);
        }, 2000);
      }
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>A Memory Game</h1>
      </div>
      <div className="inputs">
        <label htmlFor="input">Enter three words below:</label>
        <div className="inputs">
          <div className="input">
            <input
              type="text"
              value={words[1]}
              onChange={(e) => setWords({ ...words, 1: e.target.value })}
              placeholder="Enter First Word"
            />
            <span className="underline"></span>
          </div>
          <div className="input">
            <input
              type="text"
              value={words[2]}
              onChange={(e) => setWords({ ...words, 2: e.target.value })}
              placeholder="Enter Second Word"
            />
            <span className="underline"></span>
          </div>
          <div className="input">
            <input
              type="text"
              value={words[3]}
              onChange={(e) => setWords({ ...words, 3: e.target.value })}
              placeholder="Enter Thired Word"
            />
            <span className="underline"></span>
          </div>
        </div>
        <button onClick={() => handleNxtClick()}>Next</button>
      </div>
      {visibility && (
        <div className="gameBody">
          <div className="tiles">
            {tilesData.map((item, index) => {
              return (
                <Tile
                  key={index}
                  value={item.value}
                  handleClick={handleTileClick}
                  index={index}
                  status={item.status}
                />
              );
            })}
          </div>
        </div>
      )}
      {won && <div className="won">Hurray!! You did it.</div>}
    </div>
  );
}

export default App;
