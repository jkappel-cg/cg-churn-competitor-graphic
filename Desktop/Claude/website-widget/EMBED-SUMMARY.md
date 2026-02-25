# SMC Widget Embed System

## Files Created

### 1. **widget-embed.js** - Main Embed Script
- Dealers paste this into their website
- Auto-detects configuration from data attributes
- Creates iframe with widget content
- Handles inline blade or modal popup modes

### 2. **widget-iframe.html** - Widget Content
- The actual widget UI loaded inside iframe
- Receives configuration via URL parameters
- Isolated from dealer's website CSS/JS

### 3. **widget-iframe.js** - Widget Controller
- Handles widget logic inside iframe
- Posts messages to parent for resizing
- Navigation between screens

### 4. **dealer-install-guide.html** - Installation Documentation
- Copy/paste code examples
- Configuration options reference
- Best practices guide

## How It Works

```
Dealer Website
    ↓
  <script data-dealer-id="123" ...>
    ↓
  widget-embed.js (reads config)
    ↓
  Creates <iframe src="widget-iframe.html?dealerId=123&theme=dark...">
    ↓
  Widget loads and displays
```

## Dealer Usage Examples

### Inline Blade
```html
<div id="cargurus-smc-widget"></div>
<script src="https://widgets.cargurus.com/smc/widget-embed.js"
        data-dealer-id="12345"
        data-dealer-name="Riverside Motors"
        data-theme="dark"
        data-flow="detailed">
</script>
```

### Modal Popup
```html
<div id="cargurus-smc-widget"></div>
<script src="https://widgets.cargurus.com/smc/widget-embed.js"
        data-dealer-id="12345"
        data-dealer-name="Riverside Motors"
        data-mode="modal"
        data-button-text="Get An Offer"
        data-theme="dark"
        data-flow="quick">
</script>
```

## Configuration Options

| Attribute | Required | Options | Description |
|-----------|----------|---------|-------------|
| `data-dealer-id` | ✅ Yes | Dealer ID | Your unique dealer identifier |
| `data-dealer-name` | ✅ Yes | String | Your dealership name |
| `data-theme` | ⚪ No | `dark` \| `light` | Color theme (default: dark) |
| `data-flow` | ⚪ No | `detailed` \| `quick` | Screen count (default: detailed) |
| `data-mode` | ⚪ No | `inline` \| `modal` | Display mode (default: inline) |
| `data-button-text` | ⚪ No | String | Modal button text (modal only) |

## Next Steps for Production

1. **API Integration** - Connect to actual SMC backend:
   - Vehicle decode endpoint
   - Offer calculation using dealer's matrix
   - Lead submission to CRM

2. **CDN Hosting** - Host on CarGurus CDN:
   - `https://widgets.cargurus.com/smc/widget-embed.js`
   - Cache fonts and CSS assets

3. **Analytics** - Add tracking:
   - Widget impressions
   - Screen progression
   - Conversion rates
   - Abandonment points

4. **Security** - Add protections:
   - Validate dealer IDs
   - Rate limiting
   - CORS configuration
   - XSS prevention

5. **Testing** - QA checklist:
   - Cross-browser compatibility
   - Mobile responsive testing
   - Various CMS platforms (WordPress, Dealerfire, etc.)
   - A/B test quick vs detailed flow
