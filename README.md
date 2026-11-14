# Tonkotsu, lifted

Entry for make.fun's **Make the best-looking food picture** (`food-picture-01`).

The image (v2): a bowl of tonkotsu ramen in a black ceramic bowl on a
warm wooden table, shot from a slight overhead angle in bright, warm
daylight. A tall glossy tangle of noodles is lifted by chopsticks at the
top right; one halved jammy egg in the centre lets its deep orange yolk
drip down the white; a fan of charred chashu pork sits on the left, with
menma, kikurage and scallions in a rich broth, a wisp of steam rising. One
clear idea, kept clean: a single egg, the whole bowl in frame with room
around it, so the dish still reads delicious at 300 pixels.

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
