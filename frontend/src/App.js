// pages & components
import Inventory from '../src/pages/Inventory'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UpdateUser from './pages/UpdateUser';
import ItemForm from './pages/addItemForm';


function App() {
  return (
    <div className="App">



      <BrowserRouter>
   

        <div className="pages">
          <Routes>
             <Route path="/inventory" element={<Inventory />} />
             <Route path="/inventory/addItems" element={<ItemForm />} />
             <Route path="/inventory/update/:id" element={<UpdateUser />} />

          </Routes>
        </div>
      </BrowserRouter>



    </div>
  );
}

export default App;
