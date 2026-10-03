<!-- What changes and why. -->

Refs kuutti-ry/kuutti-app#

<!-- One "Refs" per issue this touches; the site's issues live in the app's
     repository. Never "Closes/Fixes/Resolves": the maintainer closes an issue
     after looking at the result, not a merge (CI checks this). -->

## Checklist

- [ ] Every commit is signed off (`git commit -s`, DCO).
- [ ] New or changed Finnish and Swedish text carries `machine: true` (written by a machine, an agent, or anyone but a native reader); `reviewedBy` is written only for a native reader who approves this pull request.
- [ ] No legal text was written or translated by a machine into a language it did not exist in.
- [ ] Nobody is named who has not asked to be.
- [ ] The site still runs no script and loads nothing from anybody else (`pnpm build && pnpm check:site`).
- [ ] Looked at on a phone-sized screen and at the largest text size.
- [ ] `pnpm typecheck && pnpm lint && pnpm test` pass locally.
