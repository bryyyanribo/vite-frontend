import React from "react";
import { Link } from "react-router-dom";
import type { NoteDetail } from "../model/Note";

const NoteCard = ({ id, title, tags }: NoteDetail) => {
  return (
    <div
      key={id}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4 pr-2"
    >
      <Link to={`/${id}`}>
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
              {title}
            </h1>

            <div className="space-x-2">
              {tags.length > 0 &&
                tags.map((item) => {
                  return (
                    <span
                      key={item.id}
                      className="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded"
                    >
                      {item.label}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NoteCard;
