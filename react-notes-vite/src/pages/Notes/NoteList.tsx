import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";

import NoteCard from "../../components/NoteCard";
import { NoteListProps } from "../../model/Note";
import { Tag } from "../../model/Tag";

const NoteList = ({ availableTags, notes }: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <div className="container mx-auto mt-2">
        <div className="flex justify-between">
          <div>
            <h1 className="text-dark-500 text-2xl">Notes</h1>
          </div>

          <div>
            <Link to="/newNote">
              <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mr-2">
                Create
              </button>
            </Link>
          </div>
        </div>

        <form className="flex flex-row justify-between w-full">
          <div className="w-1/2 mr-2">
            <label htmlFor="title" className="text-gray-500 text-xl">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-1.5 text-gray-700 focus:outline-none"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="tags" className="text-gray-500 text-xl">
              Tags
            </label>
            <ReactSelect
              isMulti
              name="colors"
              options={availableTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              value={selectedTags.map((tag) => {
                return {
                  label: tag.label,
                  value: tag.id,
                };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                );
              }}
            />
          </div>
        </form>

        <div className="mt-4 flex flex-wrap mx-auto">
          {filteredNotes.map((note) => {
            return (
              <NoteCard
                key={note.id}
                id={note.id}
                title={note.title}
                tags={note.tags}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NoteList;
