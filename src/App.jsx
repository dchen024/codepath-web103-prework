import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <NavBar />
        <Routes>
          <Route path='/' element={<ShowCreators />} />
          <Route path='/creator/:id' element={<ViewCreator />} />
          <Route path='/creator/:id/edit' element={<EditCreator />} />
          <Route path='/new' element={<AddCreator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
