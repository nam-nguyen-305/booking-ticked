
import FormGroup from "../FormGroup"
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { regex_email, regex_password } from '../../const/regex'
import { loginMethod } from "../../store/slice/UserSlice"
import { Link } from "react-router-dom";

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email:
                Yup.string()
                    .required("Required")
                    .matches(regex_email, "Please enter a valid email address"),
            password:
                Yup.string()
                    .required("Required")
                    .matches(regex_password, "Password must be 7-19 charactors and contain at least one letter, one number and a special charactors")
        }),
        onSubmit: async (value) => {
            try {
                const { email, password } = formik.values
                const data = await dispatch(loginMethod(email, password))
                if (data) {

                    const info = data.payload
                    localStorage.setItem("userInfo", JSON.stringify(info))
                    const link = info.user.role == 1 ? "/admin" : -1;
                    navigate(link)
                }
            } catch (err) {
                return err.message
            }
        }
    })

    return (
        <section className='signin'>
            <div className="d-flex justify-content-center">
                <div className="col-auto col-lg-4 form">
                    <Form className='form-style' onSubmit={formik.handleSubmit}>
                        <h2 className='form-title'>{'Đăng nhập'}</h2>
                        <FormGroup
                            label={'Email'}
                            id='email'
                            type='email'
                            name='email'
                            placeholder='Nhập email của bạn'
                            value={formik.values.email}
                            handleChange={formik.handleChange}
                            error={formik.errors.email}
                        />
                        <FormGroup
                            label={'Mật khẩu'}
                            id='password'
                            type='password'
                            name='password'
                            placeholder='Nhập mật khẩu'
                            value={formik.values.password}
                            handleChange={formik.handleChange}
                            error={formik.errors.password}
                        />
                        <div className="d-flex justify-content-between align-items-center mt-5">
                            <Link className="signin__link" to="/register">
                                {'Tạo tài khoản?'}
                            </Link>
                            <Button type="submit" className="btn_submit btn" size="lg">Đăng nhập</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    );
}

export default Login;
