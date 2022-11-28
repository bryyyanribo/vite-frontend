import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import ReactMarkdown from "react-markdown";
import type { DeleteNote } from "../../model/Note";
import useStore from "../../store/store";

export function Note() {
  const note = useNote();
  const navigate = useNavigate();
  const deleteNote = useStore((state) => state.deleteNote);

  const handleDeleteNote = () => {
    deleteNote(note.id);
    navigate("/");
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="flex justify-between object-center">
        <h1 className="text-2xl">{note.title}</h1>
        <div className="space-x-2">
          <Link to={`/${note.id}/edit`}>
            <button
              type="button"
              className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-md"
            >
              Edit
            </button>
          </Link>
          <button
            type="button"
            className="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none rounded text-md"
            onClick={handleDeleteNote}
          >
            Delete
          </button>

          <Link to="/">
            <button
              type="button"
              className="inline-flex border-0 py-2 px-6 focus:outline-none rounded text-md"
            >
              Back
            </button>
          </Link>
        </div>
      </div>

      {note.tags.length > 0 &&
        note.tags.map((item) => {
          return (
            <span
              key={item.id}
              className="inline-block py-1.5 px-2.5 mr-2 mb-2 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded"
            >
              {item.label}
            </span>
          );
        })}
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </div>
  );
}
