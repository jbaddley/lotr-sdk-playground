import Head from "next/head";
import { Container, Divider, Form, Input, Label, Tab } from "semantic-ui-react";
import Books from "../components/books";
import "semantic-ui-css/semantic.min.css";
import Characters from "../components/characters";
import Movies from "../components/movies";
import { useSDKContext } from "../contexts/sdk";
import { useEffect, useMemo, useState } from "react";
import { isEqual } from "lodash";

export default function Home() {
  const sdk = useSDKContext();
  const [apiKey, setApiKey] = useState<string | undefined>();

  const handleUpdateApiKey = (e) => {
    if (!e.target.value) {
      globalThis.localStorage.removeItem("apiKey");
      setApiKey(undefined);
    }
    globalThis.localStorage.setItem("apiKey", e.target.value);
    setApiKey(e.target.value);
  };

  const panes = useMemo(() => {
    return [
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
            <Movies authorized={!!apiKey} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Characters",
        render: () => (
          <Tab.Pane>
            <Characters authorized={!!apiKey} />
          </Tab.Pane>
        ),
      },
    ];
  }, [apiKey]);

  useEffect(() => {
    const apiKey = globalThis.localStorage.getItem("apiKey");
    if (apiKey) {
      setApiKey(apiKey);
    }
  }, []);

  useEffect(() => {
    sdk.setApiKey(apiKey);
  }, [apiKey, sdk]);

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
        <h1>
          The Lord of the Rings SDK Playground for{" "}
          <a href="https://the-one-api.dev/" target="_blank">
            The One API
          </a>
        </h1>
        <Container>
          Go to the documentation:{" "}
          <a target="blank" href="https://www.npmjs.com/package/baddley-lotr-sdk">
            NPM Package
          </a>
        </Container>
        <Form.Field inline style={{ margin: "16px 0" }}>
          <Label pointing="right">For full features, enter an api token</Label>
          <Input value={apiKey} onChange={handleUpdateApiKey} style={{ width: 240, marginRight: "16px" }} />
          Get an api token{" "}
          <a href="https://the-one-api.dev/sign-up" target="_blank">
            here.
          </a>
        </Form.Field>
        <Divider />
        <Tab panes={panes} />
      </Container>
    </>
  );
}
