import Banner from 'components/Banner/Banner'
import PhotoForm from 'features/Photo/components/PhotoForm/PhotoForm'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { addPhoto, updatePhoto } from 'features/Photo/PhotoSlice'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';

const AddEditPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { photoId } = useParams()
    const isAddMode = !photoId

    //get value from redux
    const editedPhoto = useSelector(state => state.photos.find(photo => photo.id ===  +photoId))

    const initialValues = isAddMode
     ? {
        title: '',
        categoryId: null,
        photo: '',
       }
     : editedPhoto

    const handleSubmit = (values) => {
      return new Promise(resolve => {
        setTimeout(() => {
            if(isAddMode) {
                dispatch(addPhoto(values))
                return
            }else {
               dispatch(updatePhoto(values))
            }

            navigate('/photos')
            resolve(true)
        }, 2000)
      })
    }

    return (
        <div className="photo-edit">
            <Banner 
             title="Pick your amazing photo"
            />

            <div className="photo-edit_form">
                <PhotoForm
                 isAddMode={isAddMode}
                 initialValues={initialValues}
                 onSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}

export default AddEditPage
