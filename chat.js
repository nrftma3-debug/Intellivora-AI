
/* ===================== INTVORAAI AI CHAT ===================== */

const intvoraHistory = [];

async function botRespond(userText) {
  const text = String(userText || "").trim();
  if (!text) return;

  const loading = document.createElement("div");
  loading.className = "msg bot";
  loading.textContent = "INTVORAAI is thinking...";
  chatBody.appendChild(loading);
  chatBody.scrollTop = chatBody.scrollHeight;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text,
        history: intvoraHistory
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI request failed");
    }

    const reply = data.reply || "Sorry, I couldn't generate a response.";

    loading.textContent = reply;

    intvoraHistory.push(
      { role: "user", content: text },
      { role: "assistant", content: reply }
    );

    // Keep conversation history manageable.
    if (intvoraHistory.length > 20) {
      intvoraHistory.splice(0, 2);
    }

  } catch (error) {
    console.error("[INTVORAAI]", error);

    loading.textContent =
      "I'm having trouble connecting right now. Please try again.";
  }

  chatBody.scrollTop = chatBody.scrollHeight;
}

function sendMessage(text) {
  const cleanText = String(text || "").trim();
  if (!cleanText) return;

  addMsg(cleanText, "user");
  botRespond(cleanText);
}

window.sendMessage = sendMessage;
window.intvoraAddMessage = addMsg;
window.intvoraBotRespond = botRespond;

chatSend.addEventListener("click", () => {
  sendMessage(chatInput.value);
  chatInput.value = "";
});

chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage(chatInput.value);
    chatInput.value = "";
  }
});

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    sendMessage(chip.dataset.msg || chip.textContent || "");
  });
});
