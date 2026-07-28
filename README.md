# Attention Protocol

**See what it is like from Murderbot's point of view.**

Attention Protocol is an unofficial fan experiment inspired by Martha Wells's
*Murderbot Diaries*. It presents the Apollo 11 mission as a field of concurrent
inputs: client safety, mission telemetry, guidance code, transcripts, and the
far more important matter of keeping media buffered.

The project is also a small demonstration of programmable attention. Its
long-term goal is to accept a video, run a user-selected monitoring flow, and
turn detected events into a clocked stream of SecUnit-style observations.

## Current prototype

The current Apollo 11 experience includes:

- simultaneous Apollo and public-domain fiction video;
- optional mission audio;
- autonomous thought, transcript, telemetry, code, and text panels;
- four selectable attention allocations;
- a shared 1.4-second clock that advances the simulated monitoring processes;
- responsive layouts for desktop and mobile.

This version is deliberately deterministic. Its thoughts and transcript lines
currently rotate from curated lists; it does not yet analyze the audio.

Private preview:
[murderbot-attention-protocol.cewillismail.chatgpt.site](https://murderbot-attention-protocol.cewillismail.chatgpt.site/)

## Next milestone

The next vertical slice makes one part of the experience genuinely reactive:

1. synchronize a small Apollo transcript cue sheet to video playback;
2. match a cue such as `program alarm`;
3. place a typed event in an attention queue;
4. consume that event on the next system tick;
5. emit a specific reaction in the internal thought stream;
6. fall back to routine client monitoring when the queue is empty.

See [the project plan](docs/project-plan.md) for the design principles,
milestones, and completion criteria.

## How the prototype works

The interface is a React component written in TSX. A shared `tick` state
increments every 1.4 seconds. Panels derive their current item from that tick,
which gives the prototype a simple, inspectable monitoring loop.

The planned reactive architecture keeps that clock:

```text
timed transcript or local transcription
                 |
                 v
          keyword matcher
                 |
                 v
        prioritized event queue
                 |
                 v
             next tick
                 |
                 v
          visible thought history
```

Safety-critical actions should never wait for a joke or a display update.
Thoughts may land on the clock; protective behavior remains immediate.

## Run locally

Requirements: Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Build verification:

```bash
npm run build
```

## Sources

The prototype uses public-domain or openly available historical material from:

- [NASA Goddard Scientific Visualization Studio](https://svs.gsfc.nasa.gov/10451/)
- [Wikimedia Commons: *Le Voyage dans la Lune*](https://commons.wikimedia.org/wiki/File:Le_Voyage_Dans_La_Lune.ogv)
- Project Gutenberg
- Virtual AGC and the MIT Museum

The bundled Apollo video was converted to browser-compatible H.264. The
Méliès media buffer uses a short, locally bundled excerpt.

## Deployment

The working preview is currently hosted privately through OpenAI Sites. The
intended public deployment will eventually move to infrastructure owned by the
project owner. See [the AWS Amplify follow-up](docs/aws-amplify-followup.md).

## Fanwork notice

This is an unofficial, noncommercial fan project. *The Murderbot Diaries* and
its characters belong to Martha Wells and their respective rightsholders. No
novel text or television footage is bundled with this repository.
