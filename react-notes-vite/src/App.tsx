import { useMemo } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { Note } from "./pages/Notes/Note";
import useLocalStorage from "./hooks/useLocalStorage";
import NewNote from "./pages/Notes/NewNote";
import NoteList from "./pages/Notes/NoteList";
import NoteLayout from "./pages/Notes/NoteLayout";
import EditNote from "./pages/Notes/EditNote";
import type { NoteData, RawNote } from "./model/Note";
import { Tag } from "./model/Tag";
import useStore from "./store/store";

const App = () => {
  // const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
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
      <Route
        path="/"
        element={<NoteList notes={notesWithTags} availableTags={tags} />}
      />
      <Route path="/newNote" element={<NewNote availableTags={tags} />} />
      <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
        <Route index element={<Note />} />
        <Route
          path="edit"
          element={<EditNote availableTags={tags} />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
