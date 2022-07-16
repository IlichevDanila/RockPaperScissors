import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/main";
import Game from "./pages/game";
import GlobalStyles from "./utils/globalStyles";

function App() {
  return (
    <div className="App">
        <GlobalStyles />
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={Main()}></Route>
                <Route path={"/game"} element={Game()}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
