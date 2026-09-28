---
title: App
description: What Kuutti is and is not - free, without ads, every account a real person, and built in the open.
nav: 1
---

Kuutti is an app made in Finland 🇫🇮 for Finland 🇫🇮. It is made by an association, not a company, and it is built so that it works best when you stop needing it.

## What it is

**Free.** There is no subscription, nothing to buy inside the app, and no paid way to be seen more than somebody else.

**Without ads.** Kuutti shows no advertising and carries no advertiser's code. The association's bylaws forbid selling ad space.

**One real person behind every account.** You sign in with a Finnish bank's identification, the same strong identification you use for public services. One person has one account, and it is for adults. A ban holds, because it is the person who is banned and not an email address.

**Not a feed.** There is nothing to scroll without end. Kuutti gives no scores to people, keeps no streaks and sends no notifications whose purpose is to bring you back.

**Open source.** Everything Kuutti runs on is published under the GNU Affero General Public License. Anybody can read how it works, and whoever changes it has to publish the changes too.

**Yours to leave.** You can download everything Kuutti holds about you, and you can delete your account in the app. [How deletion works](/delete-account/).

## What it keeps about you, in short

Kuutti never stores your personal identity code, your name, your legal sex or your date of birth. It keeps the year and month of your birth, a code computed from your identity code that cannot be turned back into it, a record of your identification (which bank, and when), what you tell about yourself, and your photos, from which the location and the camera's data are removed before they are saved.

The whole of it is in the [privacy policy](/legal/privacy/), which is a draft until the app opens.

## Research

Loneliness and relationships are studied too little with data that people gave knowingly. If you say yes, and only then, events about how you use Kuutti are kept under a separate identifier for researchers. They never contain what you wrote to anybody, and you can withdraw at any time.

## How it is built

Kuutti is built by volunteers, in the open, in one public repository.

- The app runs on iPhone and Android and is written in TypeScript with React Native and Expo.
- The server is written in TypeScript as well, and keeps its data in PostgreSQL.
- The servers, the database and the photos are in the European Union, in Frankfurt.
- Identification goes through the Finnish Trust Network, by way of Telia's identification service.
- The app speaks Finnish, Swedish and English, follows the text size and contrast you have chosen on your phone, and every decision in it is a button, not a swipe.

The source, the decisions and the open questions are at [github.com/kuutti-fi/kuutti-app](https://github.com/kuutti-fi/kuutti-app).
