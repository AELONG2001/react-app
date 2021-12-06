import React from 'react'
import {
    FormGroup,
    Label,
    FormFeedback,
} from 'reactstrap'
import Select from 'react-select'
import { ErrorMessage } from 'formik'
import './style.scss'

const SelectField = (props) => {
   const { field, form, options, label, placeholder } = props
   const { name, value } = field
   const { errors, touched } = form
   const showError = errors[name] && touched[name]

   const selectedOption = options.filter(option => option.value === value)

   const handleSelectedOptionChange = (selectedOption) => {
       const selectedValue = selectedOption
        ? selectedOption.value
        : selectedOption

        const changeEvent = {
            target: {
                name: name,
                value: selectedValue
            }
        }

        field.onChange(changeEvent)
   }

    return (
        <FormGroup>
            {label && <Label for={name}> {label} </Label>}
         
            <Select
                className={showError && 'is-invalid valid-selected'}
                id={name}
                {...field}
                value={selectedOption}
                onChange={handleSelectedOptionChange}

                placeholder={placeholder}
                options={options}
            />
            {showError && <ErrorMessage name={name} component={FormFeedback}/>}
        </FormGroup>
    )
}


SelectField.apply.defaultProps = {
    label: '',
    placeholder: '',
    options: [],
}

export default SelectField
