import logo from './logo.svg';
import Pagination from './components/pagination'
import './App.css';

function App() {

  async function myGoToPage(pageNum) {
    return await fetch('https://api.publicapis.org/entries').then((reponse) => true).catch(err => false);
  }

  return (
    <div className="App">
      <Pagination totalRecords={12563} goToPage={myGoToPage}></Pagination>

      <br/>
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </div>
  );
}

export default App;
