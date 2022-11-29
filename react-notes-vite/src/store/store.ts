import create from "zustand";
import type { Note, NoteData } from "../model/Note";
import { v4 as uuidV4 } from "uuid";
import { Tag } from "../model/Tag";

type Store = {
  notes: Note[];
  tags: Tag[];
  setNote: (noteItem: NoteData) => void;
  updateNote: (id: string, notesItem: NoteData) => void;
  deleteNote: (id: string) => void;
  setTag: (tag: Tag) => void;
};

const addNote = (notes: Note[], noteData: NoteData): Note[] => {
  return [...notes, { ...noteData, id: uuidV4() }];
};

const updateNote = (notes: Note[], id: string, notesItem: NoteData) => {
  return notes.map((note) => {
    if (note.id === id) {
      return { ...note, ...notesItem };
    } else {
      return note;
    }
  });
};

const deleteNote = (notes: Note[], id: string) => {
  return notes.filter((note) => note.id !== id);
};

const onAddTag = (tags: Tag[], tag: Tag) => {
  return [...tags, tag];
};

const useStore = create<Store>(
  (set): Store => ({
    notes: [],
    tags: [],
    setNote: (noteData) => {
      set((state) => ({
        ...state,
        notes: addNote(state.notes, noteData),
      }));
    },
    updateNote: (id, noteData) => {
      set((state) => ({
        ...state,
        notes: updateNote(state.notes, id, noteData),
      }));
    },
    deleteNote: (id) => {
      set((state) => ({
        ...state,
        notes: deleteNote(state.notes, id),
      }));
    },
    setTag: (tag) => {
      set((state) => ({
        ...state,
        tags: onAddTag(state.tags, tag),
      }));
    },
  })
);

export default useStore;
