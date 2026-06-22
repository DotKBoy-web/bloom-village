# Bloom Village

Bloom Village is a cute bilingual offline garden game for iOS/iPadOS. It is built with React, Vite, and Capacitor.

## App Store identity

- App name: `Bloom Village`
- Bundle ID: `com.dotk.bloomvillage`
- SKU: `DOTK-BLOOM-VILLAGE-001`
- Version: `1.0`
- Price: Free
- Data collection: None
- Tracking: No
- Ads: No
- In-app purchases: No

## Repo structure

```text
src/                         Game source code
docs/                        GitHub Pages support and privacy pages
app-store/                   Ready-to-paste App Store metadata and answers
assets/app-icon-1024.png     App icon source PNG
app-store/screenshots/       Screenshot templates
capacitor.config.json        Capacitor iOS app configuration
```

## Local web test

```bash
npm install
npm run dev
```

## Production web build

```bash
npm run build
```

## Add iOS project on a Mac

Capacitor requires a Mac with Xcode for iOS builds.

```bash
npm install
npm run build
npx cap add ios
npx cap open ios
```

In Xcode:

1. Select the App target.
2. Set Team to your Apple Developer account.
3. Confirm Bundle Identifier is `com.dotk.bloomvillage`.
4. Set Version to `1.0` and Build to `1`.
5. Add the app icon from `assets/app-icon-1024.png`.
6. Archive the app.
7. Upload to App Store Connect.

## GitHub Pages privacy/support URLs

After pushing this repo to GitHub as `bloom-village`, enable GitHub Pages from GitHub repository settings.

Use these URLs in App Store Connect, replacing `YOUR_GITHUB_USERNAME`:

```text
Support URL:
https://YOUR_GITHUB_USERNAME.github.io/bloom-village/support/

Privacy Policy URL:
https://YOUR_GITHUB_USERNAME.github.io/bloom-village/privacy/
```

Before publishing, edit `docs/support/index.html` and replace the placeholder support email.

## App Review notes

Use `app-store/metadata-en-AU.md`, `app-store/privacy-answers.md`, and `app-store/age-rating-guide.md` when filling App Store Connect.
