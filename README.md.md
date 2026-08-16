# Intellivora AI --- Intelligent Virtual Operations & Automation

Intellivora AI is a futuristic, single-page website for an AI automation
agency. It combines a cyberpunk/enterprise visual interface with an
integrated sales chatbot, voice input, pricing controls, team
information, service sections, and contact/lead-capture UI.

## Project Overview

The website presents Intellivora AI's public-facing services, including:

-   Website chat systems
-   WhatsApp assistants
-   Appointment booking
-   Support and FAQ workflows
-   Lead capture
-   CRM automation
-   Invoicing automation
-   Workflow integrations
-   Aerospace and drone mission support
-   AI agents and digital-twin concepts

The website also includes an **Intellivora Sales AI** chat assistant
that answers questions about the website, services, pricing,
drone/aerospace offerings, and contact options.

## Main Features

### 1. AI Sales Chatbot

The floating chatbot can:

-   Explain the website
-   Describe Intellivora AI services
-   Provide the displayed pricing packages
-   Explain drone/aerospace services
-   Provide contact and consultation information
-   Handle quick-action buttons for:
    -   Smart Automation
    -   Drone Services
    -   Pricing
    -   Contact

The chatbot is intentionally based on the public information embedded in
the website and does not claim access to private or hidden backend data.

### 2. Voice Input

The chatbot includes a microphone button for speech-to-text.

The latest voice version includes:

-   Chrome SpeechRecognition support
-   Microphone permission handling
-   English speech recognition
-   Interim transcript display
-   Automatic submission of the recognized message
-   Microphone error handling
-   HTTPS/localhost security checks
-   Microphone permission persistence during the current page session
-   Audio capture checks for microphone availability

**Important:** For reliable voice recognition, deploy and open the
website through an HTTPS URL such as the Vercel deployment. Opening the
HTML directly with `file://` is not recommended for microphone features.

### 3. AI Voice Output

The **Voice** / **Voice On** control uses the browser's speech synthesis
capability to read chatbot responses aloud when enabled.

### 4. Responsive Navigation

The website includes:

-   Desktop navigation
-   Mobile hamburger menu
-   Mobile menu backdrop
-   Smooth section navigation
-   Responsive layouts

### 5. Services / Operations Interface

The site uses an interactive futuristic operations style with sections
for:

-   Chat Systems
-   Automations
-   Aerospace
-   Pricing
-   Contact

### 6. Team Information

The website includes interactive team introductions for roles such as:

-   Noor Fatima --- CEO
-   Muhammad Rayan --- CTO
-   Prof. Dr. Imran Babar --- Consultant

Team cards/buttons can update the introduction panel dynamically.

### 7. Pricing Toggle

The pricing section supports monthly/annual switching.

Displayed monthly prices include:

-   Starter Automation --- \$499/month
-   Pro Business Automation --- \$1,499/month
-   Enterprise & Aerospace Custom --- Custom quote

Annual-mode displayed prices are:

-   Starter Automation --- \$424/month
-   Pro Business Automation --- \$1,274/month
-   Enterprise & Aerospace Custom --- Custom quote

### 8. Contact / Mission Brief Form

The contact section includes fields for:

-   Name
-   Organization / Callsign
-   Email
-   Mission brief

The current front-end form displays a confirmation message after
submission; a production backend/email service should be connected if
real submissions are required.

### 9. Newsletter and Social UI

The footer includes:

-   Newsletter subscription UI
-   Instagram link
-   LinkedIn placeholder
-   X/Twitter placeholder
-   WhatsApp placeholder
-   Company navigation
-   Legal-policy placeholders

## Technology

The project is implemented primarily as a self-contained HTML page
using:

-   HTML5
-   CSS3
-   Vanilla JavaScript
-   Browser SpeechRecognition API
-   Browser SpeechSynthesis API
-   MediaDevices / microphone permissions
-   Responsive CSS
-   IntersectionObserver for reveal animations

No JavaScript framework is required for the current single-page
implementation.

## Running Locally

### Simple method

Open the HTML file in a modern browser.

For normal website UI testing, this is sufficient.

### Voice testing

For microphone/speech recognition, use a local HTTPS/localhost server or
the deployed Vercel website.

For example, if Python is installed:

``` bash
python -m http.server 8000
```

Then open:

``` text
http://localhost:8000/
```

For the most reliable production behavior, use the HTTPS Vercel
deployment.

## Deploying to Vercel

1.  Sign in to Vercel.
2.  Create/import the project.
3.  Upload or connect the website project.
4.  Deploy it.
5.  Open the generated HTTPS URL.
6.  Test the chatbot.
7.  Click the microphone.
8.  When Chrome asks for microphone permission, choose: **Allow while
    visiting the site**
9.  Reload once if necessary.
10. Test voice input again.

### Important voice-permission note

Chrome controls microphone permission at the browser/site level. The
website can request permission and avoid repeatedly requesting it during
the same page session, but it cannot silently override Chrome's
permission system.

If Chrome asks again, check:

**Chrome → Site settings → Microphone → Allow**

Also make sure the correct microphone/headset is selected in Windows
sound settings.

## Voice Troubleshooting

### "No speech detected"

Try:

-   Click the microphone button.
-   Wait for the listening indicator.
-   Speak clearly for 2--3 seconds.
-   Check that the correct microphone is selected.
-   Check Windows microphone permissions.

### "Microphone permission denied"

Use the lock/site-settings icon next to the website address and set:

**Microphone → Allow**

Then reload the page.

### "No microphone found"

Check:

**Windows Settings → System → Sound → Input**

Select the intended microphone or headset.

### Microphone is busy

Close applications that may already be using the microphone, such as:

-   Zoom
-   Microsoft Teams
-   Discord
-   OBS
-   Other browser tabs/apps using microphone access

Then retry.

### Voice works locally but not after deployment

Make sure the deployed website is opened using **HTTPS** and that
microphone permission is allowed for the deployed domain.

## File Structure

A simple deployment can use:

``` text
project/
├── index.html
└── README.md
```

If the HTML file has a different name, either rename it to `index.html`
or configure the deployment so the correct HTML file is served.

## Customization

Common areas that can be edited directly in the HTML include:

-   Brand text
-   Team introductions
-   Service descriptions
-   Pricing
-   Contact email
-   Social links
-   Chatbot responses
-   Voice language
-   Colors and visual theme
-   Navigation labels

The chatbot response data is stored in the JavaScript section of the
HTML file.

## Security and Privacy Notes

The current website is a front-end application.

Do not place:

-   API keys
-   Passwords
-   Secret tokens
-   Private credentials
-   Database credentials

directly into the HTML or client-side JavaScript.

If the project later connects to an AI API, CRM, database, email
service, or other private backend, keep secret credentials on a
server-side/backend environment and use environment variables.

## Production Checklist

Before publishing the final website:

-   [ ] Confirm the correct `index.html` is deployed.
-   [ ] Test desktop layout.
-   [ ] Test mobile layout.
-   [ ] Test chatbot responses.
-   [ ] Test Voice On output.
-   [ ] Test microphone speech-to-text.
-   [ ] Allow microphone permission on the production domain.
-   [ ] Test the contact form.
-   [ ] Replace placeholder social/legal links.
-   [ ] Connect a real form backend if leads must be received.
-   [ ] Add analytics if required.
-   [ ] Verify all external links.
-   [ ] Test the site in Chrome and another modern browser.

## Project Notes

The website is designed as a high-end futuristic AI automation agency
interface, combining a cyberpunk command-center aesthetic with an
enterprise landing-page structure.

The latest voice version focuses on making the microphone interaction
reliable while preserving the existing chatbot, Voice On output, visual
design, and website structure.
