import React, { useRef } from "react";
import "./App.css";
import AutoComplete from "./components/autocomplete";

function App() {
  const autoRef = useRef();

  return (
    <div className="grid grid-cols-8 p-10">
      <div className="field">
        <label>Sample Auto Complete</label>
        <AutoComplete
          ref={autoRef}
          onChange={(value) => {
            console.log(value);
          }}
          onQuery={async (query = "") => {
            console.log(query);
            return [1, 2, 3];
          }}
        >
          {(entry, i, select) => (
            <a
              href="#"
              className="block w-full px-3 py-2 hover:bg-gray-300 text-sm hover:rounded-md break-words"
              key={i}
              onClick={(e) => {
                e.preventDefault();
                // select(entry);
                select(entry.id, entry.name);
              }}
            >
              Hello world
            </a>
          )}
        </AutoComplete>
      </div>
    </div>
  );
}

export default App;
