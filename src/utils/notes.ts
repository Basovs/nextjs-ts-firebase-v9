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
export const getAllNotes = async () => {
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
