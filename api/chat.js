/*
===========================================================
 INTELLIVORA AI — CHAT.JS
 Matching module for:
 html new voice NO PROMPT.html

 IMPORTANT:
 1. Load this file AFTER the chatbot HTML exists.
 2. Remove the old inline CHAT + VOICE sections from index.html
    before adding this file, otherwise events can be registered twice.
 3. Keep the normal HTML elements:
    #chat-toggle, #chat-window, #chatBody, #chatInput,
    #chatSend, #micBtn, #voiceToggle, #chatAvatar, #toggleAvatar
===========================================================
*/

(function () {
  'use strict';

  // Prevent this external module from being initialized twice.
  if (window.__INTELLIVORA_CHAT_JS_LOADED__) {
    console.warn('[Intellivora] chat.js already loaded.');
    return;
  }
  window.__INTELLIVORA_CHAT_JS_LOADED__ = true;

  const chatToggle = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const chatBody = document.getElementById('chatBody');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const askChatCTA = document.getElementById('askChatCTA');

  if (!chatBody || !chatInput || !chatSend) {
    console.warn('[Intellivora] Chat HTML elements not found.');
    return;
  }

  /* ===================== CHAT WINDOW ===================== */

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

  /* ===================== BOT KNOWLEDGE ===================== */

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
    const cleanText = String(text || '').trim();
    if (!cleanText) return;

    addMsg(cleanText, 'user');
    botRespond(cleanText);
  }

  // Public API used by the microphone module.
  window.sendMessage = sendMessage;
  window.intellivoraAddMessage = addMsg;
  window.intellivoraBotRespond = botRespond;

  chatSend.addEventListener('click', () => {
    sendMessage(chatInput.value);
    chatInput.value = '';
  });

  chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage(chatInput.value);
      chatInput.value = '';
    }
  });

  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      sendMessage(chip.dataset.msg || chip.textContent || '');
    });
  });

  /* ===================== VOICE OUTPUT ===================== */

  const voiceBtn = document.getElementById('voiceToggle');
  const chatAvatar = document.getElementById('chatAvatar');
  const toggleAvatar = document.getElementById('toggleAvatar');

  const voiceState =
    window.__voiceState ||
    (window.__voiceState = {
      listening: false,
      lastTranscript: '',
      enabled: false
    });

  window.__setAvatarTalking = function (on) {
    [chatAvatar, toggleAvatar].forEach((avatar) => {
      if (avatar) avatar.classList.toggle('talking', !!on);
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

  /* ===================== VOICE INPUT ===================== */

  const micBtn = document.getElementById('micBtn');
  const chatInputEl = document.getElementById('chatInput');

  if (micBtn && chatInputEl) {
    const Recognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    let recog = null;
    let micStream = null;
    let micPermissionReady = false;
    let lastRecognizedText = '';
    let flushTimer = null;
    let starting = false;

    const setMicUi = () => {
      micBtn.classList.toggle(
        'listening',
        !!voiceState.listening
      );

      micBtn.setAttribute(
        'aria-pressed',
        String(!!voiceState.listening)
      );

      micBtn.title = voiceState.listening
        ? 'Listening... speak now'
        : 'Tap to speak';

      micBtn.innerHTML = voiceState.listening
        ? '🎙️'
        : '🎤';

      chatInputEl.placeholder = voiceState.listening
        ? 'Listening... speak now'
        : 'Type a message or tap microphone';
    };

    const addVoiceHint = (message) => {
      addMsg(message, 'bot');
    };

    const stopMicStream = () => {
      if (!micStream) return;

      micStream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (error) {
          console.error('[Intellivora Mic]', error);
        }
      });

      micStream = null;
    };

    const flushTranscript = () => {
      const text = (
        lastRecognizedText ||
        chatInputEl.value ||
        ''
      ).trim();

      lastRecognizedText = '';

      if (!text) return;

      chatInputEl.value = text;

      // IMPORTANT:
      // Voice text goes through the exact same sendMessage()
      // path as typed chat messages.
      if (typeof window.sendMessage === 'function') {
        window.sendMessage(text);
        chatInputEl.value = '';
      }
    };

    setMicUi();

    if (Recognition) {
      try {
        recog = new Recognition();

        recog.lang = 'en-US';
        recog.interimResults = true;
        recog.continuous = false;
        recog.maxAlternatives = 1;

      } catch (error) {
        console.error(
          '[Intellivora Voice] SpeechRecognition setup error:',
          error
        );

        recog = null;
      }
    }

    if (recog) {
      recog.addEventListener('start', () => {
        starting = false;
        voiceState.listening = true;
        setMicUi();
      });

      recog.addEventListener('audiostart', () => {
        console.log('[Intellivora Voice] Microphone audio started.');
      });

      recog.addEventListener('soundstart', () => {
        console.log('[Intellivora Voice] Sound detected.');
      });

      recog.addEventListener('speechstart', () => {
        console.log('[Intellivora Voice] Speech detected.');
      });

      recog.addEventListener('result', (event) => {
        let finalText = '';
        let interimText = '';

        for (
          let i = event.resultIndex;
          i < event.results.length;
          i++
        ) {
          const result = event.results[i];
          const text =
            result?.[0]?.transcript || '';

          if (result.isFinal) {
            finalText += text + ' ';
          } else {
            interimText += text + ' ';
          }
        }

        const combined = (
          finalText ||
          interimText
        ).trim();

        if (combined) {
          lastRecognizedText = combined;
          chatInputEl.value = combined;
        }

        if (finalText.trim()) {
          clearTimeout(flushTimer);

          flushTimer = setTimeout(
            flushTranscript,
            100
          );
        }
      });

      recog.addEventListener('end', () => {
        starting = false;
        voiceState.listening = false;
        setMicUi();

        clearTimeout(flushTimer);

        if (lastRecognizedText.trim()) {
          flushTimer = setTimeout(
            flushTranscript,
            120
          );
        }

        // Do not request permission again.
        // The browser remembers the allowed site permission.
      });

      recog.addEventListener('error', (event) => {
        starting = false;
        voiceState.listening = false;
        setMicUi();

        clearTimeout(flushTimer);

        console.error(
          '[Intellivora Voice] SpeechRecognition error:',
          event.error
        );

        if (
          event.error === 'not-allowed' ||
          event.error === 'service-not-allowed'
        ) {
          addVoiceHint(
            '🎤 Microphone permission is blocked. Click 🔒 beside the website address → Microphone → Allow, then reload once.'
          );

        } else if (event.error === 'audio-capture') {
          addVoiceHint(
            '🎙️ Chrome cannot access a microphone. Check Windows Settings → System → Sound → Input.'
          );

        } else if (event.error === 'no-speech') {
          addVoiceHint(
            '🔇 No speech was detected. Tap the mic and speak clearly for 2–3 seconds.'
          );

        } else if (event.error === 'network') {
          addVoiceHint(
            '🌐 Speech recognition needs an internet connection. Check your connection and try again.'
          );

        } else if (event.error === 'aborted') {
          // Normal when the user stops recording.

        } else {
          addVoiceHint(
            '⚠️ Voice recognition failed. Please allow microphone access and use the HTTPS Vercel website.'
          );
        }
      });
    }

    /*
     * Request microphone permission ONLY ONCE.
     *
     * After Chrome has granted permission for the website,
     * later microphone clicks do not call getUserMedia again.
     */
    async function requestMicrophoneOnce() {
      if (micPermissionReady) {
        return true;
      }

      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        throw new Error('MIC_API_UNAVAILABLE');
      }

      micStream =
        await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          },
          video: false
        });

      const track =
        micStream.getAudioTracks()[0];

      if (!track || !track.enabled) {
        stopMicStream();
        throw new Error('MIC_DISABLED');
      }

      micPermissionReady = true;

      console.log(
        '[Intellivora Voice] Microphone permission granted:',
        track.label
      );

      return true;
    }

    async function startVoice() {
      if (
        starting ||
        voiceState.listening
      ) {
        return;
      }

      starting = true;

      const secure =
        window.isSecureContext ||
        location.hostname === 'localhost' ||
        location.hostname === '127.0.0.1';

      if (!secure) {
        starting = false;

        addVoiceHint(
          '🔐 Voice input needs HTTPS. Open the Vercel HTTPS website instead of file://.'
        );

        return;
      }

      if (!recog) {
        starting = false;

        addVoiceHint(
          '⚠️ This browser does not provide Speech-to-Text. Please use the latest Google Chrome.'
        );

        return;
      }

      try {
        lastRecognizedText = '';
        chatInputEl.value = '';

        // Permission request happens only once.
        await requestMicrophoneOnce();

        recog.start();

      } catch (error) {
        console.error(
          '[Intellivora Voice] Start error:',
          error
        );

        starting = false;
        voiceState.listening = false;
        setMicUi();

        if (error?.name === 'NotAllowedError') {
          addVoiceHint(
            '🎤 Microphone permission was denied. Click 🔒 beside the website URL → Microphone → Allow.'
          );

        } else if (error?.name === 'NotFoundError') {
          addVoiceHint(
            '🎙️ No microphone was found. Select your microphone in Windows Sound Settings.'
          );

        } else if (error?.name === 'NotReadableError') {
          addVoiceHint(
            '🎙️ Your microphone is busy in another app. Close Zoom, Teams, Discord, OBS, etc.'
          );

        } else if (
          error?.message === 'MIC_DISABLED'
        ) {
          addVoiceHint(
            '🎙️ The selected microphone is disabled. Check Windows Sound → Input.'
          );

        } else {
          addVoiceHint(
            '⚠️ Speech recognition could not start. Allow microphone access once and try again.'
          );
        }
      }
    }

    function stopVoice() {
      starting = false;

      try {
        if (recog) {
          recog.stop();
        }
      } catch (error) {
        console.error(
          '[Intellivora Voice] Stop error:',
          error
        );
      }

      voiceState.listening = false;
      setMicUi();
      clearTimeout(flushTimer);

      // Stop the audio stream after the user intentionally stops.
      // Chrome keeps the site's Allow permission, so the next use
      // will not normally show the permission popup again.
      stopMicStream();
    }

    micBtn.addEventListener('click', () => {
      if (
        voiceState.listening ||
        starting
      ) {
        stopVoice();
        return;
      }

      startVoice();
    });
  }

  /* ===================== BOT VOICE / AVATAR ===================== */

  const chatBodyObserver =
    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (
            node.nodeType !== 1 ||
            !node.classList ||
            !node.classList.contains('bot')
          ) {
            return;
          }

          if (window.__setAvatarTalking) {
            window.__setAvatarTalking(true);
          }

          const text =
            node.textContent || '';

          if (
            window.__voiceEnabled &&
            window.__voiceEnabled() &&
            'speechSynthesis' in window &&
            text.trim()
          ) {
            try {
              const speak = () => {
                const utterance =
                  new SpeechSynthesisUtterance(
                    text
                  );

                utterance.lang = 'en-US';
                utterance.rate = 1.02;
                utterance.pitch = 1.0;

                const voices =
                  window.speechSynthesis.getVoices();

                const englishVoice =
                  voices.find((voice) =>
                    /^en(-|_)/i.test(
                      voice.lang
                    )
                  );

                if (englishVoice) {
                  utterance.voice =
                    englishVoice;
                }

                utterance.onstart = () => {
                  if (
                    window.__setAvatarTalking
                  ) {
                    window.__setAvatarTalking(true);
                  }
                };

                utterance.onend = () => {
                  if (
                    window.__setAvatarTalking
                  ) {
                    window.__setAvatarTalking(false);
                  }
                };

                utterance.onerror = () => {
                  if (
                    window.__setAvatarTalking
                  ) {
                    window.__setAvatarTalking(false);
                  }
                };

                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(
                  utterance
                );
              };

              if (
                window.speechSynthesis.getVoices()
                  .length
              ) {
                speak();
              } else {
                window.speechSynthesis.addEventListener(
                  'voiceschanged',
                  speak,
                  { once: true }
                );

                setTimeout(speak, 300);
              }

            } catch (error) {
              console.error(
                '[Intellivora Voice Output]',
                error
              );
            }
          }

          setTimeout(() => {
            if (window.__setAvatarTalking) {
              window.__setAvatarTalking(false);
            }
          }, Math.min(4000, text.length * 38));
        });
      });
    });

  chatBodyObserver.observe(chatBody, {
    childList: true
  });

  console.log(
    '[Intellivora] chat.js initialized successfully.'
  );
})();
