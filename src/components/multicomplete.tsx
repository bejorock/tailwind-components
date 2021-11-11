import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useSafe } from "../util/safe";
// import "./components.css";

export declare type MultiCompleteOptions = {
  defaultValue?: any;
  children?: any;
  onChange?: any;
  onQuery?: any;
  className?: any;
  style?: any;
};

const MultiComplete = forwardRef(
  (
    {
      defaultValue = null,
      children,
      onChange,
      onQuery = async (q) => [],
      style = null,
      className,
    }: MultiCompleteOptions,
    ref: any
  ) => {
    const [popup, setPopup] = useState(false);
    const [input, setInput] = useState(""); // {}
    const [query, setQuery] = useState("");
    const [values, setValues] = useState([]);
    const [data, setData] = useState([]);

    useSafe(async () => {
      const d = await onQuery(query, values);
      // console.log(values);

      setData(d);
    }, [query, popup]);

    useEffect(() => {
      // console.log(defaultValue);
      if (!defaultValue) return;

      setInput(defaultValue.map((d) => d.text).join(","));
      setValues(defaultValue.map((d) => d.id));
      onChange(defaultValue);
    }, []);

    return (
      <div className={className}>
        <div className="relative x-input-container">
          <div
            ref={ref}
            className={`mt-1 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border rounded-md border-gray-300 disabled:bg-gray-200 py-1 px-1 bg-white flex flex-wrap gap-2 overflow-y-scroll x-input-result`}
            tabIndex={1}
            onClick={(e) => {
              setPopup(true);
            }}
            style={{ ...style, height: "38px" }}
          >
            {!input ? (
              <div className="py-1">&nbsp;</div>
            ) : (
              input.split(",").map((d, i) => (
                <div
                  className="flex items-center justify-center gap-2 bg-yellow-100 rounded py-1 px-1 cursor-pointer text-gray-700 hover:text-coolGray-900 x-input-result-item"
                  key={i}
                >
                  {d}
                  <a
                    href="#"
                    className="x-input-clear"
                    onClick={(e) => {
                      e.preventDefault();

                      const tokens = input.split(",");

                      tokens.splice(i, 1);
                      values.splice(i, 1);

                      setInput(tokens.join(","));
                      setValues([...values]);

                      onChange(
                        values.map((v, i) => ({ id: v, text: tokens[i] }))
                      );
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
        {popup ? (
          <div className="absolute w-full mt-2 py-2 rounded-md shadow-lg text-gray-800 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 x-input-popup">
            <div className="field pb-2 px-2">
              <input
                type="text"
                autoFocus={true}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 disabled:bg-gray-200 rounded-md x-input-query"
                onBlur={() => {
                  setTimeout(() => {
                    setPopup(false);
                  }, 225);
                }}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </div>
            <div className="max-h-44 overflow-y-auto x-input-query-result">
              {data.map((d, i) =>
                children(d, i, (id, text) => {
                  // console.log(id, text);
                  const input_ = input ? text + "," + input : text;
                  const tokens = input_.split(",").map((i) => i.trim());
                  // tokens[tokens.length - 1] = text;
                  setInput(tokens.join(","));

                  // console.log(tokens);

                  const tmp = [...values];

                  tmp.unshift(id);

                  // console.log(tmp);

                  setInput(input_);
                  setValues(tmp);
                  setQuery("");
                  onChange(tmp.map((v, i) => ({ id: v, text: tokens[i] })));

                  // setPopup(false);s

                  // console.log(ref.current);
                  if (ref.current)
                    setTimeout(() => {
                      ref.current.focus();
                      // console.log(tokens);
                      // const l = tokens.join(",").length;
                      // ref.current.setSelectionRange(l, l);
                    }, 100);
                })
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);

export default styled(MultiComplete)`
  ${tw`relative`}
  ${tw`w-full`}

  & .x-input-result,
  & .x-input-popup {
    --ms-overflow-style: none;
    scrollbar-width: none;
  }

  & .x-input-result::-webkit-scrollbar,
  & .x-input-popup::-webkit-scrollbar {
    display: none;
  }
`;
