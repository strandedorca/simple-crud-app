import { Field, Formik, Form, ErrorMessage } from "formik"
import { addUser } from "../features/usersSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import users from './../assets/usersData.json';
import { UserForm } from "../types";

const NewUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (values: UserForm) => {
        dispatch(addUser({
            id: String(users[users.length - 1].id + 1),
            ...values
        }));
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
                        name: '',
                        email: '',
                    }}
                    onSubmit={handleSubmit}
                    validate={validate}
                >
                    <Form className="p-4">
                        <h3>Add New User</h3>
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
                        <button type="submit" className="btn btn-primary mt-2">Add User</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default NewUser