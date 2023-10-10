import logo from './logo.svg';
import './App.css';
import UserList from './features/Users/UserList';

function App() {
  return (
    <div className='container mx-auto px-2 max-w-5xl pt-10 md:pt-32'>
      <h1 className='text-center font-bold text-2xl text-gray-700'>CRUD Application using React and  Redux </h1>
      <UserList/>
    </div>
  );
}

export default App;
