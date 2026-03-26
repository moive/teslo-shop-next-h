import { Title } from "@/components";
import Link from "next/link";

export default function AddressPage() {
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000] flex flex-col justify-center text-left">
        <Title title="Address" subtitle="Delivery address" />

        <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
          <div className="flex flex-col mb-2">
            <span>Name</span>
            <input type="text" className="form-control" />
          </div>

          <div className="flex flex-col mb-2">
            <span>Last name</span>
            <input type="text" className="form-control" />
          </div>

          <div className="flex flex-col mb-2">
            <span>Address</span>
            <input type="text" className="form-control" />
          </div>

          <div className="flex flex-col mb-2">
            <span>Address 2 (optional)</span>
            <input type="text" className="form-control" />
          </div>

          <div className="flex flex-col mb-2">
            <span>Zip code</span>
            <input type="text" className="form-control" />
          </div>

          <div className="flex flex-col mb-2">
            <span>City</span>
            <input type="text" className="form-control" />
          </div>

          <div className="flex flex-col mb-2">
            <span>Country</span>
            <select className="form-control">
              <option value="">[ Choose ]</option>
              <option value="CRI">Costa Rica</option>
            </select>
          </div>

          <div className="flex flex-col mb-2">
            <span>Telephone</span>
            <input type="text" className="form-control" />
          </div>

          <div className="flex flex-col mb-2 sm:mt-10">
            <Link
              href="/checkout"
              className="btn-primary flex w-full sm:w-1/2 justify-center "
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
