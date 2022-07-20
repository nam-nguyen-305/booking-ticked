import { useEffect } from "react";
import { getListUser, deleteUser } from "../../../store/slice/AdminSlice"
import { useDispatch, useSelector } from "react-redux"
import { Table } from "react-bootstrap"
import { Modal } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes,

} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "./style.scss"
const { confirm } = Modal;

function UserManager() {
    const dispatch = useDispatch();
    const listUser = useSelector((state) => state.admin.listUser)
    useEffect(() => {
        dispatch(getListUser());
    }, []);
    const handleDeleteUser = (id) => {

        confirm({
            title: `Bạn muốn xóa người dùng này?`,
            okText: `Xóa người dùng`,
            okType: 'successful',
            cancelText: 'Hủy',
            async onOk() {
                toast.success("Người dùng đã được xóa!", {
                    position: "top-right",
                    autoClose: 2500,
                });
                await dispatch(deleteUser(id));;
                dispatch(getListUser());
            },
        });
    }
    return (
        <section className="user-manager">
            <Table bordered className="user-manager__table">
                <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '5%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Tên người dùng</th>
                        <th>Số điện thoại</th>
                        <th>Tuổi</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUser.register &&
                        listUser.register.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item._id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.fullname}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.age}</td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(item._id)}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }


                </tbody>
            </Table>
        </section>
    )
}


export default UserManager;
