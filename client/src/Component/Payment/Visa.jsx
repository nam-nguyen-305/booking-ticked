import React, { useEffect, useState } from 'react';
import FormGroup from "../FormGroup"
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { regex_email, regex_password } from '../../const/regex'
import { loginMethod } from "../../store/slice/UserSlice"
import { Link } from "react-router-dom";

function Visa({ submit }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [visaCard, setVisaCard] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [name, setName] = useState('')
    const formatCreditCardNumber = data => {
        let newCardNumberData = data
        const regexp = /^(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,4})?$/
        const digits = data.value.replace(/[^0-9]/g, '')
        let formatedCardNumber = regexp.exec(digits) ?? []
        formatedCardNumber = formatedCardNumber
            .slice(1)
            .filter(e => e)
            .join(' ')
        newCardNumberData.value = formatedCardNumber
        setVisaCard(newCardNumberData.value)

    }
    const numberOnly = event => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault()
        }
    }
    return (
        <section className='signin'>
            <div className="d-flex justify-content-center">
                <div className="col-auto col-lg-4 form">
                    <div className="form-style">
                        <h2 className='form-title'>{'Thẻ Visa'}</h2>
                        <div className="mt-5">
                            <label htmlFor='visaCard'>Visa Credit Card</label>
                            <input
                                label={'Visa Credit Card'}
                                id='visaCard'
                                maxLength={19}
                                type='visaCard'
                                className='form-input w-100'
                                name='visaCard'
                                placeholder='0000 0000 0000 0000'
                                value={visaCard}
                                onChange={(e) =>
                                    formatCreditCardNumber(e.target)
                                }
                            />
                        </div>
                        <div className=" mt-5">
                            <label htmlFor=''> Expiration Date</label>
                            <div className="d-flex justify-content-start align-items-center">
                                <input
                                    label={'MM'}
                                    id='month'
                                    maxLength={2}
                                    className='form-input w-20'
                                    type='text'
                                    name='month'
                                    onKeyPress={e => numberOnly(e)}
                                    placeholder='MM'
                                    value={month}
                                    onChange={(e) =>
                                        setMonth(e.target.value)
                                    }
                                />
                                <span className="fence">
                                    /
                                </span>
                                <input
                                    label={'year'}
                                    id='year'
                                    maxLength={2}
                                    className='form-input w-20'
                                    type='text'
                                    onKeyPress={e => numberOnly(e)}
                                    name='year'
                                    placeholder='YY'
                                    value={year}
                                    onChange={(e) =>
                                        setYear(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="mt-5">

                            <input
                                label={'name'}
                                id='name'
                                maxLength={2}
                                className='form-input w-100'
                                type='text'
                                onKeyPress={e => numberOnly(e)}
                                name='name'
                                placeholder='YY'
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />
                        </div>

                        <Button onClick={submit} type="submit" className="btn_submit btn mt-5" size="lg">Thanh toán</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Visa;
