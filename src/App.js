import "./App.css";
import FrontPage from "./components/js/frontPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/js/home";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/landingPage" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
