import type { Tag } from "./Tag";

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
  tagIds?: string[];
};

export type NoteDetail = {
  id: string;
  title: string;
  tags: Tag[];
};

export type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export type NewNoteProps = {
  availableTags: Tag[];
};

export type EditNoteProps = {
  availableTags: Tag[];
};

export type DeleteNote = {
  deleteNote: (id: string) => void;
};

export type NoteLayoutProps = {
  notes: Note[];
};

export type NoteListProps = {
  availableTags: Tag[];
  notes: NoteDetail[];
};

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};
