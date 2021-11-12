import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useEffect, useState } from "react";
import { IAutoCompleteControl } from "../hooks/useAutoComplete";
import styled from "styled-components";
import tw from "twin.macro";

export declare type AutocompleteOptions = {
  control: IAutoCompleteControl;
  children?: any;
  onChange?: any;
  className?: string;
};

const AutoComplete = forwardRef(
  (
    { control, children, onChange, className }: AutocompleteOptions,
    ref: any
  ) => {
    const [popup, setPopup] = useState(false);

    useEffect(() => onChange(control.value), [control.value]);

    return (
      <div className={className}>
        <div className="x-input-container">
          <div
            ref={ref}
            className="x-input-result"
            tabIndex={1}
            onClick={(e) => {
              setPopup(true);
            }}
          >
            <div>{control.value ? control.value.text : <>&nbsp;</>}</div>
          </div>

          {control.value ? (
            <a
              href="#"
              className="x-input-clear"
              onClick={(e) => {
                e.preventDefault();
                control.clear();
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </a>
          ) : null}
        </div>
        {popup ? (
          <div className="x-input-popup">
            <div className="x-input-query">
              <input
                type="text"
                autoFocus={true}
                onBlur={() => {
                  setTimeout(() => {
                    setPopup(false);
                  }, 225);
                }}
                onFocus={(e) => {
                  control.setQuery(e.target.value);
                }}
                onChange={(e) => {
                  control.setQuery(e.target.value);
                }}
              />
            </div>
            <div className="x-input-query-result">{children}</div>
          </div>
        ) : null}
      </div>
    );
  }
);
export default styled(AutoComplete)`
  ${tw`relative`}
  ${tw`w-full`}

  & > .x-input-container {
    ${tw`relative`}
  }

  & > .x-input-container > .x-input-result {
    ${tw`mt-1`}
    ${tw`py-2`}
    ${tw`px-3`}
    ${tw`bg-white`}
    ${tw`focus:ring-indigo-500`}
    ${tw`focus:border-indigo-500`}
    ${tw`w-full`}
    ${tw`shadow-sm`}
    ${tw`sm:text-sm`}
    ${tw`border`}
    ${tw`rounded-md`}
    ${tw`border-gray-300`}
    ${tw`disabled:bg-gray-200`}
    ${tw`focus:ring-1`}
  }

  & > .x-input-container > .x-input-result > div {
    ${tw`flex`}
    ${tw`items-center`}
    ${tw`gap-2`}
  }

  & > .x-input-container > .x-input-clear {
    ${tw`absolute`}
    ${tw`top-2`}
    ${tw`right-3`}
    ${tw`text-gray-200`}
    ${tw`hover:text-gray-700`}
  }

  & > .x-input-popup {
    ${tw`absolute`}
    ${tw`w-full`}
    ${tw`mt-2`}
    ${tw`py-2`}
    ${tw`rounded-md`}
    ${tw`shadow-lg`}
    ${tw`text-gray-800`}
    ${tw`bg-white`}
    ${tw`ring-1`}
    ${tw`ring-black`}
    ${tw`ring-opacity-5`}
    ${tw`focus:outline-none`}
    ${tw`z-10`}
  }

  & > .x-input-popup > .x-input-query {
    ${tw`pb-2`}
    ${tw`px-2`}
  }

  & > .x-input-popup > .x-input-query > input {
    ${tw`mt-1`}
    ${tw`focus:ring-indigo-500`}
    ${tw`focus:border-indigo-500`}
    ${tw`block`}
    ${tw`w-full`}
    ${tw`shadow-sm`}
    ${tw`sm:text-sm`}
    ${tw`border-gray-300`}
    ${tw`disabled:bg-gray-200`}
    ${tw`rounded-md`}
  }

  & > .x-input-popup > .x-input-query-result {
    ${tw`max-h-40`}
    ${tw`overflow-y-auto`}
  }
`;
