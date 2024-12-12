import { createContext, useContext } from "react";

export const MessageContext = createContext(null);

// Create a custom hook to use the MessageContext
const useMessages = () => {
    return useContext(MessageContext);
};
export default useMessages