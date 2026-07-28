# Attention Protocol project plan

Last updated: 2026-07-28

## Product intent

Create a fandom-first experience that lets a visitor see an ordinary video
through Murderbot's divided attention.

The desired response is:

- "Oh, neat."
- "You can do that right now?"
- "Of course Murderbot is monitoring the humans while watching media."

This should feel like a semantic media-pipeline demonstration, not a generic
surveillance product.

## Product principles

1. **Fanwork specificity**
   Use recognizable situations and concerns from the novels: client safety,
   SecUnit references, governor modules, help, feed integrity, and whether the
   SecUnit is watching media.

2. **Clocked thoughts**
   Thoughts land on a predictable system tick. Asynchronous inputs enqueue
   events; they do not directly rewrite the interface.

3. **Competent protection**
   Murderbot's irritation never makes it worse at protecting humans.
   Safety-critical action is immediate even if the displayed reaction waits
   for the next tick.

4. **Dense divided attention**
   The main video must not monopolize the visitor's screen. Multiple useful,
   distracting processes should remain active without requiring interaction.

5. **Small, inspectable technology**
   Prefer timed transcripts, keyword matching, queues, and modest local models
   before introducing opaque or expensive services.

6. **Constrained inputs**
   Prefer curated pickers and defined monitoring flows over unstructured user
   prompts. This keeps the experience legible and simplifies the security
   story.

7. **Honest demonstrations**
   Clearly distinguish synchronized transcript cues, actual local
   transcription, and simulated telemetry.

## Current state

### Complete

- [x] Dense responsive attention-field interface
- [x] Autonomous 1.4-second monitoring clock
- [x] Four selectable attention allocations
- [x] Internal thought stream
- [x] Apollo 11 video with optional mission audio
- [x] Simultaneous public-domain Méliès media buffer
- [x] Dynamic transcript, telemetry, biometrics, code, and text panels
- [x] Private OpenAI Sites preview
- [x] Public GitHub repository
- [x] AWS Amplify deployment follow-up note

### Current architectural limitation

The panels derive their content directly from the same `tick`. This is simple
and effective for a prototype, but it synchronizes processes that should
eventually have independent inputs. The transcript and thought stream are
curated rotations rather than reactions to media content.

## Milestone 1: one reactive Apollo event

### Goal

Prove the complete event path with one real, understandable trigger while
preserving the clocked thought loop.

### Experience

```text
Apollo playback reaches "program alarm"
                    |
                    v
       transcript cue becomes active
                    |
                    v
       PROGRAM_ALARM event is queued
                    |
                    v
         next system tick consumes it
                    |
                    v
      a specific reaction enters history
```

When no event is queued, the next tick emits a routine monitoring thought such
as checking whether the clients are still alive.

### Implementation slices

- [ ] Walk through the current transcript consumer before editing it
- [ ] Add a small typed event model
- [ ] Add a prioritized, deduplicating in-memory queue
- [ ] Add a timed Apollo transcript cue sheet
- [ ] Read the Apollo video's current playback time
- [ ] Convert the `program alarm` cue into a `PROGRAM_ALARM` event
- [ ] Make the thought stream a visible history rather than a calculated window
- [ ] Consume at most one ordinary event per tick
- [ ] Use a monitoring thought when the queue is empty
- [ ] Reset cue and queue state correctly when video loops or seeks
- [ ] Label the timed transcript implementation honestly in the explainer

### Completion criteria

- Both videos continue playing.
- Apollo audio remains opt-in.
- The same cue produces the same event and reaction.
- The reaction appears on a tick, not at an arbitrary render time.
- A cue is not emitted repeatedly while it remains active.
- Routine monitoring continues when nothing noteworthy occurs.
- Pause and resume preserve understandable queue behavior.
- The production build passes.

## Milestone 2: reactive vocabulary

Expand from one cue to a small, curated rule set:

- `program alarm`
- `fuel`
- `contact light`
- `help`
- `SecUnit`
- `governor module`
- `watching media`

Each rule should define:

- a normalized keyword or phrase;
- an event type;
- priority and deduplication behavior;
- one or more appropriate reactions;
- which attention flows surface it.

Avoid adding free-form user-authored rules in this phase.

## Milestone 3: user-selected input

Add a constrained video picker and connect the same event pipeline to new
media.

Research and decide:

- local browser transcription versus a small owned backend;
- supported video and audio formats;
- model download size and device requirements;
- whether processing is fully local;
- progress, cancellation, and failure behavior;
- sample public-domain nonfiction clips.

The first implementation may use simple transcription matching. A large
semantic model is not required to prove the experience.

## Milestone 4: distinct attention flows

Make each picker option materially change what is foregrounded:

- client protection;
- module and governor-module monitoring;
- feed integrity;
- media protection.

Flows may share detected events, but should differ in priority, reaction
vocabulary, and visual emphasis.

## Milestone 5: owner-controlled public deployment

When the core interaction is stable:

- connect the public GitHub repository to AWS Amplify;
- configure build and production branch;
- add a custom domain and HTTPS if desired;
- verify media delivery and bundle size;
- retire the private OpenAI Sites preview only after the public deployment
  works.

See [AWS Amplify deployment follow-up](aws-amplify-followup.md).

## Working agreement

Before substantial changes, do a short code walkthrough of the affected path.
This gives the project owner enough context to ask targeted questions and offer
specific feedback without requiring framework expertise.

Keep walkthroughs and implementation steps bite-sized.
