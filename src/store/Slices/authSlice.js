import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  import { auth } from "../../firebase/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
// thunks functions

export const signup = createAsyncThunk("auth/signup", async (user) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const firebaseUser = userCredential.user;
      console.log(firebaseUser);
  
      let saveUserTodb = {
        username : user.username,
        email : user.email,
        password : user.password, 
        uid : userCredential.user.uid,
      };
  
      const collectionRef = doc(db, "users", userCredential.user.uid);
      await setDoc(collectionRef, saveUserTodb);
      console.log("user is signed in", saveUserTodb);
      return saveUserTodb;
      
    } catch (error) {
      console.log("error during create the signup data in DB", error);
    }
  });


  // login
export const login = createAsyncThunk("auth/login", async (user) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      console.log("userCredentials in login", userCredential.user.uid);
      const collectionRef = doc(db, "users", userCredential.user.uid);
      const docSnap = await getDoc(collectionRef);
      const dbUser = docSnap?.data();
      console.log("dbUser", dbUser);
  
      return dbUser;
    } catch (error) {
      console.log("error during login data in DB", error);
    }
  });

  // logout
export const logout = createAsyncThunk("auth/signout", async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      return true;
    } catch (error) {
      console.log("error during logout", error);
    }
  });

  // manage ofr curernt user
export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (setLoading, store) => {
      try {
        setLoading(true);
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            const dbUser = docSnap?.data();
            store.dispatch(setUser(dbUser));
            setLoading(false);
          } else {
            setLoading(false);
          }
        });
      } catch (error) {
        console.log("error during get current user", error);
      }
    }
  );







// simple functions

const initialState = {
    user: null,
  };
export const authSlice = createSlice({
    name: "auth",
    initialState,
  
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
      },
    },
    // builder functions
    extraReducers: (builder) => {
        // reducer for signup
    builder.addCase(signup.fulfilled, (state, action) => {
        console.log("builder action of Signup", action.payload);
        state.user = action.payload;
      });
       // reducer for login
    builder.addCase(login.fulfilled, (state, action) => {
        console.log("builder action of Login", action.payload);
        state.user = action.payload;
      });
       // reducer for logout
    builder.addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
       // reducer for currentuser
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
    }







});


// exports

export const { setUser } = authSlice.actions;
export default authSlice.reducer;