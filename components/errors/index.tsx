import { Container, Message } from "semantic-ui-react";

interface Props {
  errors?: string[];
  onDismiss: (index: number) => void;
}

export function ErrorsPanel({ errors, onDismiss }: Props) {
  if (!errors) {
    return null;
  }
  return (
    <Container>
      {errors.map((error, i) => (
        <Message warning key={error} onDismiss={() => onDismiss(i)}>
          <Message.Header>API Error</Message.Header>
          <p>{error}</p>
        </Message>
      ))}
    </Container>
  );
}
