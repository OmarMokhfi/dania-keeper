import NavigationBar from "./components/NavigationBar";
import { ThemeProvider } from "./contexts/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./pages/Board";
import Statistics from "./pages/Statistics";
import AddProject from "./pages/AddProject";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<AddProject />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/*" element={<Board />} />
            </Routes>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
