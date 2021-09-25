import './App.css';
import { NavBar } from '../Features/navbar/NavBar'
import Content from '../Features/content/Content'

function App() {

  return (
    <div className="App">
      <NavBar/>
      <div className="Content">
      <Content/>
      </div>      
    </div>
  );
}

export default App;
