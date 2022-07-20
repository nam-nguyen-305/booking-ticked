import React from 'react';
import "./style.scss";
import { Form } from 'react-bootstrap'

function FormGroup({ label, id, maxLength, type, name, placeholder, value, handleChange, error, disabled, onClick }) {

    return (
        <Form.Group className="form-group" controlId={id}>
            <Form.Label className="form-label">{label} :</Form.Label>
            <Form.Control
                className="form-input"
                type={type}
                maxLength={maxLength}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                onClick={onClick}
            />
            {
                error && (
                    <span className="err">{error}</span>
                )
            }
        </Form.Group>
    );
}

export default FormGroup;
