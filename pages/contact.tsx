import React from "react";
import { usePlatform } from "../hooks";
import { ContactSection, Text } from "../components";

export default function Home({ data }: Record<string, any>) {
  const isMobile = usePlatform();

  return (
    <div className="min-h-screen mx-40">
      <main>
        <div className="h-full py-24 flex justify-center">
          <div className="w-1/2 flex flex-col justify-center items-center text-center md:gap-12">
            <Text variant="headline-xl" className="text-gray-600">
              Deals are so good that it feels like smuggling!
            </Text>

            <Text variant="body" className="text-gray-500">
              Our team of expert and researchers provides valuable advice and
              tips on how to save money, get the most out of your purchases, and
              make informed buying decisions. Whether you&apos;re a seasoned
              bargain hunter or just looking for some inspiration, SmuggleBuy is
              the perfect place to start your shopping journey.
            </Text>

            <div className="">
              <ContactSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
