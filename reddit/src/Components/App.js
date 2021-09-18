import './App.css';
import Header from './Header/Header';
import SearchBar from '../Features/searchBar/SearchBar';
import Filter from '../Features/filter/Filter';
import Content from '../Features/content/Content'

function App() {
  // The value of skipSearch is based on the value of skipMain. This allows us to not have two different variable in state. When one is on, the other should be off.
 

  // App will be the first component rendered and will subsequenty render all components. If there is an asynchronous call, it will have to wait, so don't do that. We want to render a skeleton of the page before requests are made to fill our data. We can accomplish this by 
  //BY WHAT? I'M AT THE EDGE OF MY SEAT
  //(In all seriousness IDK if this is an old comment or what but I think that if we continue to use RTK Query we shouldn't need to worry about page render time, since it looks like RTKQ will display the <Loading> components fairly quickly without us doing anything )
  return (
    <div className="App">
      <Header/>
      <SearchBar/>
      <Filter/>
      <div className="Content">
      <Content/>
      </div>      
    </div>
  );
}

export default App;
