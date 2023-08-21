import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiSearch, BiChevronDown } from "react-icons/bi";

// components
import AddProduct from "./AddProduct";
import Filter from "./Filter";

const Header = ({
  onSearch,
  onToggleSort,
  onSliderChange,
  categories,
  category,
  onCategoryFilter,
}) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  const handleSort = (e) => {
    onToggleSort(e.target.value);
  };

  return (
    <div className="py-1">
      <div className="flex justify-between items-center">
        <div className="w-16 md:w-20 lg:w-28">
          <img
            src={process.env.PUBLIC_URL + "Images/Logo.png"}
            alt="logo"
            className="w-full h-full"
          />
        </div>
        <div className="flex justify-between gap-1 items-center px-4 py-2 border border-gray-300 rounded-md w-3/4 bg-white text-sm h-1/2">
          <BiSearch size={20} className="text-gray-400" />
          <input
            type="search"
            name="Search"
            placeholder="Type in to search products"
            className="outline-none w-full"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="flex justify-between gap-5 mt-5">
        <div className="flex justify-between gap-4 items-center">
          <h1 className="text-xl md:text-2xl font-medium text-amber-500 tracking-wider">
            Products
          </h1>
          <Menu as="div" className="relative inline-block">
            <div>
              <Menu.Button className="inline-flex w-full gap-1 justify-center items-center text-xs text-gray-400">
                Sort by <BiChevronDown />{" "}
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
              <Menu.Items className="absolute left-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md z-10 bg-white shadow-lg text-black">
                <div className="flex flex-col gap-1">
                  <Menu.Item className="hover:font-medium hover:bg-amber-100">
                    <button
                      className="text-left text-sm p-1 rounded-sm"
                      onClick={handleSort}
                      value="asc"
                    >
                      Ascending
                    </button>
                  </Menu.Item>
                  <Menu.Item className="hover:font-medium hover:bg-amber-100">
                    <button
                      className="text-left text-sm p-1 rounded-sm"
                      onClick={handleSort}
                      value="desc"
                    >
                      Descending
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div className="flex justify-between items-center gap-4">
          <Filter
            onSliderChange={onSliderChange}
            categories={categories}
            category={category}
            onCategoryFilter={onCategoryFilter}
          />
          <AddProduct />
        </div>
      </div>
    </div>
  );
};

export default Header;
