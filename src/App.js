import './App.css';
import { Route, Routes } from 'react-router-dom';
import AddressBookForm from './component/formPage/AddressBookForm';
import AddressBookHome from './component/homePage/AddressBookHome';

function App() {
  return (
    <div>
      <header className="header-content header">
        <div className="logo-content">
          <div>
            <span className="emp-text">ADDRESS</span><br />
            <span className="emp-text emp-payroll">BOOK</span>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<AddressBookHome />} />

        <Route path="/form" element={<AddressBookForm />} />
      </Routes>

    </div>
  );
}

export default App;
