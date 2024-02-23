import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../types';
import { Link } from 'react-router-dom';
import { deleteUser } from '../features/usersSlice';

export default function Home() {
  const users = useSelector((state: any) => state.users);
  const dispatch = useDispatch(); 

  return (
    <div className='container'>
      <h2>Simple CRUD App with JSON Server</h2>
      <Link to='newuser' className='btn btn-success my-3'>Create</Link>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/edit/${user.id}`} className='btn btn-primary btn-sm me-2'>Edit</Link>
                <button 
                  className='btn btn-danger btn-sm' 
                  onClick={() => dispatch(deleteUser(user.id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
