import React from "react";
import NoteForm from "../../components/NoteForm";
import useStore from "../../store/store";

const NewNote = () => {
  const store = useStore((state) => state);
  return (
    <div className="container mx-auto mt-2">
      <h1 className="text-2xl">Create Note</h1>
      <NoteForm
        onSubmit={store.setNote}
        onAddTag={store.setTag}
        availableTags={store.tags}
      />
    </div>
  );
};

export default NewNote;
