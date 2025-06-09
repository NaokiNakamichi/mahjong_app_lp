# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static landing page project to promote 3 mahjong training apps. The goal is to increase app downloads through web search for keywords like "麻雀 アプリ 上達" (mahjong app improvement).

## Apps Being Promoted

### Released Apps
1. **清一色1000** - Mahjong Chinichi practice app
   - App Store: https://apps.apple.com/jp/app/%E6%B8%85%E4%B8%80%E8%89%B21000/id1559676655
   - Play Store: https://play.google.com/store/apps/details?id=com.NaokiNakamichi.Mentin&hl=ja

2. **麻雀何切るAI** - AI-powered mahjong strategy app
   - App Store: https://apps.apple.com/us/app/%E9%BA%BB%E9%9B%80%E4%BD%95%E5%88%87%E3%82%8Bai/id6741804459
   - Play Store: https://play.google.com/store/apps/details?id=com.NaokiNakamichi.nanikiru&hl=ja

### In Development
3. **麻雀何切る牌効率** - Tile efficiency training app

## Technical Architecture

- **Implementation**: Single-file approach with HTML, CSS, and JavaScript
- **Deployment**: GitHub Pages with custom domain
- **Design**: Modern, responsive design for mobile and desktop
- **Structure**: Self-contained HTML file with embedded CSS and JavaScript

## Development Commands

Since this is a static site project, no build tools are required:

```bash
# Serve locally (if needed)
python -m http.server 8000
# or
npx serve .

# For GitHub Pages deployment
git add .
git commit -m "Update landing page"
git push origin main
```

## SEO Considerations

- Target keywords: "麻雀 アプリ 上達", "麻雀 練習", "麻雀 トレーニング"
- App Store links must be accurate and up-to-date
- Responsive design for mobile-first indexing
- Meta tags and structured data for app promotion