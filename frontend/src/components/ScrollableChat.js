import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import { useEffect, useRef } from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // ✅ Scroll to bottom function with instant/smooth options
  const scrollToBottom = (smooth = false) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: smooth ? "smooth" : "instant",
        block: "end",
      });
    }
  };

  // ✅ Initial load - instant scroll to bottom (no animation)
  useEffect(() => {
    if (messages.length > 0) {
      // Instant scroll on initial load - no animation
      setTimeout(() => {
        scrollToBottom(false); // false = instant
      }, 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length > 0 ? messages[0]?._id : null]); // Only trigger on new chat load

  // ✅ New messages - smooth scroll to bottom
  useEffect(() => {
    if (messages.length > 1) {
      // Smooth scroll for new messages
      scrollToBottom(true); // true = smooth
    }
  }, [messages.length]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "10px 0",
        scrollBehavior: "auto", // Disable smooth scrolling by default
      }}
    >
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex", marginBottom: "8px" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                wordWrap: "break-word",
                fontSize: "14px",
                lineHeight: "1.4",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
      {/* ✅ Invisible element to scroll to */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ScrollableChat;
