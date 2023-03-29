import React from "react";
import Image from "next/image";

const imageUrl =
  "https://images.unsplash.com/photo-1516307318288-46d4194fe79e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb";

function demo() {
  return (
    <div className="min-h-screen w-screen">
      <main className="flex justify-center">
        <div className="pt-4 pb-16">
          <div className="flex items-center justify-start mb-4">
            <h1 className="text-2xl">Before</h1>
          </div>

          <div className="mx-4 flex justify-center border">
            <Image
              className="max-w-3/5 max-h-[400px] rounded-lg"
              src={imageUrl}
              width={800}
              height={400}
              alt=""
            />
          </div>

          <div className="flex items-center justify-start mb-4">
            <h1 className="text-2xl">After</h1>
          </div>

          <div className="mx-4 flex justify-center border">
            <Image
              className="max-w-3/5 max-h-[400px] rounded-lg"
              src={"/assets/testImage-output.webp"}
              width={800}
              height={400}
              alt=""
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default demo;
