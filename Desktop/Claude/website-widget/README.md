# SMC Dealership Website Widget - Prototypes

Two functional prototype variants of the embeddable SMC widget for dealer websites.

## 📁 Structure

```
website-widget/
├── assets/
│   └── css/
│       └── widget-base.css      # Shared styles for both prototypes
├── prototypes/
│   ├── quick-mode/              # Streamlined 2-3 screen experience
│   │   ├── index.html
│   │   └── quick-mode.js
│   └── detailed-mode/           # Full 5-screen experience
│       ├── index.html
│       └── detailed-mode.js
└── README.md
```

## 🚀 How to View

Simply open either HTML file in a browser:

**Quick Mode (Recommended for MVP):**
```bash
open prototypes/quick-mode/index.html
```

**Detailed Mode:**
```bash
open prototypes/detailed-mode/index.html
```

## 🎯 Prototype Comparison

### Quick Mode (2-3 Screens)
**Best for:** Fast lead capture, lower friction, mobile-friendly

**Flow:**
1. **Vehicle Entry** - VIN/plate + state + mileage (all on one screen)
2. **Offer + Quick Condition** - Show offer immediately with simple condition selector
3. **Contact Info** - Capture lead details
4. **Confirmation**

**Pros:**
- Faster completion time
- Less intimidating for users
- Better mobile experience
- Lower abandonment risk

**Cons:**
- Less detailed vehicle data collected
- Might require more dealer follow-up

---

### Detailed Mode (5 Screens)
**Best for:** High-fidelity experience matching CarGurus marketplace

**Flow:**
1. **VIN Entry** - State, VIN/plate, ZIP
2. **Confirm Vehicle** - Verify decoded vehicle, select trim
3. **Basic Info & Condition** - Mileage, condition, ownership status
4. **Offer Display** - Show calculated offer
5. **Contact Info** - Capture lead details
6. **Confirmation**

**Pros:**
- More accurate offers (more data inputs)
- Mirrors familiar CarGurus experience
- Collects richer lead data upfront

**Cons:**
- Higher drop-off risk (more steps)
- Takes more screen space
- More complex for dealers to embed

## 🎨 Design Features

Both prototypes include:
- ✅ Responsive design (mobile + desktop)
- ✅ CarGurus brand styling
- ✅ Dealer logo placeholder
- ✅ Loading states
- ✅ Form validation
- ✅ Progress indicators
- ✅ Accessible form controls
- ✅ Clean, modern UI matching CG design system

## 🔧 Next Steps

1. **Stakeholder review** - Which mode aligns best with business goals?
2. **Technical implementation** - Build embeddable script with real API integration
3. **Dealer admin interface** - Config panel in dealer dashboard
4. **Analytics instrumentation** - Track conversion funnel
5. **A/B testing setup** - Compare quick vs detailed in production

## 📝 Configuration Requirements (Future)

The final widget will need:
- `data-dealer-id` - Dealer identifier
- `data-primary-color` - Brand color override (optional)
- `data-logo-url` - Dealer logo URL (optional)
- API endpoints for:
  - Vehicle decode (VIN/plate lookup)
  - Offer calculation (using SMC matrix)
  - Lead submission

## 💡 Implementation Notes

Current prototypes use:
- Pure HTML/CSS/JavaScript (no frameworks)
- Simulated API delays with setTimeout
- Static offer amounts (will be dynamic in production)
- Mock vehicle data

For production, consider:
- Shadow DOM or iframe isolation
- Configurable theming system
- Real-time offer calculation
- CRM integration webhooks
