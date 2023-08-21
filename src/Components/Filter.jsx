import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiFilter } from "react-icons/bi";

const Filter = ({ onSliderChange, categories, category, onCategoryFilter }) => {
  const { selectedCategory } = category;

  const handleChange = (event) => {
    onSliderChange(event.target.value);
  };

  const handleSelectedCategory = (category) => {
    onCategoryFilter(category);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-1 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-400 hover:bg-amber-100 hover:text-gray-900  transition ease-in">
          Filter <BiFilter size={20} />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 left-0 md:right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-amber-50 shadow-lg flex flex-col gap-1">
          <Menu.Item>
            <div className="p-2">
              <label className="text-sm text-gray-900 font-medium">
                Products to display
              </label>
              <input
                type="range"
                min="0"
                max="20"
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-amber-400 outline-none"
              />
            </div>
          </Menu.Item>
          <Menu.Item>
            <div className="p-2">
              <span className="text-sm text-gray-900 font-medium">
                Category
              </span>
              <div className="grid gap-2 grid-cols-1 md:grid-cols-2 my-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`border px-2 py-2 rounded text-sm outline outline-1 outline-amber-400 hover:font-semibold hover:bg-amber-100 hover:outline hover:outline-amber-400 text-center capitalize ${
                      category === { selectedCategory }
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                    onClick={() => handleSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <button
                className={`border px-4 py-2 rounded w-full text-sm outline outline-1 outline-amber-400 hover:font-semibold hover:bg-amber-100 hover:outline hover:outline-amber-400 text-center capitalize ${
                  category === { selectedCategory }
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => handleSelectedCategory("All")}
              >
                All
              </button>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Filter;
