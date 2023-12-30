import React, { useState, useCallback } from "react";
import {
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  VStack,
} from "@chakra-ui/react";
import { debounce } from 'lodash';
import CustomInput from "../CustomInput/CustomInput";

interface DropdownOption {
  value: string;
  label: string;
}

interface Dropdown {
  label: string;
  options: DropdownOption[];
}

interface MultiDropdownProps {
  search?:any;
  title?:string;
  dropdowns: Dropdown[];
  selectedOptions: { [key: string]: DropdownOption[] };
  onDropdownChange: (value: any, label: string) => void;
  onApply: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const MultiDropdown = ({
  search,
  title,
  dropdowns,
  selectedOptions,
  onDropdownChange,
  onApply,
  onSearchChange,
}: MultiDropdownProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const debouncedSearchChange = useCallback(
    debounce((value: string) => {
      onSearchChange(value);
    }, 1000),
    [onSearchChange]
  );

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      debouncedSearchChange(value);
    },
    [setInputValue, debouncedSearchChange]
  );


  return (
    <Popover
      isOpen={isPopoverOpen}
      onClose={handlePopoverClose}
      placement="bottom-start"
    >
      <PopoverTrigger>
        <Button
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          variant="outline"
          colorScheme="blue"
          _hover={{ bg: "blue.100" }}
        >
         {title ? title : 'Apply Filter'}
        </Button>
      </PopoverTrigger>
      <PopoverContent p={3} bg="white" borderColor="gray.300" boxShadow="md">
        <PopoverHeader mt={-1} fontWeight="bold" borderBottomWidth="1px">
          Select Options
        </PopoverHeader>
        <PopoverBody>
          <VStack rowGap={1} align="stretch">
            {
            search && search?.visible &&
            <Input
              placeholder={search?.placeholder || "Search"}
              value={inputValue}
              onChange={handleInputChange}
              borderRadius="md"
              bg="white"
              borderColor="gray.300"
              _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
            />}
            {dropdowns.map((dropdown: Dropdown, index: number) => (
              <CustomInput
                label={dropdown.label}
                isClear
                isSearchable={false}
                name="select"
                type="select"
                key={index}
                options={dropdown.options}
                placeholder={`${dropdown.label}`}
                value={selectedOptions[dropdown.label]}
                onChange={(selected) =>
                  onDropdownChange(selected, dropdown.label)
                }
              />
            ))}
            <Button
              colorScheme="blue"
              _hover={{ bg: "blue.500" }}
              onClick={() => {
                onApply();
                handlePopoverClose();
              }}
              mt={2}
            >
              Apply
            </Button>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default MultiDropdown;
