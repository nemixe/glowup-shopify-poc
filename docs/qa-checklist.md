# QA Checklist

## Cross-Browser
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Responsive
- [ ] Desktop (1920px)
- [ ] Laptop (1366px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)
- [ ] Large mobile (428px)

## Performance
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Lighthouse SEO ≥ 90
- [ ] Image optimization (WebP where possible)
- [ ] Lazy loading for images
- [ ] Minified CSS/JS

## Functionality
- [ ] Add to cart works
- [ ] Cart drawer opens/closes
- [ ] Checkout flow completes
- [ ] Product variants switch correctly
- [ ] Search returns results
- [ ] Navigation links work
- [ ] Footer links correct

## Integrations
- [ ] Facebook Pixel fires (PageView, ViewItem, AddToCart, Purchase)
- [ ] GA4 events tracking
- [ ] Webhook fires on order creation
- [ ] Slack/Discord notification received

## A/B Tests (Intelligems)
- [ ] Test variants render correctly
- [ ] No visual flicker on load
- [ ] Data flows to Intelligems dashboard

## Accessibility
- [ ] All images have alt text
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] Keyboard navigation works
- [ ] ARIA labels on interactive elements
