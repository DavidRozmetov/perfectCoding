import { initializeApp } from "firebase/app";
import {
  deleteDoc,
  doc,
  getDoc,
  getDocFromCache,
  addDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { app } from "./Auth";

const db = getFirestore(app);

export const FbAdd = async (cl, uid, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await setDoc(doc(db, cl, uid), data);
      resolve({
        status: 200,
        message: "data added successfully",
      });
    } catch (error) {
      reject(
        resolve({
          status: 400,
          message: error.message,
        })
      );
    }
  });
};

export const FbAddWithoutUID = async (cl, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await addDoc(collection(db, cl), data).then((res) => {
        resolve({
          status: 200,
          message: "status updated successfully",
        });
      });
    } catch (error) {
      reject(
        resolve({
          status: 400,
          message: error.message,
        })
      );
    }
  });
};
export const readCollection = (collectionName) => {
  return new Promise(async (resolve, reject) => {
    const q = query(collection(db, collectionName));
    let newData = [];

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        newData.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      resolve(newData);
    } catch (error) {
      reject(error);
    }
  });
};

export const readFilteredCollection = (
  collectionName,
  filterName,
  filterData
) => {
  return new Promise(async (resolve, reject) => {
    const q = query(
      collection(db, collectionName),
      where(filterName, "==", filterData)
    );

    let newData = [];

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        newData.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      resolve(newData);
    } catch (error) {
      reject(error);
    }
  });
};

export const readData = (collectionName, uid) => {
  return new Promise(async (resolve, reject) => {
    const docRef = doc(db, collectionName, uid);

    try {
      const docSnap = await getDoc(docRef);

      resolve(docSnap.data());
    } catch (error) {
      reject(error);
    }
  });
};

export const updateData = (collectionName, uid, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await setDoc(doc(db, collectionName, uid), data);

      resolve({
        status: 200,
        messsage: "Data Updated Successfully",
      });
    } catch (error) {
      reject({
        status: 400,
        messsage: error,
      });
    }
  });
};

export const deleteData = (collectionName, uid) => {
  return new Promise(async (resolve, reject) => {
    const docRef = doc(db, collectionName, uid);

    try {
      await deleteDoc(doc(db, collectionName, uid));

      resolve({
        status: 200,
        messsage: "Data Deleted Successfully",
      });
    } catch (error) {
      reject({
        status: 400,
        messsage: error,
      });
    }
  });
};
