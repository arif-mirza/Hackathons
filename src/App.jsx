import MainRouting from "./Routing/MainRouting";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./store/Slices/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser(setLoading));
  }, [dispatch]);





  return <>
  
  {loading ? <h1>Loading...</h1> : <MainRouting />}</>;
}

export default App;
