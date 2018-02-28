import {initializeApp} from 'firebase'

const app = initializeApp({
  apiKey: "AIzaSyAU6sve44mR9PMZ0NfUsuLw2bTfxOwMhlA",
  authDomain: "kanban-11a1b.firebaseapp.com",
  databaseURL: "https://kanban-11a1b.firebaseio.com",
  projectId: "kanban-11a1b",
  storageBucket: "kanban-11a1b.appspot.com",
  messagingSenderId: "110012456642"
})
  
export const db = app.database()
export const taskRef = db.ref('task')

