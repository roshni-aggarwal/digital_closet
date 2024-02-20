import React, { Fragment } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";

// components
import Update from "./Action Buttons/Update";
import View from "./Action Buttons/View";

const Table = ({ productsData, onUpdate, onDelete }) => {
  return (
    <div className="table_box my-5">
      <table>
        <thead className="px-3 py-2 text-center">
          <tr>
            <th>Sr.No.</th>
            <th>Product</th>
            <th>Price</th>
            <th className="w-">Description</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productsData &&
            productsData.map((product) => (
              <tr key={product.id}>
                <td className="text-center">{product.id}</td>
                <td className="flex gap-2 items-center">
                  <img src={product.image} alt="product" />
                  {product.title}
                </td>
                <td className="w-1/12">$ {product.price}</td>
                <td className="w-2/5">
                  <p className="line-clamp-2">{product.description}</p>
                </td>
                <td>
                  <div
                    className={`capitalize px-2 py-1 text-sm border text-center rounded-full ${
                      product.category === "men's clothing"
                        ? "bg-red-100 text-red-500 outline outline-1 outline-red-500"
                        : product.category === "women's clothing"
                        ? "bg-blue-100 text-blue-500 outline outline-1 outline-blue-500"
                        : product.category === "electronics"
                        ? "bg-green-100 text-green-500 outline outline-1 outline-green-500"
                        : product.category === "jewelery"
                        ? "bg-purple-100 text-purple-500 outline outline-1 outline-purple-500"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {product.category}
                  </div>
                </td>
                <td>
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button>
                        <BsThreeDots />
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
                      <Menu.Items className="absolute flex gap-2 p-2 justify-between items-center right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-teal-700 shadow-lg">
                        <Menu.Item>
                          <View productID={product.id} />
                        </Menu.Item>
                        <Menu.Item>
                          <Update productID={product.id} onUpdate={onUpdate} />
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            onClick={() => onDelete(product.id)}
                            className="bg-gray-200 rounded-md bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30"
                          >
                            Delete
                          </button>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
