import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

const WEBHOOK_URL =
  "https://bernard-department-compare-deals.trycloudflare.com/webhook/540fd741-fb9e-455d-a214-7299729ffc6d";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingEmail, setIsSavingEmail] = useState(false);
  const [emailSaved, setEmailSaved] = useState(
    () => localStorage.getItem("glide-chat-email-saved") === "true"
  );
  const [marketingConsent, setMarketingConsent] = useState(false);

  const messagesEndRef = useRef(null);

  // Automatically scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  const getSessionId = () => {
    let sessionId = localStorage.getItem("glide-chat-session");

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("glide-chat-session", sessionId);
    }

    return sessionId;
  };

  // Save email
  const saveEmail = async () => {
    const trimmedEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return;
    }

    if (isSavingEmail) return;

    setIsSavingEmail(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "save_email",
          email: trimmedEmail,
          marketingConsent,
          sessionId: getSessionId(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save email");
      }

      localStorage.setItem("glide-chat-email-saved", "true");
      setEmailSaved(true);
      setEmail("");
    } catch (error) {
      console.error("Email saving error:", error);
    } finally {
      setIsSavingEmail(false);
    }
  };

  // Send chat message
  const sendMessage = async () => {
    const userMessage = message.trim();

    if (!userMessage || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);

    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "chat",
          message: userMessage,
          sessionId: getSessionId(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to chatbot");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.output || "Sorry, I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Glide Assistant"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-lime-400 to-green-500 text-black shadow-[0_0_30px_rgba(74,222,128,0.35)] transition-all duration-300 hover:scale-110"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="flex h-[min(520px,calc(100dvh-32px))] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-green-500/20 bg-[#090909] shadow-[0_0_50px_rgba(34,197,94,0.12)]">
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-green-500/20 bg-gradient-to-r from-green-950 to-[#101810] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-400 text-black">
                <Bot size={23} />
              </div>

              <div>
                <h3 className="font-semibold text-white">Glide Assistant</h3>
                <p className="text-xs text-green-400">● Online · AI Assistant</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
              className="text-gray-400 transition hover:text-white"
            >
              <X size={22} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
            {/* Welcome Message */}
            <div className="max-w-[85%] self-start rounded-2xl rounded-tl-none border border-green-500/10 bg-[#171717] p-3 text-sm leading-relaxed text-gray-200">
              Hi! Welcome to Glide. I'm Glide's virtual assistant. How can I help
              you today?
            </div>

            {/* Email Collection */}
            {!emailSaved && (
              <div className="w-full max-w-[95%] self-start rounded-2xl rounded-tl-none border border-green-500/20 bg-[#171717] p-3">
                <p className="mb-3 text-sm text-gray-200">
                  Your email, so we can follow up.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveEmail();
                  }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="mb-3 w-full rounded-lg border border-white/10 bg-[#090909] px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-green-500"
                  />

                  <label className="mb-3 flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="mt-1 accent-green-500"
                    />
                    <span className="text-xs leading-relaxed text-gray-400">
                      I agree to receive updates and offers by email.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!email.trim() || isSavingEmail}
                    className="w-full rounded-lg bg-green-500 py-2.5 text-sm font-semibold text-black transition hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {isSavingEmail ? "Saving..." : "Save"}
                  </button>
                </form>

                <button
                  type="button"
                  onClick={() => setEmailSaved(true)}
                  className="mt-2 w-full py-1 text-xs text-gray-500 transition hover:text-white"
                >
                  Skip for now
                </button>
              </div>
            )}

            {/* Conversation Messages */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] break-words rounded-2xl p-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "self-end rounded-tr-none bg-green-500 text-black"
                    : "self-start rounded-tl-none border border-green-500/10 bg-[#171717] text-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Animated Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-1 self-start rounded-2xl rounded-tl-none border border-green-500/10 bg-[#171717] px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-lime-400" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-lime-400 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-lime-400 [animation-delay:300ms]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="shrink-0 border-t border-white/10 p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#151515] p-2"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message..."
                disabled={isLoading}
                className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-gray-500"
              />

              <button
                type="submit"
                disabled={!message.trim() || isLoading}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-lime-400 to-green-500 text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={18} />
              </button>
            </form>

            <p className="mt-2 text-center text-[10px] text-gray-600">
              Powered by Glide AI
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;