import { useMemo } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Note } from "./pages/Notes/Note";
import NewNote from "./pages/Notes/NewNote";
import NoteList from "./pages/Notes/NoteList";
import NoteLayout from "./pages/Notes/NoteLayout";
import EditNote from "./pages/Notes/EditNote";
import { Tag } from "./model/Tag";
import useStore from "./store/store";

const App = () => {
  const notes = useStore((state) => state.notes);
  const tags = useStore((state) => state.tags);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag: Tag) => note.tagIds!.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  return (
    <Routes>
      <Route path="/" element={<NoteList notes={notesWithTags} />} />
      <Route path="/newNote" element={<NewNote />} />
      <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
        <Route index element={<Note />} />
        <Route path="edit" element={<EditNote />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
