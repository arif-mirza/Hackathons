import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDoc,
  query,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.js";
import { Timestamp } from "firebase/firestore";

// thunks functions

// function for add data in firebase

export const addNoteTodb = createAsyncThunk(
  "notes/addNoteTodb",
  async (note) => {
    try {
      const collecionRef = collection(db, "notes");
      const response = await addDoc(collecionRef, {
        ...note,
        createdAt: Timestamp.now(),
        lastEditedAt: Timestamp.now(),
      });
      console.log("data is added in firebase db", response);
      return { ...note, docId: response.id };
      
    } catch (error) {
      console.log("error during adding data from db", error);
    }
  }
);

// function for reading the data
export const getNoteTodb = createAsyncThunk("notes/getNoteTodb", async () => {
  try {
    const collectionRef = collection(db, "notes");
    const queryRef = query(collectionRef);

    // one time data read krne k liye
    const docRes = await getDocs(queryRef);
    let data = [];
    docRes.forEach((singleDocument) => {
      // console.log(singleDocument.data());
      data.push({
        docId: singleDocument.id,

        ...singleDocument.data(),
      });
    });
    console.log(data);

    return data;
  } catch (error) {
    console.log("error during reading data from db", error);
  }
});

// funtion for delete data
export const deleteNoteTodb = createAsyncThunk(
  "feeds/deleteNoteTodb",
  async (docId) => {
    try {
      if (!docId) throw new Error("Document ID is undefined.");
      const docRef = doc(db, "notes", docId);
      await deleteDoc(docRef);
      console.log("Deleted notes ID:", docId);

      return docId;
    } catch (error) {
      console.log("error during deleting data from db", error);
    }
  }
);

// Function for updating data in Firebase
export const updateNoteTodb = createAsyncThunk(
  "notes/updateNoteTodb",
  async (note) => {
    try {
      const docRef = doc(db, "notes", note.docId);
      await updateDoc(docRef, {
        ...note,
        lastEditedAt: Timestamp.now(),
        lastEditedBy: note.userId,
      });
      console.log("Data updated in Firebase DB:", note);
      return note; // Return the updated note with docId
    } catch (error) {
      console.log("Error during updating data in DB:", error);
      throw error; // Rethrow the error for proper error handling
    }
  }
);


// simple functions
const initialState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      console.log("adding note in reducer", action.payload);
      state.notes = action.payload;
    },
  },
  // builder functions
  extraReducers: (builder) => {
    builder.addCase(addNoteTodb.fulfilled, (state, action) => {
      console.log("data is storeed in builder", action.payload);

      state.notes = [action.payload, ...state.notes];
    });
    // data get karne k liye
    builder.addCase(getNoteTodb.fulfilled, (state, action) => {
      console.log("data is stored in builder", action.payload);
      state.notes = action.payload;
    });
    // delete post from firebase
    builder.addCase(deleteNoteTodb.fulfilled, (state, action) => {
      state.notes = state.notes.filter((post) => post.docId !== action.payload);
    });
    // update post in firebase
    builder.addCase(updateNoteTodb.fulfilled, (state, action) => {
      console.log("Data updated in builder (updateNoteTodb):", action.payload);
      state.notes = state.notes.map((note) =>
        note.docId === action.payload.docId ? action.payload : note
      );
    });
  },
});

export const { addNote } = notesSlice.actions;

export default notesSlice.reducer;
