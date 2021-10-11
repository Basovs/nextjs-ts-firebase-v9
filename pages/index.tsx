import { useState, useEffect } from "react"
import Head from "next/head"
// import styles from "../styles/Home.module.css"

import db from "../src/firebase/client"
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore"
import {
  createNote,
  updateNote,
  deleteNote,
  getNote,
  getAllNotes,
  getMultipleNotes,
} from "../src/utils/notes"

export default function Home() {
  const [noteList, setNoteList] = useState([])
  const [note, setNote] = useState<DocumentData | undefined>(undefined)
  const [noteListOnce, setNoteListOnce] = useState<DocumentData[]>([])
  const [multipleNoteList, setMultipleNoteList] = useState<DocumentData[]>([])

  // subscribe to 'notes' collection
  useEffect(() => {
    const collectionRef = collection(db, "notes")
    const q = query(collectionRef, orderBy("createdAt", "desc"))
    const unsub = onSnapshot(q, (snapshot: any) =>
      setNoteList(
        snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
      )
    )

    return unsub
  }, [])

  // get one specific note
  useEffect(() => {
    const getNoteDoc = async () => {
      const noteID = "XFteojhHOMD6rHH03pWD"
      const noteDoc = await getNote(noteID)
      // console.log("noteDoc", noteDoc?.data())
      setNote(noteDoc?.data())
    }
    getNoteDoc()
  }, [])

  // get all notes in a collection
  useEffect(() => {
    const getAllDocs = async () => {
      const noteList = await getAllNotes()

      setNoteListOnce(noteList.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }
    getAllDocs()
  }, [])

  // get multiple notes
  useEffect(() => {
    const getMultipleDocs = async () => {
      const multipleNoteList = await getMultipleNotes()

      setMultipleNoteList(
        multipleNoteList.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      )
    }
    getMultipleDocs()
  }, [])

  return (
    <div>
      <Head>
        <title>Create Note App</title>
        <meta name="description" content="Create Note" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid min-h-screen items-center justify-center">
        <div className="grid gap-5">
          <button
            className="bg-emerald-400 hover:bg-emerald-500 text-white w-full my-btn"
            onClick={createNote}
          >
            Create Note
          </button>

          {note && (
            <div className="grid gap-2">
              <h2 className="font-medium">getDoc - used 'getDoc'</h2>
              <div
                key={note.id}
                className="grid gap-4 grid-flow-col justify-between px-5 py-3 rounded-lg bg-gray-100"
              >
                <div>
                  <h1 className="my-h5 text-emerald-400">{note.title}</h1>
                  <p className="mt-[2px] text-sm text-gray-600">{note.text}</p>
                </div>

                <div className="grid grid-flow-col gap-2 content-center">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm my-btn"
                    onClick={() => updateNote(note.id)}
                  >
                    update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600  text-white rounded-lg text-sm my-btn"
                    onClick={() => deleteNote(note.id)}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {noteListOnce && (
            <div className="grid gap-2">
              <h2 className="font-medium">getAllDocsOnce</h2>

              <ul className="grid gap-2">
                {noteListOnce.map((note: any) => (
                  <li
                    key={note.id}
                    className="grid gap-4 grid-flow-col justify-between px-5 py-3 rounded-lg bg-gray-100"
                  >
                    <div>
                      <h1 className="my-h5 text-emerald-400">{note.title}</h1>
                      <p className="mt-[2px] text-sm text-gray-600">
                        {note.text}
                      </p>
                    </div>

                    <div className="grid grid-flow-col gap-2 content-center">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white my-btn"
                        onClick={() => updateNote(note.id)}
                      >
                        update
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white my-btn"
                        onClick={() => deleteNote(note.id)}
                      >
                        delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {multipleNoteList && (
            <div className="grid gap-2">
              <h2 className="font-medium">
                Multiple doc list with 'query' once, 'title', '==', '222'
              </h2>

              <ul className="grid gap-2">
                {multipleNoteList.map((note: any) => (
                  <li
                    key={note.id}
                    className="grid gap-4 grid-flow-col justify-between px-5 py-3 rounded-lg bg-gray-100"
                  >
                    <div>
                      <h1 className="my-h5 text-emerald-400">{note.title}</h1>
                      <p className="mt-[2px] text-sm text-gray-600">
                        {note.text}
                      </p>
                    </div>

                    <div className="grid grid-flow-col gap-2 content-center">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white my-btn"
                        onClick={() => updateNote(note.id)}
                      >
                        update
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white my-btn"
                        onClick={() => deleteNote(note.id)}
                      >
                        delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {noteList && (
            <div className="grid gap-2">
              <h2 className="font-medium">
                onSnapshot - used 'onSnapshot' to subscribe to live changes
              </h2>

              <ul className="grid gap-2">
                {noteList.map((note: any) => (
                  <li
                    key={note.id}
                    className="grid gap-4 grid-flow-col justify-between px-5 py-3 rounded-lg bg-gray-100"
                  >
                    <div>
                      <h1 className="my-h5 text-emerald-400">{note.title}</h1>
                      <p className="mt-[2px] text-sm text-gray-600">
                        {note.text}
                      </p>
                    </div>

                    <div className="grid grid-flow-col gap-2 content-center">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white my-btn"
                        onClick={() => updateNote(note.id)}
                      >
                        update
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white my-btn"
                        onClick={() => deleteNote(note.id)}
                      >
                        delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
