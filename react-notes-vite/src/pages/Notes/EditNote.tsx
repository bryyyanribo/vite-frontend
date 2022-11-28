import React from "react";
import NoteForm from "../../components/NoteForm";
import type { EditNoteProps } from "../../model/Note";
import useStore from "../../store/store";
import { useNote } from "./NoteLayout";

const EditNote = ({ availableTags }: EditNoteProps) => {
  const note = useNote();
  const store = useStore((state) => state);

  return (
    <>
      <h1>Edit Note Form</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => store.updateNote(note.id, data)}
        onAddTag={store.setTag}
        availableTags={availableTags}
      />
    </>
  );
};

export default EditNote;
