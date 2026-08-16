/*
 * Intellivora AI — Chatbot Module
 * Extracted from the website's chatbot logic.
 *
 * Required HTML elements:
 * #chat-toggle
 * #chat-window
 * #chatBody
 * #chatInput
 * #chatSend
 * #askChatCTA (optional)
 * .chip elements (optional)
 * #voiceToggle (optional)
 * #chatAvatar / #toggleAvatar (optional)
 *
 * Load this file after the chatbot HTML exists, or use defer.
 */

(function () {
  'use strict';

  const chatToggle = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const chatBody = document.getElementById('chatBody');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const askChatCTA = document.getElementById('askChatCTA');

  if (!chatBody || !chatInput || !chatSend) {
    console.warn('[Intellivora Chat] Required chatbot elements were not found.');
    return;
  }

  if (chatToggle && chatWindow) {
    chatToggle.addEventListener('click', () => {
      chatWindow.classList.toggle('open');
    });
  }

  if (askChatCTA && chatWindow) {
    askChatCTA.addEventListener('click', () => {
      chatWindow.classList.add('open');
      chatInput.focus();
    });
  }

  function addMsg(text, who) {
    const message = document.createElement('div');
    message.className = 'msg ' + who;
    message.textContent = text;
    chatBody.appendChild(message);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  const botReplies = {
    website:
      "This website shows Intellivora AI's public services: website chatbots, business automations, workflow integrations, aerospace/drone services, pricing packages, and contact options. I only know the public content shown here, not any private or hidden data.",

    services:
      "Intellivora AI offers website chat systems, WhatsApp assistants, appointment booking, support/FAQ workflows, lead capture, CRM automation, invoicing automation, and aerospace/drone mission support. Ask me about any of these services.",

    pricing:
      "Our packages are:\n• Starter Automation — $499/mo: website chatbot, basic email/CRM automation, WhatsApp integration.\n• Pro Business Automation — $1,499/mo: omni-channel bots, complex workflows, AI receptionist, auto invoicing.\n• Enterprise & Aerospace Custom — Custom quote: custom AI agents, digital twins, drone systems, and mission-grade integrations.",

    contact:
      "You can book a consultation through the contact section or email intellivoraai@gmail.com. I can also help you choose a package or request a workflow review.",

    drones:
      "Our aerospace division includes drone navigation, coordinated UAV systems, satellite image analysis, predictive maintenance, and aerospace digital twins. This is built for commercial and mission-critical operations.",

    privateAccess:
      "I do not have access to private accounts or confidential backend data. I only know what is visible on this website and can answer questions about those public services.",

    greeting:
      "Hello 👋 I’m IntelliVora AI Assistant. I can explain this website, our services, pricing, and contact options. What would you like to know?",

    fallback:
      "I can help with this website's services, pricing, chat systems, drone/aerospace offerings, or contact options. Please ask about pricing, services, or how to book a demo."
  };

  function botRespond(userText) {
    const key = userText.trim().toLowerCase();
    if (!key) return;

    let reply = '';

    if (
      key.includes('website') ||
      key.includes('site') ||
      key.includes('what is this') ||
      key.includes('who are you') ||
      key.includes('web kia') ||
      key.includes('what is intellivora') ||
      key.includes('about us')
    ) {
      reply = botReplies.website;

    } else if (
      key.includes('service') ||
      key.includes('services') ||
      key.includes('what do you do') ||
      key.includes('tell me about') ||
      key.includes('service kya')
    ) {
      reply = botReplies.services;

    } else if (
      key.includes('price') ||
      key.includes('cost') ||
      key.includes('package') ||
      key.includes('tier') ||
      key.includes('pricing')
    ) {
      reply = botReplies.pricing;

    } else if (
      key.includes('contact') ||
      key.includes('book') ||
      key.includes('demo') ||
      key.includes('audit') ||
      key.includes('consult')
    ) {
      reply = botReplies.contact;

    } else if (
      key.includes('drone') ||
      key.includes('aerospace') ||
      key.includes('uav') ||
      key.includes('flight') ||
      key.includes('satellite') ||
      key.includes('maintenance')
    ) {
      reply = botReplies.drones;

    } else if (
      key.includes('private') ||
      key.includes('account') ||
      key.includes('data') ||
      key.includes('personal') ||
      key.includes('hidden') ||
      key.includes('secret')
    ) {
      reply = botReplies.privateAccess;

    } else if (
      key.includes('hello') ||
      key.includes('hi') ||
      key.includes('hey') ||
      key.includes('assalam') ||
      key.includes('salam') ||
      key.includes('good morning') ||
      key.includes('good evening') ||
      key.includes('good night')
    ) {
      reply = botReplies.greeting;

    } else if (
      key.includes('automation') ||
      key.includes('workflow') ||
      key.includes('crm') ||
      key.includes('invoice') ||
      key.includes('whatsapp') ||
      key.includes('lead')
    ) {
      reply = botReplies.services;

    } else {
      reply = botReplies.fallback;
    }

    setTimeout(() => addMsg(reply, 'bot'), 500);
  }

  function sendMessage(text) {
    if (!text || !text.trim()) return;

    addMsg(text.trim(), 'user');
    botRespond(text.trim());
  }

  // Expose these functions so the voice-input module can submit
  // recognized speech through the same chatbot path.
  window.sendMessage = sendMessage;
  window.intellivoraAddMessage = addMsg;
  window.intellivoraBotRespond = botRespond;

  chatSend.addEventListener('click', () => {
    sendMessage(chatInput.value);
    chatInput.value = '';
  });

  chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      sendMessage(chatInput.value);
      chatInput.value = '';
    }
  });

  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      sendMessage(chip.dataset.msg || chip.textContent);
    });
  });

  /*
   * Voice output
   * Uses the browser SpeechSynthesis API when the Voice button is enabled.
   */
  const voiceBtn = document.getElementById('voiceToggle');
  const chatAvatar = document.getElementById('chatAvatar');
  const toggleAvatar = document.getElementById('toggleAvatar');

  const voiceState =
    window.__voiceState ||
    (window.__voiceState = {
      enabled: false
    });

  window.__setAvatarTalking = function (on) {
    [chatAvatar, toggleAvatar].forEach((avatar) => {
      if (avatar) avatar.classList.toggle('talking', on);
    });
  };

  window.__voiceEnabled = () => Boolean(voiceState.enabled);

  window.__setVoiceEnabled = (on) => {
    voiceState.enabled = Boolean(on);

    if (!voiceState.enabled && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (error) {
        console.error('[Intellivora Voice]', error);
      }

      window.__setAvatarTalking(false);
    }
  };

  function applyVoiceToggle(on) {
    window.__setVoiceEnabled(on);

    if (voiceBtn) {
      voiceBtn.classList.toggle('active', voiceState.enabled);
      voiceBtn.textContent = voiceState.enabled
        ? '🔊 Voice On'
        : '🔇 Voice';
    }

    if (voiceState.enabled && 'speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(
          'Voice is now on.'
        );

        utterance.lang = 'en-US';
        utterance.rate = 1.02;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('[Intellivora Voice]', error);
      }
    }
  }

  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      applyVoiceToggle(!voiceState.enabled);
    });
  }

  /*
   * Watch for new bot messages and optionally speak them aloud.
   */
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType !== 1 ||
          !node.classList ||
          !node.classList.contains('bot')
        ) {
          return;
        }

        const text = node.textContent || '';

        if (window.__setAvatarTalking) {
          window.__setAvatarTalking(true);
        }

        if (
          voiceState.enabled &&
          'speechSynthesis' in window &&
          text.trim()
        ) {
          try {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 1.02;

            utterance.onend = () => {
              if (window.__setAvatarTalking) {
                window.__setAvatarTalking(false);
              }
            };

            utterance.onerror = () => {
              if (window.__setAvatarTalking) {
                window.__setAvatarTalking(false);
              }
            };

            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
          } catch (error) {
            console.error('[Intellivora Voice]', error);
            window.__setAvatarTalking(false);
          }
        } else {
          setTimeout(() => {
            if (window.__setAvatarTalking) {
              window.__setAvatarTalking(false);
            }
          }, 900);
        }
      });
    });
  });

  observer.observe(chatBody, { childList: true });

  console.log('[Intellivora Chat] Chat module initialized.');
})();