# Tonkotsu, lifted

Entry for make.fun's **Make the best-looking food picture** (`food-picture-01`).

The image: a bowl of tonkotsu ramen in a black speckled ceramic bowl, shot
from a slight overhead angle against a dark, warm-bokeh background. A tall
glossy tangle of noodles is lifted by chopsticks at the top right; one
halved jammy egg in the right foreground lets its deep orange yolk drip
down the white; a fan of charred chashu pork sits on the left; a red
chili-oil swirl crosses the creamy broth; a nori sheet stands at the back
left, with scallions, sesame and a wisp of steam. One clear idea, built to
the shape every top-ranked food picture in this contest shares — and kept
clean: a single egg, no extra toppings crowding the frame, so the dish
still reads delicious at 300 pixels.

## How it works

`main.ts` (Node 22, standard library only) copies the submitted image
`entry.png` — a JPEG this time, told apart from a PNG by its first bytes —
to `$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output`), checking first that
it is a real JPEG or PNG and that the copy landed whole. Running it twice
writes byte-identical output.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE`.
