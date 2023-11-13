import { db } from "src/config/firebase";
import {
  getDoc,
  collection,
  doc,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
          email: data.email,
          name: data.name,
          phoneNumber: data.phoneNumber,
          companyID,
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

        const colRef = collection(db, "users");
        const documentRef = doc(colRef, uid);
        getDoc(documentRef)
          .then((doc) => {
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: { uid: doc.id, user: doc.data() },
            });
            dispatch({
              type: "CLEAR_COMPANY_ID",
            });
            onSuccess();
          })
          .catch((error) => toast.error(error.message));
      })
      .catch((err: any) => toast.error(err.message));
  } catch (error) {
    toast.error(error.message);
  }
};

export const reRegisterSnapshot = (uid: string) => async (dispatch: any) => {
  try {
    const colRef = await collection(db, "users");
    const docRef = await doc(colRef, uid);
    getDoc(docRef)
      .then((doc) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { uid: doc.id, user: doc.data() },
        });
      })
      .catch((err: any) => toast.error(err.message));
  } catch (error) {
    toast.error(error.message);
  }
};
