import { addDoc, collection } from "@firebase/firestore"
import db from "../firebase/client"

// create doc
export const createDoc = async (collectionName: string, payload: object) => {
  console.log("Creating doc")

  const collectionRef = collection(db, collectionName)
  const newDocRef = await addDoc(collectionRef, payload)
  console.log("The new doc ID is: ", newDocRef.id)
}
