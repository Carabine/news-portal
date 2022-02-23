import './App.css';
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import AdminPanel from './AdminPanel';
import MainPage from './MainPage';

const App = () => {

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/admin" element={ <AdminPanel />} />
          <Route path="/" element={ <MainPage />} / >
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
