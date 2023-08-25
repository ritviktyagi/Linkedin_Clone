import { addDoc, collection, deleteDoc, doc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { toast } from 'react-toastify';

let dbRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");
let likeRef = collection(firestore, "likes");
let commentsRef = collection(firestore, "comments");
let connectionRef = collection(firestore, "connections");

export const postStatus = (object) => {
    addDoc(dbRef, object)
        .then((res) => { 
            toast.success("Post has been added successfully");      
        })
        .catch((err) => {
            console.log(err);
        })
}

export const getStatus = (setAllStatus) => {
    onSnapshot(dbRef, (response) => {
        setAllStatus(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })
        )
    })
}

export const postUserData = (object) => {
    addDoc(userRef, object)
        .then(() => {})
        .catch((err) => {
            console.log(err)
        })
}

export const getCurrentUser = (setCurrentUser) => {
    onSnapshot(userRef, (response) => {
        setCurrentUser(
            response.docs.map((docs) => {
                return { ...docs.data(), userID: docs.id };
            })
            .filter((item) => {
                return item.email === localStorage.getItem("userEmail");
            })[0]
        )
    })
}

export const editProfile = (userID, payload) => {
    let userToEdit = doc(userRef, userID)

    updateDoc(userToEdit, payload)
        .then(() => {
            toast.success("Profile has been updated successfully");
        })
        .catch((err) => {
            console.log(err)
        })
}

export const getSingleStatus = (setAllStatus, email) => {
    const singlePostQuery = query(dbRef, where("userEmail", "==", email));
    onSnapshot(singlePostQuery, (response) => {
        setAllStatus(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })
        )
    })
}

export const getSingleUser = (setCurrentUser, email) => {
    const singleUserQuery = query(userRef, where("email", "==", email));
    onSnapshot(singleUserQuery, (response) => {
        setCurrentUser(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })[0]
        )
    }) 
}

export const likePost = (userId, postId, liked) => {
    try {
        let docToLike = doc(likeRef, `${userId}_${postId}`);
        if(liked){
            deleteDoc(docToLike);
        }
        else{
            setDoc(docToLike, { userId, postId });   
        }
    } catch (error) {
        console.log(error)
    }
}

export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
    try {
        let likeQuery = query(likeRef, where("postId", "==", postId));

        onSnapshot(likeQuery, (response) => {
            let likes = response.docs.map((doc) => doc.data());
            let likesCount = likes?.length;

            const isLiked = likes.some((like) => like.userId === userId);

            setLikesCount(likesCount);
            setLiked(isLiked);
        })
    } catch (error) {
        console.log(error)
    }
}

export const postComment = (postId, comment, timeStamp, name) => {
    try {
        addDoc(commentsRef, {
            postId,
            comment,
            timeStamp,
            name
        })
    } catch (error) {
        console.log(error)
    }
}

export const getComments = (postId, setComments) => {
    try {
        let singlePostQuery = query(commentsRef, where("postId", "==", postId));

        onSnapshot(singlePostQuery, (response) => {
            const comments = response.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })

            setComments(comments);
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllUsers = (setAllUsers) => {
    onSnapshot(userRef, (response) => {
        setAllUsers(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })
        )
    })   
}

export const updatePost = (id, status, postImage) => {
    let docToUpdate = doc(dbRef, id);

    try {
        updateDoc(docToUpdate, { status, postImage })
        toast.success("Post has been updated!");
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => {
    let docToDelete = doc(dbRef, id);

    try {
        deleteDoc(docToDelete);
        toast.success("Post has been deleted");
    } catch (error) {
        console.log(error)
    }
}

export const addConnection = (userId, targetId) => {
    try {
        let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`);

        setDoc(connectionToAdd, { userId, targetId });   
        toast.success("Connection added!");
    } catch (error) {
        console.log(error)
    }
}

export const getConnections = (userId, targetId, setIsConnected) => {
    try {
        let connectionsQuery = query(connectionRef, where("targetId", "==", targetId));

        onSnapshot(connectionsQuery, (response) => {
            let connections = response.docs.map((doc) => doc.data());

            const isConnected = connections.some((connection) => connection.userId === userId);
            setIsConnected(isConnected);
        })
    } catch (error) {
        console.log(error)
    }
}