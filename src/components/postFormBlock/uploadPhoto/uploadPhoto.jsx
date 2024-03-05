import './uploadPhoto.scss'
import { forwardRef } from 'react'

const UploadPhoto = forwardRef(({handleFileChange, selectedFile, photoError}, ref) => {
    return (
        <div className={'user-data-wrapper ' + (photoError ? ' _error' : '')}>
            <div className={'file-upload'}>
                <span className={'upload-button'}>Upload</span>
                <span className={'upload-title ' + (selectedFile?.name ? ' filled' : '')}>
                        {selectedFile?.name || 'Upload your photo'}
                </span>
                <input type="file"
                       ref={ref}
                       onChange={handleFileChange}
                       title={'Add your photo in jpeg format and less then 5Mb'}
                       name={'photo'}
                       accept={'image/jpeg'} />
            </div>
            <div className={'message'}>
                {photoError}
            </div>
        </div>
    );
});

export default UploadPhoto;