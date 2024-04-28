import "./App.css";
import Sidebar from "./components/Sidebar";
import Game from "./components/Game";

function App() {
  return (
    <>
      <div className="lg:flex">
        <Sidebar />
        <div className="w-[100%] 2xl:w-[1400px]">
          <Game />
        </div>
      </div>
    </>
  );
}

export default App;
