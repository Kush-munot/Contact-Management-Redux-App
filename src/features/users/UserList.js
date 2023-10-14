import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { deleteUser } from "./userSlice";
import axios from 'axios'
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const UserList = () => {
  const dispatch = useDispatch();
  // const users = useSelector(store => store.users);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Make an Axios GET request to fetch users from your API
    axios.get('https://jungle-green-cobra-gown.cyclic.app/employees')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleRemoveUser = (id) => {
    console.log(id);
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        axios.delete(`https://jungle-green-cobra-gown.cyclic.app/employees/${id}`).then(() => {
          console.log(result);
          dispatch(deleteUser({ id }));
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: `Data has been deleted.`,
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload(false);
        })
      }
    });
  }

  const renderCard = () => users.map(user => (
    <div className="bg-gray-300 p-5 flex items-center justify-between rounded" key={user.id}>
      <div>
        <h3 className="font-bold text-lg text-gray-700">{user.firstName} {user.lastName}</h3>
        <h4 className="font-normal text-gray-600">{user.email}</h4>
        <h4 className="font-normal text-gray-600">{user.salary}</h4>
        <h4 className="font-normal text-gray-600">{user.dateOfJoining}</h4>
      </div>
      <div className="flex gap-4">
        <Link to={`/${user._id}`}>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </Link>
        <button
          onClick={() => handleRemoveUser(user._id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  ))

  return (
    <div>
      <Link to="/add-user"><Button>Add User</Button></Link>
      <div className="grid gap-5 md:grid-cols-2">
        {users.length ? renderCard() : <p className="text-center col-span-2 text-gray-700 font-semibold">No User</p>}
      </div>
    </div>
  )
}

export default UserList