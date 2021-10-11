import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
} from "@firebase/firestore"
import db from "../firebase/client"
import {
  createDocWithAutoID,
  deleteItem,
  getAllDocs,
  getMultipleDocs,
  getSingleDoc,
  updateDocItem,
} from "./firebase"

// create note
export const createNote = async () => {
  const title = prompt("Title")
  const text = prompt("text")

  const payload = { title, text, createdAt: serverTimestamp() }

  const newDocRef = await createDocWithAutoID("notes", payload)
  // console.log("newDocRef", newDocRef)
}

// get all notes
export const subscribeToAllNotes = async () => {
  console.log("Getting noteList")
  const collectionRef = collection(db, "notes")

  const notes = await getDocs(collectionRef)
  notes.forEach(note => console.log("note: ", note.data()))
}
// subscribe to all notes
export const subscribeCollection = async (
  collectionName: string,
  setState: any
) => {
  console.log("subscribing to all docs in collection")

  const collectionRef = collection(db, collectionName)
  const unsub = onSnapshot(collectionRef, (snapshot: any) =>
    setState(snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })))
  )

  return unsub
}

// get one note
export const getNote = async (id: string) => {
  console.log("Getting note")

  const note = await getSingleDoc("notes", id)

  return note
}

// get all docs in a collection
export const getAllNotes = async () => {
  const noteSnapshot = await getAllDocs("notes")

  return noteSnapshot
}

// get multiple notes with query
export const getMultipleNotes = async () => {
  const multipleNotes = await getMultipleDocs("notes", "title", "==", "222")

  return multipleNotes
}

// update note
export const updateNote = async (id: string) => {
  console.log("Updating note")

  const title = prompt("Title")
  const text = prompt("text")

  const payload = { title, text }

  updateDocItem("notes", payload, id)
}

// delete note
export const deleteNote = async (id: string) => {
  console.log("Deleting note")

  deleteItem("notes", id)
}
