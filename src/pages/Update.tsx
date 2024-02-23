import { Formik, Field, ErrorMessage, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UserForm, User } from "../types";
import { updateUser } from "../features/usersSlice";

const Update = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state: any) => state.users.find((user: User) => user.id === id));
  
  const handleSubmit = (values: UserForm) => {
    dispatch(updateUser({
        id: user.id,
        ...values
    }))
    navigate("/");
  }
  const validate = (values: UserForm) => {
      const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
      let errors: any = {};

      if (!values.email) {
          errors.email = "Email is required!";
      } else if (!emailRegex.test(values.email)) {
          errors.email = "Please enter a valid email.";
      }

      if (!values.name) {
          errors.name = "Name is required!";
      }
      return errors;
  }

  return (
      <div className="container w-100 vh-100 d-flex justify-content-center align-items-center">
          <div className="w-50 rounded bg-dark text-white">
              <Formik
                  initialValues={{
                      name: user.name,
                      email: user.email,
                  }}
                  onSubmit={handleSubmit}
                  validate={validate}
              >
                  <Form className="p-4">
                      <h3>Update User</h3>
                      <div className="mb-3">
                          <label htmlFor="name" className="form-label">Name</label>
                          <Field id="name" name="name" className="form-control mb-2" placeholder="Enter name"  />
                          <ErrorMessage name="name" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email</label>
                          <Field id="email" name="email" placeholder="Enter email" type="email" className="form-control mb-2" />
                          <ErrorMessage name="email" component="div" className="text-danger" />
                      </div>
                      <button type="submit" className="btn btn-primary mt-2">Update User</button>
                  </Form>
              </Formik>
          </div>
      </div>
  )
}

export default Update