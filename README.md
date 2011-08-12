# The Parable of The Hackasaurus

By Atul Varma

Artwork by Jessica Klein

## Vision

I wanted to create a somewhat game-like learning experience that wasn't quite
as verbose or explicitly instructional as the Hackasaurus [missions][], but
that rather led to learning through goal-focused tinkering. I also wanted to
have the experience be story-driven, even though in this case the hacking
doesn't have much directly to do with the story (but it's easy to imagine
variations where they're more aligned).

Additionally, there isn't actually an online experience that really teaches
people how to use the goggles. The missions only go so far as teaching people
how to activate the goggles by pasting a `javascript:` URL into their address
bar (and that doesn't even work on the latest versions of browsers due to the
evolution of the browser security landscape). So I wanted to make something
really simple that would lead to the same kinds of discoveries that kids have
at hack jams.

Finally, I wanted to make an actual example "game" that served as a
forcing function to make me think about what kinds of APIs the entrants to the
proposed "Hack This Game" challenge might want to use. In particular, I added
an API that lets an embedding page "hook into" the goggles when they're
activated on a page and alter the user interface a bit. In the case of
Parable, the CSS style overlay is tweaked to only show a small handful of CSS
properties, rather than every possible one (which is rather overwhelming).
This makes it possible to have a game that actually "unlocks" features of the
goggles as the player progresses through it and masters individual concepts
one by one, allowing for manageable learning curves.

## Implementation

The parable "embeds" the goggles. Changing the parable and remixing it to make
your own missions should be reasonably easy: just edit [index.html][] or
[bugs.js][].

Note that some scripts, including `bugs.js`, are actually injected
into the remix dialog using a mechanism similar to [GreaseMonkey][].
This makes their behavior a bit unusual, but I've tried commenting
their code to set developer expectations.

  [index.html]: https://github.com/toolness/hackasaurus-parable/blob/gh-pages/index.html
  [bugs.js]: https://github.com/toolness/hackasaurus-parable/blob/gh-pages/bugs.js
  [GreaseMonkey]: http://en.wikipedia.org/wiki/Greasemonkey

## Next Steps

I personally love the idea of a sort of "Aesop's Fables for the Web", where
each fable's "lesson" is about some aspect of the web that's hard to learn by
just using the goggles. In the case of this particular story, the lesson is
about the meaning of the word "hack". The actual gameplay reinforces this
because the player is hacking the page in a positive way&mdash;i.e., to make it work better.

Making this experiment also got me thinking about "support infrastructure" for
Web-based games. Steam is like the iTunes of gaming (except it doesn't suck)
and provides some really great social features that would be a pain for all
games to integrate on their own. One of my favorites is achievements. I've
never actually developed a Steam-compatible game, but I suspect that from a
game developer's standpoint, you program your game to just tell Steam "hey,
the player just unlocked the 'Left The House' achievement" and then steam does
the rest: puts a badge on your player profile, notifies your friends, and so
forth. Perhaps that's part of what the [open badges][] infrastructure will
provide, I'm not sure. But it'd be very cool if some kind of infrastructure
like that already existed for the proposed "Hack This Game" challenge.

  [missions]: https://secure.toolness.com/webxray/missions/one/
  [open badges]: https://wiki.mozilla.org/Badges
