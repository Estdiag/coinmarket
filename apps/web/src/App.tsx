import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';

function App() {
  return (
    <div className="min-h-screen bg-gray-700 pt-6 px-4 sm:px-10 lg:px-20 text-white">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
