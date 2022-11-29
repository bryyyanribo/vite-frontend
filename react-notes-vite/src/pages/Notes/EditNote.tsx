import React from "react";
import NoteForm from "../../components/NoteForm";
import useStore from "../../store/store";
import { useNote } from "./NoteLayout";

const EditNote = () => {
  const note = useNote();
  const store = useStore((state) => state);

  return (
    <div className="container mx-auto mt-2">
      <h1 className="text-2xl">Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => store.updateNote(note.id, data)}
        onAddTag={store.setTag}
        availableTags={store.tags}
      />
    </div>
  );
};

export default EditNote;
