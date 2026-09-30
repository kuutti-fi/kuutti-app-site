# Open questions

What is the maintainer's to decide or to supply, and what the site says meanwhile. Nothing on the site pretends that one of these is settled.

## Could not be done

- **The text from the Cowork session** (`cse_01RmAvHDCXcxKiEwW57GkrDh`) is not in the site. The session is not among those that can be read from the session the site was made in, and nothing of it was found in Drive. The privacy policy and the terms here are drafts written from what the app's code does. When the session's text is at hand (exported, or pasted into a document), the two are put together.

## About the association

| question | what the site says meanwhile |
|---|---|
| **Is the association registered?** The app's `CLAUDE.md` says "a registered association"; the founding notes plan the founding meeting for December 2026 | "being founded", on the association's page and in the legal drafts |
| **Business ID and address**, for the privacy policy and the terms | "added when the association is registered" |
| **A contact address.** `kuutti.app` has a null MX record: the domain receives no mail. A privacy policy needs an address that answers | nothing on the site names an address; `contactEmail` is `null` in `src/site.ts` |
| **A privacy contact**, by name or by role | "has not named a data protection officer" |
| **Social channels**: LinkedIn, TikTok, YouTube, Instagram | none shown; `social` is empty in `src/site.ts` |
| **The team**: who wants to be named, and with which title | "listed here once they have chosen"; nobody is named |
| **Those who help**: whether Telia, Väestöliitto or anybody else has agreed to be named | "nobody is listed yet" |
| **The story of the name and of the logo**, and the questions about marketing | the name's meaning only: a seal pup, and the logo its tail. To be confirmed, and told properly |
| **When the app opens** | "there is no date yet" |

## About the texts

| question | what the site says meanwhile |
|---|---|
| **The bylaws are a draft** in the document they were taken from ("Luonnos") | shown as a draft, in Finnish, at `/legal/bylaws/`, dated 29/09/2026, the day the document was last changed. The three authors' names are left out, as asked |
| **The Finnish texts of the terms and of the privacy policy**, written by people | English drafts only, marked as drafts and as not binding |
| **A lawyer's reading** of both, the grounds of section 5 of the privacy policy in particular | drafts |
| **Finnish and Swedish of the pages** were written by a machine | out of the site for now (decision 8); `docs/translation-review.md` |
| **The licence of the texts.** The code is AGPL-3.0; whether the texts are too, or under a licence for texts, or not licensed at all | the README names the code's licence only |

## What the privacy policy found in the app

Drafting it meant reading what the app keeps. These are for the app's repository, not for the site; the draft describes what the code does today.

1. **Which bank was used is kept.** The identification's `amr` names the bank, is stored on the identity row and stays after an account is deleted. The app's own privacy summary (`legal.privacy.summary`) lists what is kept and does not mention the record of the identification.
2. **More of the identification is kept than `docs/vendors/telia.md` says**: also Telia's reference to the session and to the token.
3. **A session keeps the beginning of the user agent.** The app's summary does not mention devices.
4. **The export leaves out some of what is held**: the record of the identification, the standing and the count of refused sign-ins, the day from which a new account is possible, the user agent of a session, and the cards that were shown. The right of access covers them.
5. **Retention that is not decided or not carried out**: the consents (ADR-010 leaves the period open); the record of photos fetched (no period, no sweep); the log of staff actions (five years in the documents, no deletion in the code).
6. **Amazon's use of content to improve its services** is not refused yet (ADR-006: it waits for the association's own AWS organisation). The draft says it is refused before the app opens.
7. **Photos are delivered through a network with nodes outside the EU** (CloudFront, price class 100, no geographic restriction).
8. **What Telia keeps, and where**, is an open question to Telia. **What the app's update check tells Expo, and where**, is not in the repository.
9. **An error's message can quote what was typed**, and goes to the error service as it is.
10. **No procedure for a personal data breach** was found (72 hours to the ombudsman), and **no way to appeal a ban**. The terms say the second is added before the app opens.
11. A **data protection impact assessment** before the first real person, as the founding notes plan.

## About the site itself

| question | what is done meanwhile |
|---|---|
| **The repository's name**, and when it is published | published 28/09/2026 as `kuutti-fi/kuutti-app-site`, public like the app's, on the maintainer's word after he had looked at the site |
| **The move of Amplify Hosting** to the new repository | done 28/09/2026: a new app, `kuutti-app-site`, created in the console and connected to this repository, `kuutti.app` moved to it, the old app deleted; `amplify.yml` and `customHttp.yml` work as written. The setup is in the app repository's `infra/README.md`, "The website" |
| **Removing `site/`** from the app's repository, with its `amplify.yml` and the mentions in `CLAUDE.md` and ADR-001 | kuutti-fi/kuutti-app#109 |
| **The waitlist's numbers on the home page.** The API has a public `GET /waitlist` and allows the site's origin | not shown: it needs a script in the browser, and the site has none |
| **The wording about collecting money** on "Support us" ("a notification to the police or a permit") | written from the founding notes; to be confirmed by somebody who knows the law on money collections |
| **The store links** | "Coming soon...", kept from the placeholder, where the links will be; `stores` is `null` in `src/site.ts` |
