import { createContext, useContext, useState } from "react";

const ContactContext = createContext();
function ContactProvider(props) {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const values = { show, setShow, toggle };
  return (
    <ContactContext.Provider value={values}>
      {props.children}
    </ContactContext.Provider>
  );
}

function useContact() {
  const context = useContext(ContactContext);
  if (typeof context === "undefined")
    throw new Error("useContact must be used within ContactProvider");
  return context;
}

export { useContact, ContactProvider };
