import Head from "next/head";
import { Inter } from "next/font/google";
import { Container, Divider, Tab } from "semantic-ui-react";
import Books from "../components/books";
import "semantic-ui-css/semantic.min.css";
import Characters from "../components/characters";
import Movies from "../components/movies";

const inter = Inter({ subsets: ["latin"] });

const panes = [
  {
    menuItem: "Books",
    render: () => (
      <Tab.Pane>
        <Books />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Movies",
    render: () => (
      <Tab.Pane>
        <Movies />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Characters",
    render: () => (
      <Tab.Pane>
        <Characters />
      </Tab.Pane>
    ),
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Lord of the Rings SDK Playground by Jason Baddley</title>
        <meta
          name="description"
          content="Take home project to prove that LibLab needs to hire Jason Baddley immediately"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className="main">
        <h5>Jason Baddley Presents</h5>
        <h1>The Lord of the Rings SDK Playground</h1>
        <Container>
          Go to the documentation:{" "}
          <a target="blank" href="https://www.npmjs.com/package/baddley-lotr-sdk">
            NPM Package
          </a>
        </Container>
        <Divider />
        <Tab panes={panes} />
      </Container>
    </>
  );
}
