var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/lib.ts
__export(exports, {
  AutoComplete: () => autocomplete_default,
  fromHexString: () => fromHexString,
  safe: () => safe,
  toHexString: () => toHexString,
  useSafe: () => useSafe
});

// src/components/autocomplete.tsx
var import_free_solid_svg_icons = __toModule(require("@fortawesome/free-solid-svg-icons"));
var import_react_fontawesome = __toModule(require("@fortawesome/react-fontawesome"));
var import_react2 = __toModule(require("react"));

// src/util/safe.ts
var import_react = __toModule(require("react"));
function safe(cb, onError) {
  cb().catch((err) => {
    console.log(err);
    if (onError)
      onError(err);
  });
}
function useSafe(cb, dependencies) {
  const [error, setError] = (0, import_react.useState)(null);
  const [complete, setComplete] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    let cleanupFn = null;
    cb().then((fn) => cleanupFn = fn).catch((err) => {
      console.log(err);
      setError(err);
    }).finally(() => setComplete(true));
    return () => {
      if (cleanupFn)
        cleanupFn();
    };
  }, dependencies);
  return { error, complete };
}

// src/components/autocomplete.tsx
var AutoComplete = (0, import_react2.forwardRef)(({
  defaultValue = null,
  children,
  onChange,
  onQuery,
  style = null
}, ref) => {
  const [popup, setPopup] = (0, import_react2.useState)(false);
  const [input, setInput] = (0, import_react2.useState)(defaultValue);
  const [query, setQuery] = (0, import_react2.useState)("");
  const [data, setData] = (0, import_react2.useState)([]);
  (0, import_react2.useEffect)(() => {
    if (defaultValue === "") {
      setInput(null);
      onChange(null);
    }
  }, [defaultValue]);
  useSafe(() => __async(void 0, null, function* () {
    const d = yield onQuery(query, input && input != "" && input != null ? input.id : null);
    setData(d);
  }), [query, popup, input]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "relative bg-white"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border rounded-md border-gray-300 disabled:bg-gray-200 focus:ring-1",
    tabIndex: 1,
    onClick: (e) => {
      setPopup(true);
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center gap-2"
  }, input && input != "" ? input.name : /* @__PURE__ */ React.createElement(React.Fragment, null, "\xA0"))), input !== null && input !== void 0 && input !== "" ? /* @__PURE__ */ React.createElement("a", {
    href: "#",
    className: "absolute top-2 right-3 text-gray-200 hover:text-gray-700",
    onClick: (e) => {
      e.preventDefault();
      setInput(null);
      onChange(null);
    }
  }, /* @__PURE__ */ React.createElement(import_react_fontawesome.FontAwesomeIcon, {
    icon: import_free_solid_svg_icons.faTimes
  })) : null), popup ? /* @__PURE__ */ React.createElement("div", {
    className: "absolute w-full py-2 rounded-md shadow-lg text-gray-800 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "pb-2 px-2"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "text",
    className: "mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 disabled:bg-gray-200 rounded-md",
    autoFocus: true,
    defaultValue: input && input != "" ? input.name : null,
    onBlur: () => {
      setTimeout(() => {
        setPopup(false);
      }, 225);
    },
    onFocus: (e) => {
      setQuery(e.target.value);
    },
    onChange: (e) => {
      setQuery(e.target.value);
    }
  })), /* @__PURE__ */ React.createElement("div", {
    className: "max-h-40 overflow-y-auto"
  }, data.map((d, i) => children(d, i, (id, name) => {
    setInput({ id, name });
    onChange({ id, name });
  })))) : null);
});
var autocomplete_default = AutoComplete;

// src/util/hex.ts
var fromHexString = (hexString) => new Uint8Array(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
var toHexString = (bytes) => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2xpYi50cyIsICJzcmMvY29tcG9uZW50cy9hdXRvY29tcGxldGUudHN4IiwgInNyYy91dGlsL3NhZmUudHMiLCAic3JjL3V0aWwvaGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tIFwiLi9jb21wb25lbnRzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3V0aWxcIjtcclxuIiwgImltcG9ydCB7IGZhVGltZXMgfSBmcm9tIFwiQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zXCI7XHJcbmltcG9ydCB7IEZvbnRBd2Vzb21lSWNvbiB9IGZyb20gXCJAZm9ydGF3ZXNvbWUvcmVhY3QtZm9udGF3ZXNvbWVcIjtcclxuaW1wb3J0IHsgZm9yd2FyZFJlZiwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyB1c2VTYWZlIH0gZnJvbSBcIi4uL3V0aWwvc2FmZVwiO1xyXG5cclxuZXhwb3J0IGRlY2xhcmUgdHlwZSBBdXRvY29tcGxldGVPcHRpb25zID0ge1xyXG4gIGRlZmF1bHRWYWx1ZT86IGFueTtcclxuICBjaGlsZHJlbj86IGFueTtcclxuICBvbkNoYW5nZT86IGFueTtcclxuICBvblF1ZXJ5PzogYW55O1xyXG4gIHN0eWxlPzogYW55O1xyXG59O1xyXG5cclxuY29uc3QgQXV0b0NvbXBsZXRlID0gZm9yd2FyZFJlZihcclxuICAoXHJcbiAgICB7XHJcbiAgICAgIGRlZmF1bHRWYWx1ZSA9IG51bGwsXHJcbiAgICAgIGNoaWxkcmVuLFxyXG4gICAgICBvbkNoYW5nZSxcclxuICAgICAgb25RdWVyeSxcclxuICAgICAgc3R5bGUgPSBudWxsLFxyXG4gICAgfTogQXV0b2NvbXBsZXRlT3B0aW9ucyxcclxuICAgIHJlZjogYW55XHJcbiAgKSA9PiB7XHJcbiAgICBjb25zdCBbcG9wdXAsIHNldFBvcHVwXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICAgIGNvbnN0IFtpbnB1dCwgc2V0SW5wdXRdID0gdXNlU3RhdGUoZGVmYXVsdFZhbHVlKTsgLy8ge31cclxuICAgIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShbXSk7XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gXCJcIikge1xyXG4gICAgICAgIHNldElucHV0KG51bGwpO1xyXG4gICAgICAgIG9uQ2hhbmdlKG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9LCBbZGVmYXVsdFZhbHVlXSk7XHJcblxyXG4gICAgdXNlU2FmZShhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGQgPSBhd2FpdCBvblF1ZXJ5KFxyXG4gICAgICAgIHF1ZXJ5LFxyXG4gICAgICAgIGlucHV0ICYmIGlucHV0ICE9IFwiXCIgJiYgaW5wdXQgIT0gbnVsbCA/IGlucHV0LmlkIDogbnVsbFxyXG4gICAgICApO1xyXG5cclxuICAgICAgc2V0RGF0YShkKTtcclxuICAgIH0sIFtxdWVyeSwgcG9wdXAsIGlucHV0XSk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBiZy13aGl0ZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibXQtMSBweS0yIHB4LTMgZm9jdXM6cmluZy1pbmRpZ28tNTAwIGZvY3VzOmJvcmRlci1pbmRpZ28tNTAwIHctZnVsbCBzaGFkb3ctc20gc206dGV4dC1zbSBib3JkZXIgcm91bmRlZC1tZCBib3JkZXItZ3JheS0zMDAgZGlzYWJsZWQ6YmctZ3JheS0yMDAgZm9jdXM6cmluZy0xXCJcclxuICAgICAgICAgICAgdGFiSW5kZXg9ezF9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgc2V0UG9wdXAodHJ1ZSk7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cclxuICAgICAgICAgICAgICB7aW5wdXQgJiYgaW5wdXQgIT0gXCJcIiA/IGlucHV0Lm5hbWUgOiA8PiZuYnNwOzwvPn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICB7aW5wdXQgIT09IG51bGwgJiYgaW5wdXQgIT09IHVuZGVmaW5lZCAmJiBpbnB1dCAhPT0gXCJcIiA/IChcclxuICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICBocmVmPVwiI1wiXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTIgcmlnaHQtMyB0ZXh0LWdyYXktMjAwIGhvdmVyOnRleHQtZ3JheS03MDBcIlxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0SW5wdXQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZShudWxsKTtcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPEZvbnRBd2Vzb21lSWNvbiBpY29uPXtmYVRpbWVzfSAvPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICB7LyogPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPXtuYW1lfSB2YWx1ZT17ZGVmYXVsdFZhbHVlfSByZWY9e3JlZn0gLz4gKi99XHJcbiAgICAgICAge3BvcHVwID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB3LWZ1bGwgcHktMiByb3VuZGVkLW1kIHNoYWRvdy1sZyB0ZXh0LWdyYXktODAwIGJnLXdoaXRlIHJpbmctMSByaW5nLWJsYWNrIHJpbmctb3BhY2l0eS01IGZvY3VzOm91dGxpbmUtbm9uZSB6LTEwXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGItMiBweC0yXCI+XHJcbiAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtdC0xIGZvY3VzOnJpbmctaW5kaWdvLTUwMCBmb2N1czpib3JkZXItaW5kaWdvLTUwMCBibG9jayB3LWZ1bGwgc2hhZG93LXNtIHNtOnRleHQtc20gYm9yZGVyLWdyYXktMzAwIGRpc2FibGVkOmJnLWdyYXktMjAwIHJvdW5kZWQtbWRcIlxyXG4gICAgICAgICAgICAgICAgYXV0b0ZvY3VzPXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtpbnB1dCAmJiBpbnB1dCAhPSBcIlwiID8gaW5wdXQubmFtZSA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICBvbkJsdXI9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0UG9wdXAoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICB9LCAyMjUpO1xyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgIG9uRm9jdXM9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHNldFF1ZXJ5KGUudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgc2V0UXVlcnkoZS50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtaC00MCBvdmVyZmxvdy15LWF1dG9cIj5cclxuICAgICAgICAgICAgICB7ZGF0YS5tYXAoKGQsIGkpID0+XHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbihkLCBpLCAoaWQsIG5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgc2V0SW5wdXQoeyBpZCwgbmFtZSB9KTtcclxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2UoeyBpZCwgbmFtZSB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuKTtcclxuZXhwb3J0IGRlZmF1bHQgQXV0b0NvbXBsZXRlO1xyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2FmZShjYjogRnVuY3Rpb24sIG9uRXJyb3I/OiBGdW5jdGlvbikge1xyXG4gIGNiKCkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuXHJcbiAgICBpZiAob25FcnJvcikgb25FcnJvcihlcnIpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXNlU2FmZShjYjogKCkgPT4gUHJvbWlzZTxhbnk+LCBkZXBlbmRlbmNpZXM/OiBhbnlbXSkge1xyXG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW2NvbXBsZXRlLCBzZXRDb21wbGV0ZV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAvKiAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICByZXR1cm4gYXdhaXQgY2IoKTtcclxuICAgIH0pKClcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHNldEVycm9yKGVycikpXHJcbiAgICAgIC5maW5hbGx5KCgpID0+IHNldENvbXBsZXRlKHRydWUpKTsgKi9cclxuXHJcbiAgICBsZXQgY2xlYW51cEZuID0gbnVsbDtcclxuXHJcbiAgICBjYigpXHJcbiAgICAgIC50aGVuKChmbikgPT4gKGNsZWFudXBGbiA9IGZuKSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIHNldEVycm9yKGVycik7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5maW5hbGx5KCgpID0+IHNldENvbXBsZXRlKHRydWUpKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpZiAoY2xlYW51cEZuKSBjbGVhbnVwRm4oKTtcclxuICAgIH07XHJcbiAgfSwgZGVwZW5kZW5jaWVzKTtcclxuXHJcbiAgcmV0dXJuIHsgZXJyb3IsIGNvbXBsZXRlIH07XHJcbn1cclxuIiwgImV4cG9ydCBjb25zdCBmcm9tSGV4U3RyaW5nID0gKGhleFN0cmluZzogYW55KSA9PlxyXG4gIG5ldyBVaW50OEFycmF5KFxyXG4gICAgaGV4U3RyaW5nLm1hdGNoKC8uezEsMn0vZykubWFwKChieXRlOiBhbnkpID0+IHBhcnNlSW50KGJ5dGUsIDE2KSlcclxuICApO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRvSGV4U3RyaW5nID0gKGJ5dGVzOiBhbnkpID0+XHJcbiAgYnl0ZXMucmVkdWNlKChzdHIsIGJ5dGUpID0+IHN0ciArIGJ5dGUudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKSwgXCJcIik7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQSxrQ0FBd0I7QUFDeEIsK0JBQWdDO0FBQ2hDLG9CQUFnRDs7O0FDRmhELG1CQUFvQztBQUVyQixjQUFjLElBQWMsU0FBb0I7QUFDN0QsT0FBSyxNQUFNLENBQUMsUUFBUTtBQUNsQixZQUFRLElBQUk7QUFFWixRQUFJO0FBQVMsY0FBUTtBQUFBO0FBQUE7QUFJbEIsaUJBQWlCLElBQXdCLGNBQXNCO0FBQ3BFLFFBQU0sQ0FBQyxPQUFPLFlBQVksMkJBQVM7QUFDbkMsUUFBTSxDQUFDLFVBQVUsZUFBZSwyQkFBUztBQUV6Qyw4QkFBVSxNQUFNO0FBT2QsUUFBSSxZQUFZO0FBRWhCLFNBQ0csS0FBSyxDQUFDLE9BQVEsWUFBWSxJQUMxQixNQUFNLENBQUMsUUFBUTtBQUNkLGNBQVEsSUFBSTtBQUNaLGVBQVM7QUFBQSxPQUVWLFFBQVEsTUFBTSxZQUFZO0FBRTdCLFdBQU8sTUFBTTtBQUNYLFVBQUk7QUFBVztBQUFBO0FBQUEsS0FFaEI7QUFFSCxTQUFPLEVBQUUsT0FBTztBQUFBOzs7QUR2QmxCLElBQU0sZUFBZSw4QkFDbkIsQ0FDRTtBQUFBLEVBQ0UsZUFBZTtBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsUUFBUTtBQUFBLEdBRVYsUUFDRztBQUNILFFBQU0sQ0FBQyxPQUFPLFlBQVksNEJBQVM7QUFDbkMsUUFBTSxDQUFDLE9BQU8sWUFBWSw0QkFBUztBQUNuQyxRQUFNLENBQUMsT0FBTyxZQUFZLDRCQUFTO0FBQ25DLFFBQU0sQ0FBQyxNQUFNLFdBQVcsNEJBQVM7QUFFakMsK0JBQVUsTUFBTTtBQUNkLFFBQUksaUJBQWlCLElBQUk7QUFDdkIsZUFBUztBQUNULGVBQVM7QUFBQTtBQUFBLEtBRVYsQ0FBQztBQUVKLFVBQVEsTUFBWTtBQUNsQixVQUFNLElBQUksTUFBTSxRQUNkLE9BQ0EsU0FBUyxTQUFTLE1BQU0sU0FBUyxPQUFPLE1BQU0sS0FBSztBQUdyRCxZQUFRO0FBQUEsTUFDUCxDQUFDLE9BQU8sT0FBTztBQUVsQixTQUNFLG9DQUFDLE9BQUQ7QUFBQSxJQUFLLFdBQVU7QUFBQSxLQUNiLG9DQUFDLE9BQUQ7QUFBQSxJQUFLLFdBQVU7QUFBQSxLQUNiLG9DQUFDLE9BQUQ7QUFBQSxJQUNFLFdBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLFNBQVMsQ0FBQyxNQUFNO0FBQ2QsZUFBUztBQUFBO0FBQUEsS0FHWCxvQ0FBQyxPQUFEO0FBQUEsSUFBSyxXQUFVO0FBQUEsS0FDWixTQUFTLFNBQVMsS0FBSyxNQUFNLE9BQU8sMERBQUUsV0FJMUMsVUFBVSxRQUFRLFVBQVUsVUFBYSxVQUFVLEtBQ2xELG9DQUFDLEtBQUQ7QUFBQSxJQUNFLE1BQUs7QUFBQSxJQUNMLFdBQVU7QUFBQSxJQUNWLFNBQVMsQ0FBQyxNQUFNO0FBQ2QsUUFBRTtBQUVGLGVBQVM7QUFDVCxlQUFTO0FBQUE7QUFBQSxLQUdYLG9DQUFDLDBDQUFEO0FBQUEsSUFBaUIsTUFBTTtBQUFBLFFBRXZCLE9BR0wsUUFDQyxvQ0FBQyxPQUFEO0FBQUEsSUFBSyxXQUFVO0FBQUEsS0FDYixvQ0FBQyxPQUFEO0FBQUEsSUFBSyxXQUFVO0FBQUEsS0FDYixvQ0FBQyxTQUFEO0FBQUEsSUFDRSxNQUFLO0FBQUEsSUFDTCxXQUFVO0FBQUEsSUFDVixXQUFXO0FBQUEsSUFDWCxjQUFjLFNBQVMsU0FBUyxLQUFLLE1BQU0sT0FBTztBQUFBLElBQ2xELFFBQVEsTUFBTTtBQUNaLGlCQUFXLE1BQU07QUFDZixpQkFBUztBQUFBLFNBQ1I7QUFBQTtBQUFBLElBRUwsU0FBUyxDQUFDLE1BQU07QUFDZCxlQUFTLEVBQUUsT0FBTztBQUFBO0FBQUEsSUFFcEIsVUFBVSxDQUFDLE1BQU07QUFDZixlQUFTLEVBQUUsT0FBTztBQUFBO0FBQUEsT0FJeEIsb0NBQUMsT0FBRDtBQUFBLElBQUssV0FBVTtBQUFBLEtBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxNQUNaLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxTQUFTO0FBQzNCLGFBQVMsRUFBRSxJQUFJO0FBQ2YsYUFBUyxFQUFFLElBQUk7QUFBQSxVQUtyQjtBQUFBO0FBS1osSUFBTyx1QkFBUTs7O0FFL0dSLElBQU0sZ0JBQWdCLENBQUMsY0FDNUIsSUFBSSxXQUNGLFVBQVUsTUFBTSxXQUFXLElBQUksQ0FBQyxTQUFjLFNBQVMsTUFBTTtBQUcxRCxJQUFNLGNBQWMsQ0FBQyxVQUMxQixNQUFNLE9BQU8sQ0FBQyxLQUFLLFNBQVMsTUFBTSxLQUFLLFNBQVMsSUFBSSxTQUFTLEdBQUcsTUFBTTsiLAogICJuYW1lcyI6IFtdCn0K
