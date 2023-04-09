import React, { useState } from "react";
import { TextInput } from "./TextInput";
import { Text } from "./Text";
import Image from "next/image";
import { Button } from "./Button";
// import { EmailIcon, FacebookIcon, PhoneIcon, WhatsappIcon } from "../icons";

const URL =
  "https://script.google.com/macros/s/AKfycbyWA81iY-k9_UAx78vEvaMEwJEtXcpJuiqr1lh3RmvRHauPZjP7XXpl7ReJPkMT5Ujo1w/exec";

export const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const params = {
    email,
    name,
    message,
  };

  async function sendEmail() {
    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(params),
    });

    const res = await response.json();
    if (res?.result?.contentLength > 0) {
      setName("");
      setEmail("");
      setMessage("");
    }
  }

  return (
    <div
      id="contact-form"
      className="bg-section bg-opacity-20 flex md:flex-row flex-col items-center justify-center md:py-16 md:mt-40 mt-24 pt-8 pb-12"
    >
      <div className="md:mb-12 md:mx-6 ml-2 mr-6 md:ml-0 md:mr-0">
        <Image
          src="/assets/contactCover.png"
          width={600}
          height={600}
          alt="1"
          quality={100}
        />
      </div>

      <div className="flex flex-col items-start md:py-16 bg-white rounded-2xl md:px-32 md:w-fit w-full px-6 md:-ml-12 -mt-8 md:-mt-0 py-8 ">
        <Text variant="title">დაგვიკავშირდით!</Text>

        <div className="flex flex-col items-start md:mt-12 mt-8 justify-center">
          <TextInput
            label="სახელი"
            className="md:mb-6 mb-5"
            onChange={(e: any) => setName(e.target.value)}
            value={name}
          />
          <TextInput
            label="ელ-ფოსტა"
            className="md:mb-6 mb-5"
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}
          />
          <TextInput
            label="მესიჯი"
            variant="textarea"
            className="mb-6"
            onChange={(e: any) => setMessage(e.target.value)}
            value={message}
          />

          <Button label="გაგზავნა" onClick={sendEmail} />
        </div>
      </div>
    </div>
  );
};
