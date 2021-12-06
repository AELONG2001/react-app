import { PropTypes } from 'prop-types'
import React from 'react'
import { FormFeedback, FormGroup, Label } from 'reactstrap'
import RandomPhoto from 'components/RandomPhoto'
import { ErrorMessage } from 'formik'

const RandomPhotoField = (props) => {
    const { field, form, label } = props
    const { name, value, onBlur } = field
    
    const { errors, touched } = form
    const showError = errors[name] && touched[name]

    const handleImageChange = (newImageUrl) => {
        form.setFieldValue(name, newImageUrl)
    }

    return (
        <FormGroup>
            {label && <Label for={name}> {label} </Label>}

            <RandomPhoto
              name={name}
              imageUrl={value}
              onImageUrlChange={handleImageChange}
              onRandomButtonBlur={onBlur}
            />
            <div className={showError && 'is-invalid'}></div>
            {showError && <ErrorMessage name={name} component={FormFeedback} />}
        </FormGroup>
    )
}

RandomPhotoField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string
}

RandomPhotoField.defaultProps = {
    label: '',
}

export default RandomPhotoField
