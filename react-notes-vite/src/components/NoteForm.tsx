import React, { FormEvent, useRef, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { NoteFormProps } from "../model/Note";
import { Tag } from "../model/Tag";

const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: bodyRef.current!.value,
      tags: selectedTags,
      tagIds: selectedTags.map((tag) => tag.id),
    });

    navigate("..");
  };

  return (
    <div className="border-2 border-grey-500 p-4 mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            ref={titleRef}
            defaultValue={title}
            required
            className="w-full border rounded px-3 py-1.5 text-gray-700 focus:outline-none"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="tags">Tags</label>
          <CreatableSelect
            isMulti
            name="colors"
            options={availableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onCreateOption={(label) => {
              const newTag = { id: uuidV4(), label };
              onAddTag(newTag);
              setSelectedTags((prev) => [...prev, newTag]);
            }}
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
        <div className="mb-2">
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            id="body"
            cols={30}
            rows={15}
            ref={bodyRef}
            defaultValue={markdown}
            required
            className="w-full border rounded px-3 py-1.5 text-gray-700 focus:outline-none"
          />
        </div>

        <div className="flex justify-end">
          <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none rounded text-lg">
            Save
          </button>
          <Link to="..">
            <button className="inline-flex text-black bg-grey-500 border-0 py-2 px-6 focus:outline-none rounded text-lg">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default NoteForm;
