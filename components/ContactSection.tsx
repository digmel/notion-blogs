import React, { useState } from "react";
import { TextInput } from "./TextInput";
import { Text } from "./Text";
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
      className="shadow-sm rounded-3xl shadow-gray-300 flex md:flex-row flex-col items-center justify-center"
    >
      <div className="flex flex-col items-start rounded-2xl md:px-32 md:w-fit w-full py-16">
        <Text variant="headline" className="text-gray-600">
          Contact us!
        </Text>

        <div className="flex flex-col items-start md:mt-12 mt-8 justify-start">
          <TextInput
            label="Name"
            className="md:mb-6 mb-5 text-start"
            onChange={(e: any) => setName(e.target.value)}
            value={name}
          />
          <TextInput
            label="Email Address"
            className="md:mb-6 mb-5 text-start"
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}
          />
          <TextInput
            label="Message"
            variant="textarea"
            className="mb-6 text-start"
            onChange={(e: any) => setMessage(e.target.value)}
            value={message}
          />

          <Button
            label="Submit"
            className="bg-sky-100 rounded"
            onClick={sendEmail}
          />
        </div>
      </div>
    </div>
  );
};
