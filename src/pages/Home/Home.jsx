import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { db } from "../../firebase/firebase"; // Adjust the import based on your structure
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [showCommentField, setShowCommentField] = useState({});

  useEffect(() => {
    const fetchNotes = async () => {
      const notesCollection = collection(db, "notes");
      const notesSnapshot = await getDocs(notesCollection);
      const notesList = notesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesList);
    };

    fetchNotes();
  }, []);

  const handleCommentChange = (noteId, event) => {
    setNewComment({ ...newComment, [noteId]: event.target.value });
  };

  const toggleCommentField = (noteId) => {
    setShowCommentField((prev) => ({ ...prev, [noteId]: !prev[noteId] }));
  };

  const handleAddComment = async (noteId) => {
    if (!newComment[noteId]) return;

    // Add a new comment to the comments sub-collection
    const commentData = {
      noteId: noteId,
      userId: "someUserId", // Replace with actual user ID from your auth
      text: newComment[noteId],
      createdAt: new Date(),
    };

    await addDoc(collection(db, "notes", noteId, "comments"), commentData);

    // Optionally, you can fetch comments again or just update the state
    setNewComment({ ...newComment, [noteId]: "" });
    toggleCommentField(noteId); // Hide the comment input after submission
  };

  return (
    <Container style={{marginTop : "30px"}}>
      <Typography variant="h3" fontWeight="bold" textAlign="center">Notes</Typography>


      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{note.title}</Typography>
                <Typography variant="body2">{note.content}</Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <IconButton onClick={() => toggleCommentField(note.id)}>
                    <CommentIcon />
                  </IconButton>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Box>
                {showCommentField[note.id] && (
                  <Box mt={2}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Add a comment..."
                      value={newComment[note.id] || ""}
                      onChange={(event) => handleCommentChange(note.id, event)}
                    />
                    <Button onClick={() => handleAddComment(note.id)} color="primary" sx={{ mt: 1 }}>
                      Submit
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
