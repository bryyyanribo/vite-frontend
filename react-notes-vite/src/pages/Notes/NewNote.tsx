import React from "react";
import NoteForm from "../../components/NoteForm";
import type { NewNoteProps } from "../../model/Note";
import useStore from "../../store/store";

const NewNote = ({ availableTags }: NewNoteProps) => {
  const store = useStore((state) => state);
  return (
    <div className="container mx-auto mt-2">
      <h1 className="text-2xl">Create Note</h1>
      <NoteForm
        onSubmit={store.setNote}
        onAddTag={store.setTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default NewNote;
