import { Route, Routes } from "react-router-dom";
import AddUser from "./features/users/AddUser";
import EditUser from "./features/users/EditUser";
import UserList from "./features/users/UserList";

function App() {
  return (
    <div className="container mx-auto px-2 max-w-5xl pt-1 md:pt-3">
      <h1 className="text-center font-bold text-2xl text-gray-700">CRUD with redux toolkit</h1>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
