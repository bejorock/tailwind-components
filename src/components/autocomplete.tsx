import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useEffect, useState } from "react";
import { useSafe } from "../util/safe";

export declare type AutocompleteOptions = {
  defaultValue?: any;
  children?: any;
  onChange?: any;
  onQuery?: any;
  style?: any;
};

const AutoComplete = forwardRef(
  (
    {
      defaultValue = null,
      children,
      onChange,
      onQuery,
      style = null,
    }: AutocompleteOptions,
    ref: any
  ) => {
    const [popup, setPopup] = useState(false);
    const [input, setInput] = useState(defaultValue); // {}
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
      if (defaultValue === "") {
        setInput(null);
        onChange(null);
      }
    }, [defaultValue]);

    useSafe(async () => {
      const d = await onQuery(
        query,
        input && input != "" && input != null ? input.id : null
      );

      setData(d);
    }, [query, popup, input]);

    return (
      <div className="relative bg-white">
        <div className="relative">
          <div
            className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border rounded-md border-gray-300 disabled:bg-gray-200 focus:ring-1"
            tabIndex={1}
            onClick={(e) => {
              setPopup(true);
            }}
          >
            <div className="flex items-center gap-2">
              {input && input != "" ? input.name : <>&nbsp;</>}
            </div>
          </div>

          {input !== null && input !== undefined && input !== "" ? (
            <a
              href="#"
              className="absolute top-2 right-3 text-gray-200 hover:text-gray-700"
              onClick={(e) => {
                e.preventDefault();

                setInput(null);
                onChange(null);
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </a>
          ) : null}
        </div>
        {/* <input type="hidden" name={name} value={defaultValue} ref={ref} /> */}
        {popup ? (
          <div className="absolute w-full py-2 rounded-md shadow-lg text-gray-800 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="pb-2 px-2">
              <input
                type="text"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 disabled:bg-gray-200 rounded-md"
                autoFocus={true}
                defaultValue={input && input != "" ? input.name : null}
                onBlur={() => {
                  setTimeout(() => {
                    setPopup(false);
                  }, 225);
                }}
                onFocus={(e) => {
                  setQuery(e.target.value);
                }}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </div>
            <div className="max-h-40 overflow-y-auto">
              {data.map((d, i) =>
                children(d, i, (id, name) => {
                  setInput({ id, name });
                  onChange({ id, name });
                })
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);
export default AutoComplete;
