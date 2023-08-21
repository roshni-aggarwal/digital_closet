import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import StarRatings from "react-star-ratings";

const View = ({ productID }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    rating: {
      rate: "",
      count: "",
    },
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    const requestProduct = async () => {
      const getProduct = await axios.get(`/products/${productID}`);

      setProduct(getProduct.data);
    };

    requestProduct();
  }, [productID]);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="bg-gray-200 rounded-md bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 "
      >
        View
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
                  <div className="h-96 relative">
                    <img
                      src={product.image}
                      alt="product"
                      className="w-full h-full"
                    />
                    <div
                      className={`absolute top-0 right-0 p-2 rounded-full outline outline-1 capitalize text-xs ${
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
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium">{product.title}</h3>
                    <div className="flex gap-1 items-center">
                      <span className="text-sm">{product.rating.rate}</span>
                      <StarRatings
                        rating={+product.rating.rate}
                        starRatedColor="yellow"
                        numberOfStars={5}
                        name="rating"
                        starSpacing="0px"
                        starDimension="14px"
                      />
                      <span className="text-xs text-teal-700">
                        {product.rating.count} ratings
                      </span>
                    </div>
                    <div className="font-medium text-3xl my-3">
                      $ {product.price}
                    </div>
                    <p>{product.description}</p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default View;
