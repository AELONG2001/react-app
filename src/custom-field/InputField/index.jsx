import React from 'react'
import PropTypes from 'prop-types'
import {
    FormGroup,
    Input,
    Label,
    FormFeedback,
} from 'reactstrap'

import { ErrorMessage } from 'formik'


const InputField = (props) => {
    const { field, form, type, label, placeholder } = props

    const { name } = field

    const { errors, touched } = form
    const showError = errors[name] && touched[name]

    return (
        <FormGroup>
            {label && <Label for={name}> {label} </Label>}
            <Input
              id={name}
              {...field}

              type={type}
              disable="false"
              placeholder={placeholder}
              invalid={showError}
            />

            <ErrorMessage name={name} component={FormFeedback} />
        </FormGroup>
    )
}

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disable: PropTypes.bool,
}

InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
}

export default InputField
