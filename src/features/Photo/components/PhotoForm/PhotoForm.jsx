import React from 'react'
import {
  Button,
  FormGroup,
  Spinner,
} from 'reactstrap'
import { PHOTO_CATEGORY_OPTIONS } from 'constants/global'
import {  Formik, Form, FastField } from 'formik'
import InputField from 'custom-field/InputField'
import SelectField from 'custom-field/SelectField'
import RandomPhotoField from 'custom-field/RandomPhotoField'
import * as Yup from 'yup'
import { PropTypes } from 'prop-types'

const PhotoForm = (props) => {
   const initialValues = props.initialValues

   const validationSchema = Yup.object().shape({
     title: Yup.string().required('This field is required'),
     categoryId: Yup.number()
        .required('This is field is required')
        .nullable(),
     photo: Yup.string().when('categoryId', {
       is: 1,
       then: Yup.string().required('This is field is required'),
       otherwise: Yup.string().notRequired(),
     })
   })

    return (
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={props.onSubmit}
          >
            {
              formikProps => {
                const { isSubmitting } = formikProps

                return (
                  <Form>
                    <FastField 
                      name="title"
                      component={InputField}

                      label="Title"
                      placeholder="Eg: Wow nature ..."
                    />

                    <FastField 
                      name="categoryId"
                      component={SelectField}

                      label="Category"
                      placeholder="What's your photo category?"
                      options={PHOTO_CATEGORY_OPTIONS}
                    />

                    <FastField 
                     name="photo"
                     component={RandomPhotoField}
                     label="Photo"
                    />
        
                    <FormGroup>
                        <Button
                          type="submit"
                          color={props.isAddMode ? 'primary' : 'success'}
                        >
                          {isSubmitting && <Spinner size="sm" />}
                           {props.isAddMode ? 'Add to album' : 'Update your photo'}
                        </Button>
                    </FormGroup>
                  </Form>
               )
              }
            }
          </Formik>
        </div>
    )
}

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
  onSubmit: null,
}


export default PhotoForm
