import "./App.css";
import GameComponent from "./GameComponent";

function App() {
  return (
    <div className="App">
      <h2>Guess The Piar</h2>
      <GameComponent
        data={{
          Egypt: "Cairo",
          Iran: "Tehran",
          Iraq: "Baghdad",
          Australia: "Canberra",
          Honduras: "Tegucigalpa",
          "Costa Rica": "San José",
          Cuba: "Havana",
          "Papua New Guinea": "Port Moresby",
          Kabul: "Afghanistan",
          Colombo: "Sri Lanka",
          Argentina: "Buenos Aires",
          Chile: "Santiago",
        }}
      />
    </div>
  );
}

export default App;
