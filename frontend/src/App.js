// pages & components
import Inventory from './components/FoodItems/Inventory'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UpdateUser from './pages/update/UpdateUser';
import ItemForm from './pages/addItem/addItemForm';
import Usage from './pages/usage/usageForm';
import Navbar from './components/navbar/Navbar';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
    <div className="app-container">
      <Navbar/> 
        <div className="pages">
          <Routes>
             <Route path="/inventory/items" element={<Inventory />} />
             <Route path="/inventory/addItems" element={<ItemForm />} />
             <Route path="/inventory/update/:id" element={<UpdateUser />} />
             <Route path="/inventory/usage" element={<Usage />} />
          </Routes>
        </div>
      </div>  
      </BrowserRouter>



    </div>
  );
}

export default App;
