# Bloom Village App Store Checklist

## Done in this repo
- Pure React offline iOS-ready game
- English/Arabic bilingual UI
- Local-only game progress
- GitHub Pages privacy policy
- GitHub Pages support page
- App Store metadata text
- Privacy answers
- Age rating guide
- App icon source and 1024 PNG
- Screenshot templates

## Still required from App Store Connect / Xcode
- Publish this repo to GitHub
- Enable GitHub Pages using the `/docs` folder
- Replace `YOUR_GITHUB_USERNAME` in metadata URLs
- Replace support contact placeholder in `docs/support/index.html`
- Use a Mac with Xcode installed
- Run `npm install`
- Run `npm run build`
- Run `npx cap add ios`
- Open iOS project in Xcode
- Set signing team to your Apple Developer account
- Set Bundle ID to `com.dotk.bloomvillage`
- Set version `1.0` and build number `1`
- Add app icon in Xcode Assets
- Archive and upload to App Store Connect
- Add real screenshots from iPhone/iPad simulator or use the included template only if it accurately represents the app
- Complete App Privacy
- Complete Age Rating
- Submit to TestFlight first
