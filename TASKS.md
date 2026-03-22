# TASKS.md — GlowUp Skincare POC

> Target: Jr. Shopify Developer role at Aeon Ventures LLC
> Goal: Build a portfolio-ready Shopify store demonstrating all job requirements

---

## Phase 1: Store Foundation (Week 1)
> Theme customization, Liquid development, responsive design

### 1.1 Shopify Dev Store Setup
- [ ] Create Shopify Partner account
- [ ] Create development store (glowup-skincare.myshopify.com)
- [ ] Generate Storefront API credentials
- [ ] Install Shopify CLI on local machine

### 1.2 Theme Development
- [ ] Clone Dawn theme as base
- [ ] Create custom color scheme & typography (brand guide)
- [ ] Build `hero-custom.liquid` section ✅ (already scaffolded)
- [ ] Build `featured-products.liquid` section (product grid with hover effects)
- [ ] Build `testimonials.liquid` section (slider/carousel)
- [ ] Build `newsletter-popup.liquid` snippet
- [ ] Build `cart-drawer.liquid` section (slide-out cart)
- [ ] Build `product-tabs.liquid` section (description/reviews/shipping tabs)
- [ ] Create custom footer with links & social icons

### 1.3 Assets & Styling
- [ ] Custom CSS variables for brand colors
- [ ] Animate-on-scroll effects (jQuery)
- [ ] Mobile hamburger menu customization
- [ ] Lazy loading for product images
- [ ] Favicon & brand assets

### 1.4 Product Setup
- [ ] Create 8-10 sample products with variants
- [ ] Organize collections (Bestsellers, New Arrivals, Sale)
- [ ] Product images (placeholder from Unsplash/Pexels)
- [ ] SEO titles & descriptions for all products

### 1.5 Responsive QA
- [ ] Test on 375px, 428px, 768px, 1366px, 1920px
- [ ] Fix any layout breaks
- [ ] Touch-friendly interactions on mobile

**Deliverable:** Fully themed, responsive Shopify store

---

## Phase 2: API & Integrations (Week 2)
> Tracking, webhooks, third-party APIs

### 2.1 Facebook Pixel
- [ ] Create Facebook Business Manager + Pixel
- [ ] Install pixel via Shopify native integration
- [ ] Verify events: PageView, ViewItem, AddToCart, InitiateCheckout, Purchase
- [ ] Test with Facebook Pixel Helper Chrome extension
- [ ] Document setup in `docs/fb-pixel-setup.md`

### 2.2 Google Analytics 4
- [ ] Create GA4 property
- [ ] Install via Shopify native integration
- [ ] Set up enhanced ecommerce events
- [ ] Create custom events (newsletter signup, review submit)
- [ ] Verify with GA Debugger Chrome extension
- [ ] Document setup in `docs/ga4-setup.md`

### 2.3 Shopify Webhook Handler
- [ ] Set up Node.js webhook endpoint (`integrations/webhook-handler/`)
  - [ ] `package.json` + dependencies
  - [ ] `server.js` — Express server with HMAC verification
  - [ ] `handlers/order-created.js` — process new orders
- [ ] Register webhook in Shopify admin (orders/create)
- [ ] Send notification to Discord/Slack webhook on new order
- [ ] Deploy webhook handler (Railway/Render free tier or VPS)
- [ ] Test with a real order placement
- [ ] Document in `docs/webhook-setup.md`

### 2.4 Third-Party App Integration
- [ ] Install Judge.me (reviews app)
- [ ] Configure review widget on product pages
- [ ] Set up automated review request emails
- [ ] Style review widget to match theme

### 2.5 Custom GraphQL Widget
- [ ] Build product recommendations section using Storefront API
- [ ] "You might also like" based on collection/product type
- [ ] Fetch via AJAX on product page load
- [ ] Document in `docs/graphql-widget.md`

**Deliverable:** Fully tracked store with live webhook + integrations

---

## Phase 3: A/B Testing with Intelligems (Week 3)
> CRO experiments, data-driven optimization

### 3.1 Intelligems Setup
- [ ] Install Intelligems app from Shopify App Store
- [ ] Configure account & dashboard
- [ ] Verify snippet injection on storefront

### 3.2 Test 1: Product Page CTA
- [ ] Hypothesis: Red CTA with "Add to Bag — Free Shipping" converts higher
- [ ] Variant A: Default (green "Add to Cart")
- [ ] Variant B: Red "Add to Bag — Ships Free"
- [ ] Metric: Add-to-cart rate
- [ ] Run for 7 days minimum

### 3.3 Test 2: Free Shipping Banner
- [ ] Hypothesis: Progress bar showing "$X away from free shipping" increases AOV
- [ ] Variant A: Static "Free shipping on orders over $50"
- [ ] Variant B: Dynamic progress bar with cart total
- [ ] Metric: Average order value (AOV)

### 3.4 Test 3: Checkout Flow
- [ ] Hypothesis: Direct checkout button reduces cart abandonment
- [ ] Variant A: Standard "Add to Cart" → cart page → checkout
- [ ] Variant B: "Buy Now" button → skip cart → direct checkout
- [ ] Metric: Checkout completion rate

### 3.5 Documentation
- [ ] Screenshot all variants (before/after)
- [ ] Export Intelligems reports (screenshots + data)
- [ ] Write analysis in `docs/ab-test-report.md`
- [ ] Include learnings and next test recommendations

**Deliverable:** A/B test report with real data & screenshots

---

## Phase 4: QA & Polish (Week 4)
> Testing, documentation, portfolio preparation

### 4.1 QA Process
- [ ] Run through `docs/qa-checklist.md` ✅ (already created)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Device testing (iOS Safari, Android Chrome)
- [ ] Accessibility audit (contrast, keyboard nav, screen reader)
- [ ] Load speed optimization (target < 3s)
- [ ] Fix all discovered issues

### 4.2 Performance Optimization
- [ ] Lighthouse audit — target 90+ across all categories
- [ ] Optimize images (compress, WebP, lazy load)
- [ ] Minify CSS/JS
- [ ] Reduce layout shift (CLS)
- [ ] Before/after Lighthouse screenshots

### 4.3 Bug Documentation
- [ ] Intentionally identify & document 5+ bugs found during QA
- [ ] Fix each bug with before/after screenshots
- [ ] Write up in `docs/bug-fixes.md`

### 4.4 Final Reports
- [ ] `docs/qa-report.md` — full QA results
- [ ] `docs/ab-test-report.md` — A/B test findings
- [ ] `docs/challenging-project.md` — story for application Q6
- [ ] `docs/portfolio-summary.md` — 1-page project overview

### 4.5 Portfolio Package
- [ ] Record walkthrough video (Loom or similar)
- [ ] Take high-quality screenshots of key pages
- [ ] Update GitHub README with screenshots & links
- [ ] Prepare live store preview link

**Deliverable:** Polished store + complete documentation package

---

## Application Answers (Pre-Draft)

Based on this POC, answers to the 6 application questions:

| # | Question | Source |
|---|----------|--------|
| 1 | Years of Shopify experience | This POC + self-study hours |
| 2 | 5 Shopify websites | This POC + document 4 practice builds |
| 3 | Intelligems experience | Phase 3 real tests |
| 4 | QA process | `docs/qa-checklist.md` + Lighthouse |
| 5 | Staying updated | Shopify dev blog, community, podcasts |
| 6 | Challenging project | `docs/challenging-project.md` |

---

## Quick Reference

```
Repository: https://github.com/nemixe/glowup-shopify-poc
Dev Store:  (create in Phase 1.1)
Timeline:   4 weeks (2026-03-23 → 2026-04-19)
```
