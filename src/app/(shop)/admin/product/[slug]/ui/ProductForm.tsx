"use client";

import { IProduct as Product } from "@/interfaces";

interface Props {
  product: Product;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product }: Props) => {
  return (
    <form className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      <div className="w-full">
        <div className="flex flex-col mb-4">
          <span>Title</span>
          <input type="text" className="form-control" />
          {/* <input type="text" className="p-2 border rounded-md bg-gray-200" /> */}
        </div>

        <div className="flex flex-col mb-4">
          <span>Slug</span>
          <input type="text" className="form-control" />
        </div>

        <div className="flex flex-col mb-4">
          <span>Description</span>
          <textarea rows={5} className="form-control"></textarea>
        </div>

        <div className="flex flex-col mb-4">
          <span>Price</span>
          <input type="number" className="form-control" />
        </div>

        <div className="flex flex-col mb-4">
          <span>Tags</span>
          <input type="text" className="form-control" />
        </div>

        <div className="flex flex-col mb-4">
          <span>Gender</span>
          <select className="form-control">
            <option value="">[Choose]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-4">
          <span>Category</span>
          <select className="form-control">
            <option value="">[Choose]</option>
          </select>
        </div>

        <button className="btn-primary w-full">Save</button>
      </div>

      <div className="w-full">
        {/* As checkboxs */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- is selected
              <div
                key={size}
                className="flex  items-center justify-center w-10 h-10 mr-2 border border-gray-300 bg-white rounded-md cursor-pointer"
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-4">
            <span>Photos</span>
            <input
              type="file"
              multiple
              className="form-control"
              accept="image/png, image/jpeg"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
