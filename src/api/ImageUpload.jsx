import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../firebaseConfig"
import { editProfile } from "./FirestoreAPI"


export const uploadImageAPI = (file, id, setModalOpen, setProgress, setCurrentImage) => {
    const profilePicsRef = ref(storage, `files/${file.name}`)
    const uploadTask = uploadBytesResumable(profilePicsRef, file)

    uploadTask.on('state_changed', (snapshot) => {
        const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
    }, (error) => {
        console.error(error)
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((response) => {
            editProfile(id, { imageLink: response });
            setModalOpen(false)
            setCurrentImage({})
            setProgress(0)
        })
    })
}

export const uploadPostImage = (file, setPostImage, setProgress) => {
    const postPicsRef = ref(storage, `files/${file.name}`)
    const uploadTask = uploadBytesResumable(postPicsRef, file)

    uploadTask.on('state_changed', (snapshot) => {
        const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        
    }, (error) => {
        console.error(error)
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((response) => {
            setPostImage(response);
        })
    })
}