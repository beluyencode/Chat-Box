import './App.css';
import Home from './component/Home/Home';

document.cookie = localStorage.getItem('user')
function App() {
  return (
    <div className="App">
      {document.cookie}
      <Home />
    </div>
  );
}

export default App;
