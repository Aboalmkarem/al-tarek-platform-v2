import useMessages from "./context/messageContext";


const MessagePopup = () => {
    
    const {messages, removeMessage} = useMessages()
    return (
        <div className="p-5">
            <div className="fixed top-28 -right-64 z-50 space-y-3">
                {messages &&
                    messages.map((msg) => (
                        <div
                            ref={msg.ref}
                            key={msg.id}
                            className={`transition ease-in-out durition-500 flex items-center justify-between p-4 w-max rounded shadow-md text-white ${
                                msg.type === "success"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                            }`}
                        >
                            <span>{msg.message}</span>
                            <button
                                onClick={() => removeMessage(msg.id)}
                                className="text-white absolute -top-1 right-1"
                            >
                                &times;
                            </button>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-400">
                                <div
                                    ref={msg.progressRef}
                                    className="h-full bg-yellow-500"
                                    style={{ width: "100%" }}
                                ></div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default MessagePopup;
