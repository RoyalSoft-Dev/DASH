import { db } from "src/config/firebase";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  setDoc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { toast } from "react-toastify";

export const getCompanyID = (password: string, onSuccess: any) => async (
  dispatch: any
) => {
  try {
    const docRef = query(
      collection(db, "company"),
      where("password", "==", password)
    );

    const querySnapshot = await getDocs(docRef);

    if (querySnapshot.empty) {
      toast.error("No company with the password");
      return;
    } else {
      await querySnapshot.forEach((doc) => {
        dispatch({
          type: "GET_COMPANY_ID",
          payload: doc.id,
        });
        onSuccess();
      });
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const registerUser = (
  companyID: string,
  data: any,
  onSuccess: any
) => async (dispatch: any) => {
  try {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((credential) => {
        const uid = credential.user.uid;
        const colRef = collection(db, "users");
        const documentRef = doc(colRef, uid);
        setDoc(documentRef, {
          id: uid,
          email: data.email,
          name: data.name,
          phoneNumber: data.phoneNumber,
          notification: false,
          companyID,
          createdAt: serverTimestamp(),
        })
          .then(() => {
            dispatch({
              type: "CLEAR_COMPANY_ID",
            });
            onSuccess();
          })
          .catch((error: any) => {
            toast.error(error.message);
          });
      })
      .catch((err: any) => toast.error(err.message));
  } catch (error) {
    toast.error(error.message);
  }
};

export const loginUser = (data: any, onSuccess: any) => async (
  dispatch: any
) => {
  try {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((credential) => {
        const uid = credential.user.uid;

        const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { uid: doc.id, user: { id: doc.id, ...doc.data() } },
          });
          dispatch({
            type: "CLEAR_COMPANY_ID",
          });
          onSuccess();
        });
      })
      .catch((err: any) => toast.error(err.message));
  } catch (error) {
    toast.error(error.message);
  }
};

export const reRegisterSnapshot = (uid: string, onSuccess: any) => async (
  dispatch: any
) => {
  try {
    const unsub = await onSnapshot(doc(db, "users", uid), async (doc) => {
      console.log(doc.data());
    });
  } catch (error) {
    toast.error(error.message);
  }
};

export const uploadAvatar = (
  id: string,
  previousURL: string,
  file: any,
  onSuccess: any
) => async (dispatch: any) => {
  try {
    dispatch(loader(true));
    if (file.length !== 0) {
      const storage = getStorage();
      const storageRef = ref(storage, "avatar/" + file.name);
      uploadBytes(storageRef, file)
        .then((snapShot) => {
          return getDownloadURL(snapShot.ref);
        })
        .then((downloadURL) => {
          const docRef = doc(db, "users", id);
          updateDoc(docRef, {
            avatar: downloadURL,
            createdAt: serverTimestamp(),
          })
            .then(() => {
              dispatch(
                getUser(id, () => {
                  onSuccess();
                })
              );
            })
            .catch((err: any) => toast.error(err.message));
          // onSuccess(downloadURL);
        })
        .catch((err: any) => toast.error(err.message));
    }
    dispatch(loader(false));
  } catch (error) {
    dispatch(loader(false));
    toast.error(error.message);
  }
};

export const getUser = (id: string, onSuccess: any) => async (
  dispatch: any
) => {
  try {
    const docRef = await doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch({
        type: "UPDATE_USER",
        payload: docSnap.data(),
      });
      onSuccess();
    } else {
      toast.error("Fail the updating");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUser = (id: string, data: any, onSuccess: any) => async (
  dispatch: any
) => {
  try {
    dispatch(loader(true));
    const auth: any = getAuth();
    const user = auth.currentUser;
    const docRef = await doc(db, "users", id);

    if (user?.email != data.email) {
      console.log(1);
      updateEmail(user, data.email)
        .then(() => {
          updateDoc(docRef, { ...data, createdAt: serverTimestamp() })
            .then(() => {
              dispatch(
                getUser(id, () => {
                  if (data.newPassword) {
                    updatePassword(user, data.newPassword)
                      .then(() => {
                        const authCredential = EmailAuthProvider.credential(
                          data.email,
                          data.newPassword
                        );
                        reauthenticateWithCredential(user, authCredential);
                        onSuccess();
                      })
                      .catch((error: any) => toast.error(error.message));
                  } else onSuccess();
                })
              );
            })
            .catch((err: any) => toast.error(err.message));
        })
        .catch((err) => toast.error(err.message));
    } else {
      console.log(2);
      updateDoc(docRef, { ...data, createdAt: serverTimestamp() })
        .then(() => {
          dispatch(
            getUser(id, () => {
              if (data.newPassword) {
                updatePassword(user, data.newPassword)
                  .then(() => {
                    // const authCredential = EmailAuthProvider.credential(
                    //   data.email,
                    //   data.newPassword
                    // );
                    // reauthenticateWithCredential(user, authCredential);
                    onSuccess();
                  })
                  .catch((error: any) => toast.error(error.message));
              } else onSuccess();
            })
          );
        })
        .catch((err: any) => toast.error(err.message));
    }
  } catch (error) {
    dispatch(loader(false));
    toast.error(error.message);
  }
};

const loader = (loading: boolean) => async (dispatch: any) => {
  dispatch({
    type: "LOADING",
    payload: loading,
  });
};
