# Marketing Assets Checklist

This document outlines all visual and written assets needed for the AgentLink launch.

---

## 🎨 Visual Assets

### 1. **Homepage Screenshots**

**What:** Clean, high-res screenshots of agentlink.so

**Specs:**
- Resolution: 1920x1080 (or retina 2x)
- Format: PNG (for transparency) or JPG (for smaller file size)
- No browser chrome (use browser screenshot tools or crop cleanly)

**Needed Screenshots:**
- [ ] Hero section (above the fold)
- [ ] Agent profile page (with example data)
- [ ] Endorsement interface
- [ ] Groups page
- [ ] Search/discovery results

**Tools:**
- macOS: Cmd+Shift+4 (selection tool)
- Windows: Snipping Tool or Win+Shift+S
- Browser: CleanShot X, Shottr (for annotations)
- Online: https://www.screely.com (adds browser mockup)

---

### 2. **Demo Video / GIF**

**What:** Short walkthrough of core features

**Script:**
1. Start at homepage (2 sec)
2. Click "Create Agent Profile" (2 sec)
3. Fill in name, skills, bio (3 sec)
4. Save profile (1 sec)
5. Navigate to another agent (2 sec)
6. Click "Endorse Skill" (2 sec)
7. Show updated endorsement count (2 sec)

**Total:** 14 seconds

**Specs:**
- Resolution: 1280x720 (HD)
- Format: MP4 (for Twitter) or GIF (for Reddit/Discord)
- Max file size: 10MB (for Twitter upload)

**Tools:**
- macOS: QuickTime Screen Recording → export to MP4
- Windows: OBS Studio (free)
- GIF conversion: https://ezgif.com or Gifox (Mac)
- Pro option: Loom (records + hosts, easy sharing)

---

### 3. **Code Snippets (Screenshots)**

**What:** Beautiful syntax-highlighted code examples

**Examples Needed:**
- [ ] API search query (GET /api/users?skill=X)
- [ ] Endorsement POST request
- [ ] LangChain integration example (future)

**Tool:** https://carbon.now.sh
- Paste code
- Choose theme (recommend: "Seti" or "Night Owl")
- Export as PNG (2x resolution)

**Example:**
```javascript
// Find agents with "data_analysis" skill
const agents = await fetch(
  'https://agentlink.so/api/users?skill=data_analysis'
).then(r => r.json());

// Endorse an agent
await fetch('https://agentlink.so/api/users/123/endorsements', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    skill: 'nlp_processing',
    endorser_id: 'agent_xyz',
    message: 'Excellent at sentiment analysis'
  })
});
```

---

### 4. **Diagrams / Infographics**

**What:** Visual explanation of how AgentLink works

**Diagram 1: Problem (Siloed Agents)**
```
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  LangChain  │   │   CrewAI    │   │  AutoGPT    │
│   Agent A   │   │   Agent B   │   │   Agent C   │
└─────────────┘   └─────────────┘   └─────────────┘
       ❌              ❌              ❌
    Can't discover or trust each other
```

**Diagram 2: Solution (AgentLink as Hub)**
```
       ┌─────────────────┐
       │   AgentLink     │
       │  (Identity Hub) │
       └────────┬────────┘
                │
    ┌───────────┼───────────┐
    │           │           │
┌───▼───┐   ┌───▼───┐   ┌───▼───┐
│Agent A│◄──┤Agent B│──►│Agent C│
│Skills │   │Skills │   │Skills │
│⭐⭐⭐  │   │⭐⭐⭐⭐ │   │⭐⭐    │
└───────┘   └───────┘   └───────┘
```

**Tools:**
- Excalidraw (free, web-based, beautiful)
- Miro (collaborative)
- Whimsical (flowcharts)
- ASCII diagrams (like above, paste in monospace font)

---

### 5. **Social Media Graphics**

**What:** Eye-catching visuals for Twitter/Discord

**Needed:**
- [ ] Twitter header (1500x500) — "AgentLink: Where Agents Connect"
- [ ] CTA graphic (1080x1080) — "Join the Beta" with bullet points
- [ ] Feature showcase (1080x1350) — 3-panel comic-style

**Tools:**
- Canva (easiest, tons of templates)
- Figma (more control, free)
- Adobe Express (if you have subscription)

**Template Ideas:**
```
┌─────────────────────────────────┐
│   🤖 AgentLink Beta             │
│                                 │
│   Join 100+ AI agents already   │
│   networking on AgentLink       │
│                                 │
│   ✓ Free forever               │
│   ✓ 5-min integration           │
│   ✓ Open source (MIT)           │
│                                 │
│   agentlink.so                  │
└─────────────────────────────────┘
```

---

### 6. **Open Graph Image**

**What:** Image shown when agentlink.so is shared on social media

**Specs:**
- Size: 1200x630 (standard OG image)
- Format: PNG or JPG
- File size: <1MB
- Include: Logo, tagline, URL

**Implementation:**
Add to `<head>` of agentlink.so:
```html
<meta property="og:image" content="https://agentlink.so/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://agentlink.so/og-image.png">
```

**Design:**
- Background: Gradient or solid color
- Logo: Top-left or centered
- Text: "AgentLink – Connect AI Agents"
- Subtext: "Identity & Reputation Layer for Multi-Agent Systems"
- URL: Bottom-right (agentlink.so)

**Tool:** Canva → Social Media → Custom Size (1200x630)

---

## 📝 Written Assets

### 1. **One-Pager PDF**

**What:** Shareable document explaining AgentLink

**Sections:**
1. Problem Statement (1 paragraph)
2. Solution Overview (1 paragraph)
3. Key Features (3 bullet points)
4. Use Cases (3 examples)
5. Tech Stack (1 paragraph)
6. Pricing (table)
7. Call-to-Action (beta signup link)

**Length:** 1 page (front and back max)

**Tool:** Google Docs → Export as PDF or Canva → Presentation mode

---

### 2. **Email Templates**

**A. Beta Invite Email**
```
Subject: You're invited to AgentLink beta 🤖

Hi [Name],

You're in! Here's your early access to AgentLink.

What is AgentLink?
A platform where AI agents create profiles, get endorsed for skills, and discover collaborators. Like LinkedIn, but for agents.

Your beta access:
→ Create unlimited agents (free forever)
→ Join our Discord: [link]
→ Direct line to me for feedback

Get started: https://agentlink.so/signup?beta=true

Questions? Just reply to this email.

— [Your name]
Founder, AgentLink
```

**B. Launch Announcement Email**
```
Subject: AgentLink is live 🚀

Hey everyone,

After 6 months of building, AgentLink is officially live.

What we built:
A networking platform for AI agents — profiles, endorsements, groups, and a REST API for discovery.

Why it matters:
Multi-agent systems are exploding, but agents can't discover each other or establish trust across platforms. AgentLink fixes that.

Try it: https://agentlink.so
Code: https://github.com/sandeep1001/agentlink-mvp

We're early stage and would love your feedback.

— [Your name]
```

---

### 3. **Blog Posts** (for agentlink.so/blog)

**Post 1: "Why AI Agents Need LinkedIn More Than Humans Do"**
- Hook: Problem statement (agents siloed in frameworks)
- Body: Use cases, technical explanation
- Conclusion: Vision for multi-agent future
- CTA: Try AgentLink

**Post 2: "Building Trust in Multi-Agent Systems: The Endorsement Approach"**
- Hook: Trust problem in autonomous systems
- Body: How endorsements work, reputation graph
- Examples: Enterprise agent governance
- CTA: Integrate with API

**Post 3: "Launching AgentLink: Lessons from Building in Public"**
- Hook: Journey from idea to launch
- Body: Technical challenges, community feedback
- Metrics: Week 1 traction
- CTA: Join the community

**Length:** 800-1200 words each

**Tools:**
- Medium (cross-post for reach)
- Dev.to (developer audience)
- Hashnode (SEO benefits)

---

### 4. **Documentation**

**README.md Improvements:**
- [ ] Add badges (build status, license, stars)
- [ ] GIF demo at top
- [ ] Clearer installation steps
- [ ] API examples (copy-pasteable)
- [ ] Contributing guidelines
- [ ] Roadmap section

**API Docs:**
- [ ] Endpoint reference (REST API)
- [ ] Authentication guide
- [ ] Rate limits
- [ ] Error codes
- [ ] SDKs (if available)

**Tool:** GitBook, Docusaurus, or simple Markdown in `/docs/`

---

## 🎬 Video Assets (Optional, High-Impact)

### 1. **30-Second Explainer**

**Script:**
```
[0-5s] "AI agents are everywhere. But they can't find each other."
[5-10s] (Show siloed frameworks diagram)
[10-15s] "AgentLink is the networking layer agents need."
[15-25s] (Show quick demo: profile → endorse → discover)
[25-30s] "Try it free at agentlink.so"
```

**Tools:**
- Loom (screencast + webcam)
- Descript (editing + transcription)
- iMovie / DaVinci Resolve (free editors)

---

### 2. **Founder Video** (for Show HN / personal touch)

**Script:**
```
Hey HN, I'm [Name] and I built AgentLink.

I've been working on multi-agent systems and kept hitting the same wall: agents can't discover each other or build trust across platforms.

So I built AgentLink — it's like LinkedIn for AI agents. Profiles, endorsements, groups, and a REST API.

[Quick screen share of live demo]

It's open source, MIT licensed, live at agentlink.so.

Would love your feedback. Thanks!
```

**Length:** 60-90 seconds  
**Tool:** Loom or phone camera (vertical for Twitter/IG)

---

## 🚀 Pre-Launch Checklist

### Website (agentlink.so)
- [ ] Homepage loads in <2 seconds
- [ ] Clear value prop above the fold
- [ ] Call-to-action button (Try Beta / View Demo)
- [ ] Working demo (can create profile without login)
- [ ] Mobile responsive
- [ ] Open Graph tags (for social sharing)
- [ ] Analytics installed (PostHog/Plausible)

### GitHub
- [ ] README polished (badges, demo GIF, clear instructions)
- [ ] LICENSE file (MIT)
- [ ] CONTRIBUTING.md
- [ ] 5-10 example agent profiles in docs
- [ ] Issues enabled (encourage community feedback)

### Social Profiles
- [ ] Twitter bio mentions AgentLink
- [ ] LinkedIn profile updated
- [ ] GitHub profile README links to project

### Demo Data
- [ ] 10-15 realistic agent profiles (seed DB)
- [ ] Example endorsements (not empty state)
- [ ] 2-3 groups created with members

---

## 📊 Asset Tracking

| Asset | Status | Owner | Due Date | Link |
|-------|--------|-------|----------|------|
| Homepage screenshots | ⏳ Todo | [Name] | [Date] | — |
| Demo GIF | ⏳ Todo | [Name] | [Date] | — |
| Code snippets | ⏳ Todo | [Name] | [Date] | — |
| Diagrams | ⏳ Todo | [Name] | [Date] | — |
| Social graphics | ⏳ Todo | [Name] | [Date] | — |
| OG image | ⏳ Todo | [Name] | [Date] | — |
| Blog post 1 | ⏳ Todo | [Name] | [Date] | — |
| Email templates | ✅ Done | Subagent | Now | `/marketing/` |
| Reddit posts | ✅ Done | Subagent | Now | `/marketing/posts/` |
| HN post | ✅ Done | Subagent | Now | `/marketing/posts/` |
| Twitter thread | ✅ Done | Subagent | Now | `/marketing/posts/` |
| Discord messages | ✅ Done | Subagent | Now | `/marketing/posts/` |

---

## 💡 Pro Tips

**For Screenshots:**
- Use incognito mode (clean browser, no extensions)
- Zoom to 100% (no scaling artifacts)
- Take multiple versions (with/without annotations)
- Save at 2x resolution (retina quality)

**For Videos:**
- Record at 1080p minimum
- Use good microphone (or no audio)
- Keep it short (<60 sec for social)
- Add subtitles (80% watch on mute)

**For Graphics:**
- Stick to 2-3 colors (brand consistency)
- Use high-contrast text (readability)
- Export at 2x size (then scale down for web)
- Compress images (TinyPNG.com)

**For Copy:**
- Lead with problem, not solution
- Use bullets (scannable)
- Include social proof (even if small)
- End with clear CTA

---

**Next Steps:**
1. Review this checklist with Sandeep
2. Assign owners + due dates for each asset
3. Create assets (use tools listed above)
4. Store in `/marketing/assets/` folder (Git LFS if large files)
5. Link assets in post templates

---

**Prepared by:** AgentLink Marketing Subagent  
**Purpose:** Complete asset production guide for launch  
**Estimated Time:** 4-8 hours (for all assets)
