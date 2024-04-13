// pages & components
import Inventory from '../src/pages/Inventory'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UpdateUser from './pages/UpdateUser';
import ItemForm from './pages/addItemForm';
import Usage from './pages/usageForm';


function App() {
  return (
    <div className="App">



      <BrowserRouter>
   

        <div className="pages">
          <Routes>
             <Route path="/inventory" element={<Inventory />} />
             <Route path="/inventory/addItems" element={<ItemForm />} />
             <Route path="/inventory/update/:id" element={<UpdateUser />} />
             <Route path="/inventory/usage" element={<Usage />} />
  

          </Routes>
        </div>
      </BrowserRouter>



    </div>
  );
}

export default App;
