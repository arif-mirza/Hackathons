import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteTodb, getNoteTodb } from "../../store/Slices/notesSlice";
import { updateNoteTodb } from "../../store/Slices/notesSlice";
import { format, formatDistanceToNow } from "date-fns";


function AllNotes() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    title: "",
    description: "",
  });
  const [currentId, setCurrentId] = useState(null);
  const notes = useSelector((store) => store.notesSlice.notes);
  console.log("data in useSelector", notes);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNotes = async () => {
      await dispatch(getNoteTodb());
      setLoading(false);
    };
    fetchNotes();
  }, [dispatch]);

  useEffect(() => {
    if (notes) {
    }
  }, []);

  // delete data functionality
  const handleDeleteNote = (docId) => {
    // dispatch(deleteNote(docId));
    console.log("docId to delete", docId);
    dispatch(deleteNoteTodb(docId));
  };

  const handleEditClick = (note) => {
    setCurrentNote({ title: note.title, description: note.description, note : note.subject, });
    setCurrentId(note.docId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const userId = "user123";
    if (currentId && currentNote.title && currentNote.description) {
      dispatch(updateNoteTodb({ docId: currentId, ...currentNote,userId  }));
      
      setOpen(false);
    } else {
      console.log("All fields are required.");
    }
  };

  return (
    <>
    
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom align="center">
          All Notes
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            {notes.map((note) => (
              <Grid item xs={12} sm={6} md={4} key={note.docId}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {note.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {note.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {note.subject}
                    </Typography>

                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" color="textSecondary">
                        {note.lastEditedAt ? "Last Edited: " : "Created: "}
                        {format(
                          (note.lastEditedAt || note.createdAt).toDate(),
                          "MMM d, yyyy, h:mm a"
                        )}
                      </Typography>
                    </Box>






                    <div style={{ marginTop: "10px", float: "right" , }}>
                      <IconButton onClick={() => handleEditClick(note)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteNote(note.docId)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/*  model for editing notes */}
      {/* Modal for editing notes */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={currentNote.title}
            onChange={(e) =>
              setCurrentNote({ ...currentNote, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={currentNote.description}
            onChange={(e) =>
              setCurrentNote({ ...currentNote, description: e.target.value })
            }
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AllNotes;
