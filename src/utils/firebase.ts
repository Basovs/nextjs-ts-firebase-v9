import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  WhereFilterOp,
} from "@firebase/firestore"
import db from "../firebase/client"

// set doc with specific ID
// OBS setDoc is dangerous - can owerwrite whole doc
export const setDocWithSpecificID = async (
  collectionName: string,
  payload: object,
  id: string
) => {
  console.log("setDocWithSpecificID")

  await setDoc(doc(db, collectionName, id), payload)
}

// create doc with specific ID with 'merge' option to
// prevent overwrite of whole doc
export const mergeDocWithSpecificID = async (
  collectionName: string,
  payload: object,
  id: string
) => {
  console.log("mergeDocWithSpecificID")

  await setDoc(doc(db, collectionName, id), payload, { merge: true })
}
// update doc with specific ID with 'merge' option to
// prevent overwrite of whole doc
export const updateDocItem = async (
  collectionName: string,
  payload: object,
  id: string
) => {
  console.log("updateDocItem")

  const docRef = doc(db, collectionName, id)
  await setDoc(docRef, payload, { merge: true })
}

// add doc with firebase auto ID
export const createDocWithAutoID = async (
  collectionName: string,
  payload: object
) => {
  console.log("createDocWithAutoID")

  const collectionRef = collection(db, collectionName)
  const newDocRef = await addDoc(collectionRef, payload)
  // console.log("The new doc ID is: ", newDocRef.id)

  return newDocRef
}

// get doc
export const getSingleDoc = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data())
    return docSnap
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!")
  }
}

// get all docs in a collection
export const getAllDocs = async (collectionName: string) => {
  const docList = await getDocs(collection(db, collectionName))

  return docList
}

// get multiple docs with query - this is just a example - there is alot more filter operators
export const getMultipleDocs = async (
  collectionName: string,
  key: string,
  queryOperator: WhereFilterOp,
  value: any
) => {
  const q = query(
    collection(db, collectionName),
    where(key, queryOperator, value)
  )
  const querySnapshot = await getDocs(q)

  return querySnapshot
}

// delete doc
export const deleteItem = async (collectionName: string, id: string) => {
  console.log("Deleting doc")

  await deleteDoc(doc(db, collectionName, id))
}

// delete doc field
export const deleteDocField = async (
  collectionName: string,
  id: string,
  fieldName: string
) => {
  console.log("Deleting doc field")

  const docRef = doc(db, collectionName, id)

  await updateDoc(docRef, {
    [fieldName]: deleteField(),
  })
}
