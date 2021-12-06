import { PropTypes } from 'prop-types'
import React from 'react'
import { Button } from 'reactstrap'
import './RandomPhoto.scss'

const getRandomImageUrl = () => {
    const randomId = Math.floor(Math.random() * 1000)
    return `https://picsum.photos/id/${randomId}/300/300`
}


const RandomPhoto = (props) => {
    const  { name, imageUrl, onImageUrlChange, onRandomButtonBlur } = props

    const handleRandomPhotoClick = async () => {
        if(onImageUrlChange) {
            const randomImageUrl = getRandomImageUrl()
            onImageUrlChange(randomImageUrl)
        }
    }

    return (
        <div className="random-photo">
            <div className="random-photo__button">
                <Button
                 outline
                 name={name}
                 color="primary"
                 onBlur={onRandomButtonBlur}
                 onClick={handleRandomPhotoClick}
                >
                    Random a photo
                </Button>
            </div>

            <div className="random-photo__photo mt-3">
                {imageUrl &&
                   <img
                    src={imageUrl}
                    alt="OOps ... not found.Please click random again"
                    onError={ (e) => e.target.src = handleRandomPhotoClick() }
                   />
                }
            </div>
        </div>
    )
}

RandomPhoto.prototype = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    onImageUrlChange: PropTypes.func,
    onRandomButtonBlur: PropTypes.func,
}

RandomPhoto.defaultProps = {
    name: '',
    imageUrl: '',
    onImageUrlChange: null,
    onRandomButtonBlur: null
}

export default RandomPhoto
