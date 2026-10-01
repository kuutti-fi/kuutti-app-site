---
title: Privacy policy
description: What Kuutti keeps about the people who use it, why, for how long, who else handles it, and what you can do about it.
order: 3
status: draft
dated: 2026-10-01
binding: false
---

This text describes the app as it is built today. The app is not open yet, and some of what is described here is not switched on yet. Before the app opens, this text is written in Finnish, read by a lawyer, and given a version; the Finnish text is then the one that counts.

## 1. Who is responsible

The controller of your personal data is **Kuutti ry** (business ID 3659478-7), a non-profit association in Espoo, Finland. The association was founded on 1 October 2026 and is waiting to be entered in the Register of Associations; its address is added here when it is registered.

An address for questions and for requests about your data is published here before the app opens. The association has not named a data protection officer.

## 2. In short

- You sign in with a Finnish bank's identification. Kuutti learns that you are one real adult and keeps a code that stands for you. It does not keep your personal identity code or your name.
- What you tell about yourself, and your photos, are kept so that they can be shown to other people who use Kuutti. Nothing is shown outside the app.
- Nothing is sold, nothing is used for advertising, and the app carries no tracking or analytics code.
- You can download everything and delete your account yourself, in the app, at any time.
- Research is a separate question with a separate yes, and you can take the yes back.

## 3. What Kuutti keeps about you

### When you identify yourself

Identification is done by your bank, through the identification service of Telia Finland Oyj. From what the service sends, Kuutti keeps:

- a code computed from your personal identity code with a secret key. The same person always gives the same code, and the code cannot be turned back into the identity code. It is what makes one person one account;
- the year and the month of your birth, to know that you are an adult and to show your age;
- the record of the identification: when it was done, at what level of assurance, with which bank, and the identification service's own references to it (its name for you, for the session and for the message it sent). These references mean nothing by themselves. They exist so that, if the police ask with a legal ground, the identification service can say whom a reference belongs to;
- whether the person is in good standing, suspended or banned; how many times the person has deleted an account and the day from which a new one is possible; and how many times a sign-in was refused.

With every new sign-in the record of the identification is replaced by the newest one.

### Your account and your profile

- your gender, as you state it yourself: woman, man or non-binary;
- whom you seek and the ages you seek;
- the area you chose, such as a city or a campus;
- the name you want to be called by, what you write about yourself, and your answers to the questions of the profile: languages, what you are looking for, the kind of relationship, children, smoking, alcohol, education, field, and campus;
- when the account was made and its state.

Your gender together with whom you seek tells something about your sexual orientation. That is data the law protects specially, and Kuutti asks for your explicit consent before it uses it.

### Your photos

A photo you upload is checked, turned over into a new file without the location, the camera's data or anything else the original carried, and kept in three sizes. The original is never kept.

With each photo Kuutti keeps its state (waiting, approved, waiting for a person, rejected), the reason if it was rejected, and the result of the automatic check described in section 6.

### Your devices

For each device you are signed in on: whether it is an iPhone, an Android phone or a browser; the beginning of the text by which the app names itself and the system to the server; when you signed in and when the session was last used. The keys of a session are kept only as codes computed from them.

Kuutti keeps **no IP address** in its database. The server uses the address of a request, in its memory only, to refuse a sender that asks too much too fast.

### What you did

- **Photos you were given.** Every time the app is handed the address of a photo, Kuutti records who asked, which photo, which size and when. It limits how many photos one person can fetch in a day, and it is what would show who took a photo if one turns up somewhere else.
- **Cards you were shown.** Which photos were on the cards you were served, and the last day of each.
- **Your consents.** Which text you agreed to (terms, privacy, research), which version of it, in which language it was shown to you, when, and when you withdrew it if you did.

### Research, if you said yes

If you consent to research, events about how you use Kuutti are recorded under a separate research identifier that is not your account's. An event holds: what happened, the hour in which it happened (not the minute), your area, your age as a band of years, your gender and the answers of your profile that come from fixed lists. It never holds anything you wrote yourself, your name, your photos or whom you seek.

### What the server writes down

For each request the server's log has a line with the account's number, the kind of request, the outcome and how long it took. The log never holds a personal identity code, the code computed from it, what somebody wrote, gender, or whom somebody seeks.

If the app or the server fails, a report of the error is sent to an error service. The server's report carries the account's number and nothing of the request; the app's report carries nothing that names you or your phone. An error's own message can quote what was typed into the field that failed.

## 4. What Kuutti never keeps

- your personal identity code
- your name, as the bank gives it
- your date of birth: only the year and the month
- your legal sex
- your email address or your phone number: the app never asks for them
- your location
- the original of a photo, and anything a photo file carried besides the picture

## 5. Why, and on what ground

| What for | Ground |
|---|---|
| To give you the service you asked for: your account, your profile, showing you to others and others to you | The contract between you and the association (the terms of use) |
| To use what reveals your sexual orientation in matching | Your explicit consent |
| To keep one person to one account and to make a ban hold, also after an account is deleted | The association's legitimate interest in a service whose users are real and safe from those who were removed |
| To keep the service safe: limits on photo fetches, the record of photo fetches, the check of photos, the logs and the error reports | The association's legitimate interest in the safety of the service and of the people in it |
| Research | Your consent, given separately, which you can withdraw at any time |
| To be able to answer a lawful request of an authority | A legal obligation |

Kuutti makes no decision about you by machine alone that has legal effects for you. A photo can be held back by the automatic check; it is rejected only by a person.

## 6. Who else handles your data

The association uses these others to run the service. They handle the data on the association's behalf and by its instructions, except where it is said otherwise.

| Who | What | Where |
|---|---|---|
| **Amazon Web Services** | The servers, the database, the photos and their delivery, the server's logs, the automatic check of photos | The European Union (Frankfurt). Photos are delivered through Amazon's delivery network, which has nodes outside the EU as well |
| **Telia Finland Oyj** | Identification with your bank. Telia and your bank act in their own name here, under the law on strong electronic identification | Not yet confirmed by Telia |
| **Sentry** (Functional Software, Inc.) | Reports of errors in the app and on the server | The European Union (Germany) |
| **Expo** (650 Industries, Inc.) | Updates of the app: at every start the app asks Expo's servers whether there is a newer version | Not stated by Expo in what the association has |
| **Apple and Google** | Delivering the app to your phone | By their own terms |

**The automatic check of photos.** One of the three sizes of a photo, without any data of the original file, is sent to Amazon's image recognition service in Frankfurt, which answers with labels of what it sees and with the number of faces. Kuutti keeps the answer with the photo; the labels are never shown to you or to anybody but moderators. The service answers and keeps nothing for the association. Amazon's terms allow it to use what is sent to such services to improve them unless its customer refuses; the association refuses before the app opens.

**Research partners.** Research events are used by researchers the association works with. No partner is named yet; one is named here, with what it receives, before any data goes to it.

**Nobody else.** The association does not sell data, does not hand it over for commercial purposes, and shows no advertising. Its bylaws forbid all three.

## 7. Data outside the EU and the EEA

Kuutti keeps your data in the European Union. These are the cases in which data can be handled outside it, as far as the association knows today:

- A photo is delivered to the phone that asks for it through a delivery network, from the node nearest to that phone. If somebody opens the app outside Europe, the photos they are allowed to see reach them through a node outside Europe.
- When the app asks for updates, Expo's servers see the phone's address on the network. The app sends nothing about your account there.
- Apple and Google learn that you installed the app.

Where a transfer needs a safeguard under the data protection regulation, the association relies on the standard contractual clauses of the European Commission or on a decision of the Commission that the receiving country protects data adequately.

## 8. How long

| What | How long |
|---|---|
| Your profile, photos, preferences and sessions | Until you delete them or your account |
| The record of photos you were given, and of cards you were shown | Until you delete your account |
| A session you signed out of | 30 days |
| A session you do not use | 90 days |
| Research events | At most 90 days |
| The server's log | 30 days |
| Backups of the database | 35 days |
| The log of what moderators did and saw | 5 years |
| Your consents | Kept after the account is deleted, as proof; the period is not decided yet |
| The code computed from your identity code, the record of your identification, and whether the person is banned | For as long as the service exists. It is what keeps one person to one account and a ban in force |

When you delete your account, what goes and what stays is described in [Deleting your account](/delete-account/).

If the association is dissolved, the personal data of the people who used the service is destroyed and is not passed on to anybody. That is in the association's bylaws.

## 9. What you can do

- **See and take with you what is kept about you.** In the app, under *Your account*, *Download my data* gives you a file with what Kuutti holds about you.
- **Correct it.** You can change your profile, your photos and your preferences in the app.
- **Delete it.** *Delete my account* deletes at once; see above for what stays.
- **Withdraw a consent.** You can take back your consent to research in the app at any time. It does not undo what was done before.
- **Object, or ask for the handling to be restricted**, where the ground is the association's legitimate interest.
- **Complain.** If you think your data is handled against the law, you can complain to the Office of the Data Protection Ombudsman, [tietosuoja.fi](https://tietosuoja.fi/en/home).

For anything the app does not do for you, write to the address in section 1. The association answers within a month. It has to be sure that a request comes from the person it concerns, so it can ask you to identify yourself.

## 10. Authorities

The association gives data to the police or to another authority only when the law obliges it to, and only what the request lawfully asks for. The association does not know your name. What it can give is the record of an identification, with which the identification service can name the person to the authority.

## 11. Age

Kuutti is for adults. A person under 18 cannot make an account: age is read from the identification, and the sign-in is refused.

## 12. This website

This website sets no cookies, runs no scripts and loads nothing from anybody else. It is served by Amazon Web Services, which sees the address on the network of whoever asks for a page, as every web server does.

## 13. Changes

Every wording of this text has a version and a date. When the text changes in a way that matters to you, the app shows you the new text and asks again.
