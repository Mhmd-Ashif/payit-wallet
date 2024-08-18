import Image from "next/image";
import loading from "../../public/loading.png";
export default function Loading() {
  return (
    <>
      {/* create a loader */}
      <div className="flex h-screen justify-center items-center">
        <div className="w-7 animate-spin">
          <Image src={loading} alt="loading..." />
        </div>
      </div>
    </>
  );
}
