# React + D3

> Node graph visualization based on the great [Mike Bostock's block](https://bl.ocks.org/mbostock/4339083)

<https://react-d3-lac.vercel.app>

This is an experimental project try to "marry" two of
the most popular front end frameworks (_alright, React is not a framework_ 😑)

`framer-motion` proved to be great for managing the animation part

## Tools

* React: 17
* D3: 6 (_Actually using the latest versions of d3-hierarchy & d3-shape_)
* framer-motion: 4.1
* vercel

## Outstanding bug 🪳

The exit transition is heading towards the parent's current position and not the
source's new position
(_source is the Node that's being clicked and triggers
the collapse event_).
