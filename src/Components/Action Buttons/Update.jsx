import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { BiSolidPencil } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

const Update = ({ productID, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const requestProduct = async () => {
      const getProduct = await axios.get(`/products/${productID}`);

      setProduct(getProduct.data);
    };

    requestProduct();
  }, [productID]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleNewProductChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsOpen(false);
    onUpdate(product);
  };
  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="bg-gray-200 rounded-md bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 "
      >
        Update
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="text-lg font-medium leading-6 text-gray-900 "
                  >
                    <div className="flex justify-between items-center">
                      <BiSolidPencil size={40} className="text-teal-300" />
                      <IoMdClose
                        onClick={closeModal}
                        className={"cursor-pointer"}
                        size={20}
                      />
                    </div>
                    <h3 className="font-semibold text-xl mt-3">
                      Update Product
                    </h3>
                  </Dialog.Title>
                  <form
                    onSubmit={handleSubmit}
                    className="mt-6 flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-1">
                      <label htmlFor="name" className="font-medium text-sm ">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={product.title}
                        onChange={handleNewProductChange}
                        className="px-4 py-2 border border-gray-400 rounded-md focus:outline-teal-400"
                        placeholder="T-shirt"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="price" className="font-medium text-sm ">
                        Price
                      </label>
                      <input
                        type="text"
                        name="price"
                        id="price"
                        value={product.price}
                        onChange={handleNewProductChange}
                        className="px-4 py-2 border border-gray-400 rounded-md focus:outline-teal-400"
                        placeholder="30.25"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="description"
                        className="font-medium text-sm "
                      >
                        Description
                      </label>
                      <textarea
                        type="text"
                        name="description"
                        id="description"
                        rows={5}
                        value={product.description}
                        onChange={handleNewProductChange}
                        className="px-4 py-2 border border-gray-400 rounded-md focus:outline-teal-400"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="image" className="font-medium text-sm ">
                        Image
                      </label>
                      <input
                        type="text"
                        name="image"
                        id="image"
                        value={product.image}
                        onChange={handleNewProductChange}
                        className="px-4 py-2 border border-gray-400 rounded-md focus:outline-teal-400"
                        placeholder="Enter image link"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="category"
                        className="font-medium text-sm "
                      >
                        Category
                      </label>
                      <select
                        name="category"
                        id="category"
                        value={product.category}
                        onChange={handleCategoryChange}
                        className="px-4 py-2 border border-gray-400 rounded-md focus:outline-teal-400"
                      >
                        <option value="">-- Please select a category --</option>
                        <option value="men's clothing">Men's Clothing</option>
                        <option value="women's clothing">
                          Women's Clothing
                        </option>
                        <option value="jewlery">Jewelery</option>
                        <option value="electronics">Electronics</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-lg outline outline-1 outline-teal-600 text-center px-4 py-2 bg-teal-200 hover:bg-teal-400 font-medium"
                    >
                      Update
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Update;
