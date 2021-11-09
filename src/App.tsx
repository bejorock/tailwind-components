import React, { useRef } from "react";
import "./App.css";
// import "./components/components.module.csss";
import {
  AutoComplete,
  ColorPicker,
  IconPicker,
  MultiComplete,
} from "./components";

function App() {
  const autoRef = useRef();
  const multiRef = useRef();
  const colorRef = useRef();
  const iconRef = useRef();

  return (
    <div className="grid grid-cols-8 gap-3 p-10">
      <div className="field">
        <label>Sample Auto Complete</label>
        <AutoComplete
          ref={autoRef}
          onChange={(value) => {
            console.log(value);
          }}
          onQuery={async (query = "") => {
            return ["Entry 1", "Entry 2", "Entry 3"].filter((f) =>
              f.includes(query)
            );
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

      <div className="field">
        <label>Sample Multi Complete</label>
        <MultiComplete
          ref={multiRef}
          onChange={(value) => {
            console.log(value);
          }}
          onQuery={async (query, existingVals) => {
            return ["Entry 1", "Entry 2", "Entry 3"]
              .filter((f) => f.includes(query))
              .filter((f) => existingVals.findIndex((ff) => f === ff) == -1);
          }}
        >
          {(entry, i, select) => {
            return (
              <a
                href="#"
                className="block w-full px-3 py-2 hover:bg-gray-100 text-sm hover:rounded-md break-words"
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  // select(entry);
                  select(entry, entry);
                }}
              >
                {entry}
              </a>
            );
          }}
        </MultiComplete>
      </div>

      <div className="field">
        <label>Sample Color Picker</label>
        <ColorPicker
          ref={colorRef}
          onChange={(value) => {
            console.log(value);
          }}
        />
      </div>

      <div className="field">
        <label>Sample Icon Picker</label>
        <IconPicker ref={iconRef} onChange={(value) => console.log(value)} />
      </div>
    </div>
  );
}

export default App;
