import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Button from "../../components/Button"
import TextField from "../../components/TextField"
import { editUser } from "./userSlice"
import axios from "axios"
import Swal from "sweetalert2"

const EditUser = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const users = useSelector(store => store.users);
  console.log(users);
  const navigate = useNavigate();
  const _ids = params.id;
  // const existingUser = users.filter(user => user._id === params.id);
  // const { firstName, lastName, email, salary, dateOfJoining } = existingUser[0];
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    salary: '',
    dateOfJoining: ''
  });

  useEffect(() => {
    const existingUser = users.find((user) => user._id === params._id);
    console.log(existingUser);
    if (existingUser) {
      setValues({ firstName: existingUser.firstName, lastName: existingUser.lastName, email: existingUser.email, salary: existingUser.salary, dateOfJoining: existingUser.dateOfJoining });
    }
  }, [params._id, users]);

  const handleEditUser = () => {
    axios.patch(`https://jungle-green-cobra-gown.cyclic.app/employees/${_ids}`, {
      firstName: values.firstName,
      lastName: values.lastName,
      salary: values.salary,
      email: values.email,
      dateOfJoining: values.dateOfJoining
    }).then((res) => {
      console.log(res)
      console.log(res.data);
      dispatch(editUser(res.data));
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `Data has been updated.`,
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
        inputProps={{ type: 'text', placeholder: `${values.firstName}` }}
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
      <Button onClick={handleEditUser}>Edit</Button>
    </div>
  )
}

export default EditUser