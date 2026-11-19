# Satin Clinic

The repository root contains the published site. There is no install or build step.

## GitHub Pages

In **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/ (root)**, and save. GitHub requires an eligible plan to publish Pages from a private repository. The homepage is `index.html` and each page has its own directory so deep links can be opened directly.

## Vercel

Import the GitHub repository when ready to deploy. Select **Other** when asked for a framework and leave the project root set to the repository root. The included configuration serves the static pages directly. Use the deployment account's profile settings for the deployment identity.

## Preview behavior

The consultation form shows an explicit preview message after browser validation. Connect a clinic-approved form endpoint and delivery destination before accepting requests. The reference's imagery and font assets use their original CDN URLs.

The promotional template and Made in Framer badges are removed from both page markup and the shared client runtime. The shared stylesheet rule also hides these badge types if they reappear.
