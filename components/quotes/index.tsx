import { Quote } from "baddley-lotr-sdk";
import { Container, List } from "semantic-ui-react";

export function Quotes({ quotes, emptyText }: { quotes: Quote[]; emptyText: string }) {
  if (!quotes.length) {
    return <Container className="diminished">{emptyText}</Container>;
  }
  return (
    <List>
      {quotes.map((quote) => (
        <List.Item className="quote" key={quote._id}>
          <Container className="dialog">{quote.dialog}</Container>
          <Container className="character-name">{quote.characterData?.name}</Container>
        </List.Item>
      ))}
    </List>
  );
}
