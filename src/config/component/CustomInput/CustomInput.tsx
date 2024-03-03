import React, { useCallback } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Switch,
  Textarea,
  useTheme,
  Button,
  Icon,
  Flex,
  Radio,
  RadioGroup,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { RiCloseFill, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useState } from "react";
import Select from "react-select";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdvancedEditor from "../Editor/Editor";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface CustomInputProps {
  type?:
    | "editor"
    | "password"
    | "number"
    | "text"
    | "radio"
    | "file"
    | "switch"
    | "textarea"
    | "select"
    | "date"
    | "phone"
    | "file-drag"; // New type for file drag-and-drop
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: any;
  maxDate?: any;
  minDate?: any;
  disabledDates?: any;
  name: string;
  isClear?: boolean;
  onChange?: (value: any) => void;
  value?: any;
  w?: string;
  options?: any[];
  isSearchable?: boolean;
  isMulti?: boolean;
  getOptionLabel?: (option: any) => string;
  getOptionValue?: (option: any) => any;
  rows?: number;
  disabled?: boolean;
  showError?: boolean;
  style?: any;
  phone?: string;
  accept?:any;
  // Callback for file drop
  onFileDrop?: (files: FileList) => void;
  rest?: any;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  label,
  placeholder,
  error,
  name,
  value,
  onChange,
  required,
  isClear,
  options,
  isSearchable,
  isMulti,
  getOptionLabel,
  getOptionValue,
  disabled,
  rows,
  style,
  showError,
  maxDate,
  minDate,
  disabledDates,
  phone,
  onFileDrop,
  accept,
  // Added onFileDrop prop
  ...rest
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFileDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      console.log(files);
      if (onFileDrop) {
        onFileDrop(files);
      }
    },
    [onFileDrop]
  );

  const renderInputComponent = () => {
    switch (type) {
      case "password":
        return (
          <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            pr="4.5rem"
            position="relative"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            isRequired={required}
            disabled={disabled}
            fontSize="sm"
            {...rest}
          />
          <InputRightElement cursor="pointer" onClick={()=> {if (handleTogglePassword) {handleTogglePassword()}}}>
          {showPassword ? (
              <RiEyeOffLine size={18} />
            ) : (
              <RiEyeLine size={18} />
            )}
          </InputRightElement>
          </InputGroup>
        );
      case "number":
        return (
          <Input
            type="text"
            style={style}
            value={value}
            onKeyDown={(e: any) => {
              const regex = /^[0-9]*$/;
              if (e.key === "Backspace") {
                const newValue = e.target?.value?.slice(0, -1);
                onChange &&
                  onChange({ target: { name, value: newValue || "" } });
              } else if (
                regex.test(e.key) ||
                (e.key === "." && e.target?.value?.indexOf(".") === -1) ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight" ||
                e.key === "Home" ||
                e.key === "End"
              ) {
                const newValue = e.key.startsWith("Arrow") ? e.target.value : e.target.value + e.key;
                onChange &&
                  onChange({ target: { name, value: newValue } });
              } else {
                e.preventDefault();
              }
            }}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            _placeholder={{ fontSize: "12px" }}
            {...rest}
          />
        );
      case "text":
        return (
          <Input
            type="text"
            placeholder={placeholder}
            style={style}
            value={value}
            onChange={onChange}
            name={name}
            disabled={disabled}
            _placeholder={{ fontSize: "12px" }}
            {...rest}
          />
        );
      case "textarea":
        return (
          <Textarea
            style={style}
            rows={rows || 3}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            disabled={disabled}
            _placeholder={{ fontSize: "12px" }}
            {...rest}
          />
        );
      case "radio":
        return (
          <RadioGroup
            name={name}
            value={value}
            onChange={(val) => onChange && onChange(val)}
          >
            <Flex>
              {options &&
                options.map((opt) => (
                  <Radio
                    key={`${name}-${opt.value}`}
                    value={opt.value}
                    isDisabled={disabled}
                    mr={4}
                  >
                    {opt.label}
                  </Radio>
                ))}
            </Flex>
          </RadioGroup>
        );
      case "switch":
        return (
          <Switch
            style={style}
            name={name}
            onChange={onChange}
            isChecked={value}
            {...rest}
          />
        );
      case "select":
        return (
          <Select
            options={options}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            isClearable
            className={`chakra-select ${
              theme ? theme.components.Select.baseStyle : ""
            }`}
            isMulti={isMulti}
            isSearchable={isSearchable}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            isDisabled={disabled}
            components={{
              IndicatorSeparator: null,
              DropdownIndicator: () => (
                <div className="chakra-select__dropdown-indicator" />
              ),
            }}
          />
        );
      case "date":
        return (
          <div style={{ position: "relative" }}>
            <SingleDatepicker
              name={name}
              date={value}
              onDateChange={onChange ? onChange : () => {}}
              maxDate={maxDate}
              minDate={minDate}
              disabled={disabled}
              disabledDates={disabledDates}
              usePortal={false}
              configs={{
                dateFormat: "dd-MM-yyyy",
              }}
              propsConfigs={{
                dayOfMonthBtnProps: {
                  defaultBtnProps: {
                    _hover: {
                      background: "blue.500",
                    },
                  },
                  selectedBtnProps: {
                    background: "blue.300",
                  },
                  todayBtnProps: {
                    border: "1px solid #38B2AC",
                  },
                },
                inputProps: {
                  size: "md",
                  placeholder: placeholder,
                },
              }}
            />
            {value && isClear && (
              <Button
                colorScheme="red"
                variant="link"
                onClick={() => onChange && onChange(undefined)}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "0.2rem",
                  transform: "translateY(-50%)",
                }}
              >
                <Icon as={RiCloseFill} />
              </Button>
            )}
          </div>
        );
      case "editor":
        return (
          <AdvancedEditor
            style={style}
            editorState={value}
            setEditorState={onChange}
          />
        );
      case "phone":
        return (
          <PhoneInput
            country={"in"}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        );
      case "file":
        return (
          <Input
            style={style}
            type="file"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            disabled={disabled}
            _placeholder={{ fontSize: "12px" }}
            accept={accept}
            {...rest}
          />
        );
      // New case for file drag-and-drop
      case "file-drag":
        return (
          <div
            style={{
              border: "2px dashed #ddd",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "center",
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
          >
            <p>Drag & drop files here or click to browse</p>
            <input
              type="file"
              name={name}
              multiple={isMulti}
              onChange={onChange}
              style={{ display: "none" }}
              id={`multiple-file-upload-with-draggable-${name}`}
              accept={accept}
            />
            <Button
              colorScheme="blue"
              onClick={() =>
                (
                  document.getElementById(
                    `multiple-file-upload-with-draggable-${name}`
                  ) as unknown as HTMLInputElement
                )?.click()
              }
            >
              Browse
            </Button>
          </div>
        );
      default:
        return (
          <Input
            style={style}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            disabled={disabled}
            _placeholder={{ fontSize: "12px" }}
            {...rest}
          />
        );
    }
  };

  return (
    <FormControl id={name} isInvalid={!!error && showError}>
      <FormLabel fontSize={"small"} mt={2}>
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </FormLabel>
      {renderInputComponent()}
      {showError && error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default CustomInput;
