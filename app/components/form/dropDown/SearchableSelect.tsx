// "use client";

// import Select, {
//   Props as SelectProps,
//   components,
//   OptionProps,
// } from "react-select";

// interface OptionType {
//   value: string;
//   label: string;
// }

// interface SearchableSelectProps
//   extends Omit<SelectProps<OptionType>, "onChange" | "value"> {
//   label?: string;
//   value?: string | string[];
//   onChange: (value: string | string[] | null) => void;
//   options: OptionType[];
//   isClearable?: boolean;
//   placeholder?: string;
//   isMulti?: boolean;
//   required?: boolean;
//   error?: string;
//   hint?: string;
// }

// const CheckboxOption = (props: OptionProps<OptionType, true>) => {
//   const { isSelected, label } = props;

//   return (
//     <components.Option {...props}>
//       <div className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           checked={isSelected}
//           readOnly
//           className="h-4 w-4 rounded border-gray-300"
//         />
//         <span>{label}</span>
//       </div>
//     </components.Option>
//   );
// };

// export default function SearchableSelect({
//   label,
//   value,
//   onChange,
//   options,
//   isClearable = true,
//   placeholder = "Select...",
//   isMulti = false,
//   required = false,
//   error,
//   hint,
//   ...rest
// }: SearchableSelectProps) {
//   return (
//     <div className="space-y-1">
//       {label && (
//         <label className="flex items-center gap-2 text-sm font-medium mb-2">
//           <span>
//             {label} {required && <span className="text-red-500">*</span>}
//           </span>

//           {hint && <span className="text-slate-500 text-xs">({hint})</span>}
//         </label>
//       )}

//       <Select
//         value={
//           isMulti
//             ? options.filter(
//                 (o) => Array.isArray(value) && value.includes(o.value)
//               )
//             : options.find((o) => o.value === value) || null
//         }
//         onChange={(option) => {
//           if (isMulti) {
//             onChange(
//               option ? (option as OptionType[]).map((o) => o.value) : []
//             );
//           } else {
//             onChange(option ? (option as OptionType).value : null);
//           }
//         }}
//         options={options}
//         isClearable={isClearable}
//         isMulti={isMulti}
//         closeMenuOnSelect={!isMulti ? true : false}
//         placeholder={placeholder}
//         classNamePrefix="select"
//         menuPlacement="auto"
//         menuPortalTarget={
//           typeof document !== "undefined" ? document.body : undefined
//         }
//         components={{
//           Option: isMulti ? CheckboxOption : components.Option,
//         }}
//         styles={{
//           control: (base) => ({
//             ...base,
//             padding: 6,
//             borderRadius: 12,
//             borderColor: error ? "#dc2626" : "#d1d5db",
//             boxShadow: "none",
//             cursor: "pointer",
//             "&:hover": {
//               borderColor: error ? "#dc2626" : "#15803d",
//             },
//           }),

//           indicatorSeparator: () => ({
//             display: "none",
//           }),

//           dropdownIndicator: (base, state) => ({
//             ...base,
//             padding: 4,
//             transition: "0.2s",
//             transform: state.selectProps.menuIsOpen
//               ? "rotate(180deg)"
//               : "rotate(0deg)",
//             color: "#6b7280",
//             "&:hover": {
//               color: "#15803d",
//             },
//           }),

//           menu: (base) => ({
//             ...base,
//             borderRadius: 12,
//             marginTop: 4,
//           }),

//           option: (base, state) => ({
//             ...base,
//             borderRadius: 10,
//             padding: "10px 12px",
//             backgroundColor: state.isFocused
//               ? "#f3f4f6"
//               : state.isSelected
//               ? "#dcfce7"
//               : "transparent",
//             color: state.isSelected ? "#15803d" : "#374151",
//             "&:active": {
//               backgroundColor: state.isSelected ? "#dcfce7" : "#f3f4f6",
//             },
//           }),
//           multiValue: (base) => ({
//             ...base,
//             backgroundColor: "#dcfce7",
//             borderRadius: 8,
//           }),

//           multiValueLabel: (base) => ({
//             ...base,
//             color: "#15803d",
//             fontWeight: 500,
//           }),

//           multiValueRemove: (base) => ({
//             ...base,
//             color: "#15803d",
//             "&:hover": {
//               backgroundColor: "#bbf7d0",
//               color: "#166534",
//             },
//           }),
//         }}
//         {...rest}
//       />

//       {error && <p className="text-red-500 text-sm">{error}</p>}
//     </div>
//   );
// }

"use client";

import Select, {
  Props as SelectProps,
  components,
  OptionProps,
  GroupBase,
} from "react-select";

interface OptionType {
  value: string;
  label: string;
}

interface SearchableSelectProps
  extends Omit<SelectProps<OptionType>, "onChange" | "value"> {
  label?: string;
  value?: string | string[];
  onChange: (value: string | string[] | null) => void;
  options: OptionType[];
  isClearable?: boolean;
  placeholder?: string;
  isMulti?: boolean;
  required?: boolean;
  error?: string;
  hint?: string;
}

// ✅ Checkbox option component
const CheckboxOption = (props: OptionProps<OptionType, true, GroupBase<OptionType>>) => {
  const { isSelected, label } = props;
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          className="h-4 w-4 rounded border-gray-300"
        />
        <span>{label}</span>
      </div>
    </components.Option>
  );
};

export default function SearchableSelect({
  label,
  value,
  onChange,
  options,
  isClearable = true,
  placeholder = "Select...",
  isMulti = false,
  required = false,
  error,
  hint,
  ...rest
}: SearchableSelectProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="flex items-center gap-2 text-sm font-medium mb-2">
          <span>
            {label} {required && <span className="text-red-500">*</span>}
          </span>
          {hint && <span className="text-slate-500 text-xs">({hint})</span>}
        </label>
      )}

      <Select
        value={
          isMulti
            ? options.filter(
                (o) => Array.isArray(value) && value.includes(o.value)
              )
            : options.find((o) => o.value === value) || null
        }
        onChange={(option) => {
          if (isMulti) {
            onChange(
              option ? (option as OptionType[]).map((o) => o.value) : []
            );
          } else {
            onChange(option ? (option as OptionType).value : null);
          }
        }}
        options={options}
        isClearable={isClearable}
        isMulti={isMulti}
        closeMenuOnSelect={!isMulti}
        placeholder={placeholder}
        classNamePrefix="select"
        menuPlacement="auto"
        menuPortalTarget={
          typeof document !== "undefined" ? document.body : undefined
        }
        components={{
          Option: isMulti ? (CheckboxOption as typeof components.Option) : components.Option,
        }}
        styles={{
          control: (base) => ({
            ...base,
            padding: 6,
            borderRadius: 12,
            borderColor: error ? "#dc2626" : "#d1d5db",
            boxShadow: "none",
            cursor: "pointer",
            "&:hover": {
              borderColor: error ? "#dc2626" : "#15803d",
            },
          }),
          indicatorSeparator: () => ({ display: "none" }),
          dropdownIndicator: (base, state) => ({
            ...base,
            padding: 4,
            transition: "0.2s",
            transform: state.selectProps.menuIsOpen
              ? "rotate(180deg)"
              : "rotate(0deg)",
            color: "#6b7280",
            "&:hover": { color: "#15803d" },
          }),
          menu: (base) => ({ ...base, borderRadius: 12, marginTop: 4 }),
          option: (base, state) => ({
            ...base,
            borderRadius: 10,
            padding: "10px 12px",
            backgroundColor: state.isFocused
              ? "#f3f4f6"
              : state.isSelected
              ? "#dcfce7"
              : "transparent",
            color: state.isSelected ? "#15803d" : "#374151",
            "&:active": {
              backgroundColor: state.isSelected ? "#dcfce7" : "#f3f4f6",
            },
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: "#dcfce7",
            borderRadius: 8,
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: "#15803d",
            fontWeight: 500,
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: "#15803d",
            "&:hover": {
              backgroundColor: "#bbf7d0",
              color: "#166534",
            },
          }),
        }}
        {...rest}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
