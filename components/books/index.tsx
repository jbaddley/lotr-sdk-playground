import { useEffect, useMemo, useState } from "react";
import { Button, Container, Dimmer, List, Loader, Message, Segment, Tab } from "semantic-ui-react";
import { useSDKContext } from "../../contexts/sdk";
import classnames from "classnames";
import { useQuery } from "react-query";

export default function Books() {
  const sdk = useSDKContext();
  const [bookId, setBookId] = useState<string>();

  const {
    data: books,
    error: booksError,
    refetch: refetchBooksError,
    isLoading: isLoadingBooks,
  } = useQuery(["books"], () => sdk.getBooks());
  const {
    data: chapters,
    error: chaptersError,
    refetch: refetchChaptersError,
    isLoading: isLoadingChapters,
  } = useQuery(["chapters", bookId], () => {
    if (!bookId) {
      return [];
    }
    return sdk.getChaptersByBook(bookId);
  });

  const selectedBook = useMemo(() => {
    return books?.find(({ _id }) => _id === bookId);
  }, [books, bookId]);

  const selectBook = (bookId: string) => {
    return () => {
      setBookId(bookId);
    };
  };

  return (
    <Container>
      {booksError && (
        <Message warning onDismiss={() => refetchBooksError()}>
          <Message.Header>Books API Error</Message.Header>
          <Message.Content>{String(booksError)}</Message.Content>
        </Message>
      )}
      {chaptersError && (
        <Message warning onDismiss={() => refetchChaptersError()}>
          <Message.Header>Books API Error</Message.Header>
          <Message.Content>{String(chaptersError)}</Message.Content>
        </Message>
      )}
      <Segment.Group horizontal className="panel-container">
        <Segment>
          <Dimmer active={isLoadingBooks} inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Container>
            <h2>Books</h2>
            <List>
              {books?.map((book) => (
                <List.Item key={book._id}>
                  <Button
                    onClick={selectBook(book._id)}
                    primary={book._id === bookId}
                    className={classnames("list-item-button", { selected: book._id === bookId })}
                  >
                    {book.name}
                  </Button>
                </List.Item>
              ))}
            </List>
          </Container>
        </Segment>
        <Segment>
          <Dimmer active={isLoadingChapters} inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Container>
            <h2>{selectedBook?.name ? `Chapters for ${selectedBook?.name}` : "Select a book"}</h2>
            <List>
              {chapters?.map((chapter, i) => (
                <List.Item key={chapter._id}>
                  {i + 1}: {chapter.chapterName}
                </List.Item>
              ))}
            </List>
          </Container>
        </Segment>
      </Segment.Group>
    </Container>
  );
}
