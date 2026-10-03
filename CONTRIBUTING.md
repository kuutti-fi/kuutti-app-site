# Contributing

The site follows the rules of the app's repository: [CONTRIBUTING.md there](https://github.com/kuutti-ry/kuutti-app/blob/main/CONTRIBUTING.md) says how, and why every commit is signed off.

In short:

1. Every commit carries a sign-off (`git commit -s`): you certify the [Developer Certificate of Origin](https://developercertificate.org/). Enable the hook once per clone: `git config core.hooksPath .githooks`.
2. Changes reach `main` through a pull request whose body says `Refs kuutti-ry/kuutti-app#<n>`, never a closing keyword.
3. `pnpm typecheck && pnpm lint && pnpm test && pnpm build && pnpm check:site` pass before you push.

What is particular to the site is in `CLAUDE.md`: no script, nothing from elsewhere, no legal text by a machine, nobody named without their word.

If you read Finnish or Swedish as your own language, `docs/translation-review.md` lists what waits for you, once the site has those languages again.
