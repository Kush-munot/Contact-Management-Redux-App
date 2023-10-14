import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import Button from "../../components/Button"
import TextField from "../../components/TextField"
import { addUser } from "./userSlice"
import axios from 'axios'
import Swal from 'sweetalert2';

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: ''
  });

  const handleAddUser = () => {
    setValues({ name: '', email: '' });
    /* dispatch(addUser({
      id: uuidv4(),
      name: values.name,
      email: values.email
    })); */

    const newUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      salary: values.salary,
      dateOfJoining: values.dateOfJoining
    }

    axios.post('https://jungle-green-cobra-gown.cyclic.app/employees',
      newUser
    ).then((res) => {
      dispatch(addUser(newUser));
      setValues({
        firstName: '',
        lastName: '',
        email: '',
        salary: '',
        dateOfJoining: ''
      })

      console.log(res)
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `Data has been Added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }).catch((err) => {
      console.log(err)
    })
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <TextField
        label="First Name"
        value={values.firstName}
        onChange={(e) => setValues({ ...values, firstName: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'Kush' }}
      />
      <br />
      <TextField
        label="Last Name"
        value={values.lastName}
        onChange={(e) => setValues({ ...values, lastName: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'Munot' }}
      />
      <br />
      <TextField
        label="Email"
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
        inputProps={{ type: 'email', placeholder: 'abc@gmail.com' }}
      />
      <br />
      <TextField
        label="Salary"
        value={values.salary}
        onChange={(e) => setValues({ ...values, salary: e.target.value })}
        inputProps={{ type: 'number', placeholder: '10000 $' }}
      />
      <br />
      <TextField
        label="Date Of Joining"
        value={values.dateOfJoining}
        onChange={(e) => setValues({ ...values, dateOfJoining: e.target.value })}
        inputProps={{ type: 'date', placeholder: 'dd-mm-yyyy' }}
      />
      <Button onClick={handleAddUser}>Submit</Button>
    </div>
  )
}

export default AddUser