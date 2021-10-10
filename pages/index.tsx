import { useState, useEffect } from "react"
import Head from "next/head"
// import styles from "../styles/Home.module.css"

import db from "../src/firebase/client"
import { collection, onSnapshot } from "@firebase/firestore"
import { createNote } from "../src/utils/notes"

export default function Home() {
  const [noteList, setNoteList] = useState([])

  // subscribe to 'notes' collection
  useEffect(() => {
    const collectionRef = collection(db, "notes")
    const unsub = onSnapshot(collectionRef, (snapshot: any) =>
      setNoteList(
        snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
      )
    )

    return unsub
  }, [])

  return (
    <div>
      <Head>
        <title>Create Note App</title>
        <meta name="description" content="Create Note" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid min-h-screen items-center justify-center">
        <div className="grid gap-2">
          <button
            className="bg-green-400 text-white rounded-lg p-2 w-full"
            onClick={createNote}
          >
            Create Note
          </button>

          <ul className="grid gap-2">
            {noteList.map((note: any) => (
              <li key={note.id} className="px-5 py-3 rounded-lg bg-gray-100">
                <h1 className="my-h5 text-green-400">{note.title}</h1>
                <p className="mt-[2px] text-sm text-gray-600">{note.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
