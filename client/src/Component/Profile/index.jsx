
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import FormGroup from "../FormGroup"
import { Form, Button } from 'react-bootstrap'
import * as Yup from 'yup'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faCircleXmark
} from "@fortawesome/free-solid-svg-icons";
import { regex_email, regex_phone, regex_name, regex_age } from '../../const/regex'
import { updateUser } from "../../store/slice/UserSlice"
import "./style.scss"
function Profile() {

    const auth = JSON.parse(localStorage.getItem('userInfo'))
    const { _id, email, fullname, phone, age, role } = auth
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const dispatch = useDispatch()
    const handleEdit = () => {
        setIsOpenEdit(!isOpenEdit)
    }

    const formik = useFormik({
        initialValues: {
            fullname: fullname,
            email: email,
            phone: phone,
            age: age
        },
        validationSchema: Yup.object({
            fullname:
                Yup.string()
                    .required("Không bỏ trống trường này")
                    .matches(regex_name, "Hãy điền tên hợp lệ!")
                    .max(50, "Ký tự quá giới hạn!"),
            email:
                Yup.string()
                    .required("Không bỏ trống trường này")
                    .matches(regex_email, "Email không hợp lệ!"),
            phone:
                Yup.string()
                    .required("Không bỏ trống trường này")
                    .matches(regex_phone, "Số điện thoại không hợp lệ!"),
            age:
                Yup.string()
                    .required("Không bỏ trống trường này")
                    .matches(regex_age, "Tuổi không hợp lệ!"),
        }),
        onSubmit: async (value) => {
            try {
                await dispatch(updateUser({ id: _id, newUserData: formik.values }))
                window.location.reload(true)
                setIsOpenEdit(!isOpenEdit)

            } catch (err) {
                return err.message
            }
        }
    });

    return (
        <div className="info">

            <button className="info__edit-btn" onClick={() => handleEdit()}><FontAwesomeIcon icon={isOpenEdit ? faCircleXmark : faEdit} /></button>
            {isOpenEdit ?
                <div>
                    <Form className="form-input" onSubmit={formik.handleSubmit}>
                        <h2 className="form-title">Sửa thông tin cá nhân</h2>
                        <FormGroup
                            label='Họ và tên'
                            id='fullname'
                            type='fullname'
                            name='fullname'
                            placeholder='Nhập họ và tên của bạn'
                            value={formik.values.fullname}
                            handleChange={formik.handleChange}
                            error={formik.errors.fullname}
                        />
                        <FormGroup
                            label='Email'
                            id='email'
                            type='email'
                            name='email'
                            placeholder='Nhập email của bạn'
                            value={formik.values.email}
                            disabled={true}
                            handleChange={formik.handleChange}
                            error={formik.errors.email}
                        />
                        <FormGroup
                            label='Số điện thoại'
                            id='phone'
                            type='text'
                            name='phone'
                            placeholder='Nhập số điện thoại'
                            value={formik.values.phone}
                            handleChange={formik.handleChange}
                            error={formik.errors.phone}
                        />
                        <FormGroup
                            label='Tuổi'
                            id='age'
                            type='text'
                            name='age'
                            placeholder='Nhập tuổi'
                            value={formik.values.age}
                            handleChange={formik.handleChange}
                            error={formik.errors.age}
                        />
                        <div className="d-flex justify-content-center align-items-center">
                            <Button variant="outline-primary" type="submit" className="btn_view-more btn text-center" size="lg">Hoàn tất</Button>
                        </div>
                    </Form>
                </div>
                :
                <>
                    <div className="info__main">
                        <div className="d-flex">
                            <h2 className="info__sub">Email:</h2>
                            <span className="info_value">{email}</span>
                        </div>
                        <div className="d-flex">
                            <h2 className="info__sub">Full name:</h2>
                            <span className="info_value">{fullname}</span>
                        </div>
                        <div className="d-flex">
                            <h2 className="info__sub">Phone:</h2>
                            <span className="info_value">{phone}</span>
                        </div>
                        <div className="d-flex">
                            <h2 className="info__sub">Tuổi:</h2>
                            <span className="info_value">{age}</span>
                        </div>
                    </div>
                </>
            }
        </div>

    );
}

export default Profile;
