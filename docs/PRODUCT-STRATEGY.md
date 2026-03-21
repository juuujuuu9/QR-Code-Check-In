# QR Check-In: Product Strategy

> Compiled: 2026-03-21

## Summary

Product strategy and competitive positioning for the QR Check-In app — covering market gaps, pricing tiers, customization philosophy, AI integration, and credibility-building tactics. Targets the underserved SME segment between spreadsheet hacks and enterprise overkill.

## Competitive Positioning

### Market Tiers

- **Enterprise ($5K+/yr):** Cvent, Bizzabo, Whova — overkill for small events
- **Mid-Market ($99-$499/event):** Zkipster, RSVPify, Guest Manager — per-event pricing friction
- **Freemium/Budget:** Eventbrite Organizer, Eventleaf, Jibble — limited customization, poor offline

### Key Gaps to Exploit

| Gap | Our Angle |
|-----|-----------|
| Offline-first | True airplane-mode functionality (not "sync when reconnected") |
| Staff UX | Satisfying audio-visual feedback designed for scanner, not guest |
| Zero-friction setup | CSV upload vs. complex registration flows |
| Transparent pricing | No "contact sales" — clear tiers |
| Multi-device simplicity | Seamless sync without IT setup |

---

## Customization Tiering

| Feature | Freemium | Pro |
|---------|----------|-----|
| Event name | Yes | Yes |
| "From" email address | Yes | Yes |
| Custom logo | No | Yes |
| Custom email copy | No | Yes |
| Custom colors (UI + email) | No | Yes |
| Custom domain for emails | No | Yes (consider) |

**Rationale:** Freemium = professional baseline (their identity visible). Pro = full brand ownership (our brand removed).

### Considerations

- "Via [AppName]" footer on freemium emails — keeps attribution, sets upgrade expectation
- Deliverability complexity: Custom from domains require SPF/DKIM — engineering cost vs. stickiness tradeoff
- Live color preview — show check-in screen + email simultaneously; aesthetic cohesion sells upgrades at weddings/events

### Potential Add-on

"Branding Pass" — $5-10/event for logo + colors only (one-off users not ready for Pro subscription)

---

## Staff Access Strategy

**Decision:** Include 1 staff user in freemium, paywall additional staff.

**Why:**
- Single organizers (freemium target) typically check in alone at small events
- Needing 2+ scanners = event growth = value proven = willingness to pay
- Charging for staff on tiny events feels like "tax on success"

### Tier Structure

- **Freemium:** 1 org, 1 active event, 1 staff, 150 guests
- **Pro ($29-49/mo):** Unlimited orgs/events, unlimited staff, 500+ guests, analytics
- **Business ($99-149/mo):** White-label, API, priority support

---

## AI Integration (Problem-First)

**Skip:** Facial recognition (commoditized, privacy complexity, overkill for small events)

### Implement

| Feature | Problem Solved | Implementation |
|---------|---------------|----------------|
| Smart Guest Prediction | QR fails/guest forgets phone — staff frantically searching | Fuzzy match on 3-4 chars (handles typos, "Mike" vs "Michael") |
| Walk-in Anomaly Detection | Crashers, duplicate passes, capacity issues | Real-time pattern flagging: same QR at multiple entrances, unusual velocity |
| Intelligent Audio Feedback | Generic beeps convey no information | Context-aware tones: VIP chime vs standard, distinct error tones for duplicates/not-found |
| Post-Event Insights (Pro) | Organizers want patterns, lack data skills | Natural language summary: "Most guests arrived 7:15-7:45 PM. 12 VIPs early. Consider opening bar at 7:00 next time." |

### Pro-tier AI Upsell

AI-generated email copy variations ("formal gala" vs "casual backyard" tone), smart color palette suggestions from uploaded logo — makes Pro feel "effortless" not just "more toggles."

---

## Credibility Building

### Phase 1: Social Proof Without Users

- Demo videos emphasizing the "satisfying" audio-visual feedback — visceral differentiator
- Self-hosted case study: document own test event, setup-to-scan timeline
- Transparent security docs: offline data handling, encryption, GDPR

### Phase 2: Early Adopter Program

- "Founding Organizer" tier: First 50 accounts get lifetime Pro at freemium price for video testimonials + feedback
- Wedding planner partnerships: Free Pro to 5-10 established planners for multi-event use + referrals
- Venue partnerships: Co-working spaces, boutique hotels, private dining — branded tablets in exchange for referrals

### Phase 3: Scale Trust

- Public uptime dashboard (sync success rates for offline-first claim)
- Open security audit results (crucial for private event data sensitivity)
- Founder story content (frustration with spreadsheet searching resonates)

### Specific Tactics

- "3-tap test" guarantee: >3 taps to check in = refund
- "Works in airplane mode" badge — document zero-connectivity performance
- Comparison transparency: Side-by-side setup time vs Eventbrite/RSVPify (2 min vs 20 min)

---

## Market Context

- Event management software CAGR: 8.6-13.1%
- SMEs represent largest underserved segment
- Positioning: "Fastest setup for private events" — between spreadsheet hacks and enterprise overkill

---

## Open Questions / TODO

- [ ] SPF/DKIM complexity assessment for custom email domains
- [ ] "Branding Pass" one-off pricing viability
- [ ] Fuzzy matching algorithm selection for guest prediction
- [ ] Audio synthesis library for intelligent feedback tones
- [ ] Founding Organizer tier capacity (50? 100?)
- [ ] Venue partnership legal structure (equipment loan vs. revenue share)

## References

- [MASTER-PLAN.md](./MASTER-PLAN.md) — dev checklist and roadmap
- [FOUNDER-CONTEXT.md](./FOUNDER-CONTEXT.md) — origin story and agency-specific insights
