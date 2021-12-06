import React from 'react'
import Banner from '../../../../components/Banner/Banner'
import Images from '../../../../constants/images'
import { Container } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PhotoList from 'features/Photo/components/PhotoList'
import { removePhoto } from 'features/Photo/PhotoSlice'

const MainPage = () => {
    const photos = useSelector(state => state.photos)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleEditClick = (photo) => {
      const editPhotoUrl = `/photos/add/${photo.id}`
      navigate(editPhotoUrl)
    }

    const handleRemoveClick = (photo) => {
      dispatch(removePhoto(photo.id))
    }
   
    return (
        <div className="photo-main">
            <Banner 
              title="Your awesome photos"
              backgroundUrl={Images.PINK_BG}
            />

            <Container
              className="text-center"
            >
              <Link
               className="d-block mt-3 text-decoration-none"
               to="/photos/add"
              >
                  Add new photo
              </Link>

            <PhotoList 
              photoList={photos}
              onPhotoEditClick={handleEditClick}
              onPhotoRemoveClick={handleRemoveClick}
            />
            </Container>
        </div>
    )
}

export default MainPage
