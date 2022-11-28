import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Loggertable from "./Loggertable";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Loggertable />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
