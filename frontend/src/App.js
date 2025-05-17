import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FoodList from './pages/FoodList';
import FoodForm from './pages/FoodForm';
import FoodDetail from './pages/FoodDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FoodList />} />
        <Route path="/add" element={<FoodForm />} />
        <Route path="/edit/:id" element={<FoodForm />} />
        <Route path="/food/:id" element={<FoodDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
