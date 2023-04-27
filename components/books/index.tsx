import { Book, Chapter } from "baddley-lotr-sdk";
import { useEffect, useMemo, useState } from "react";
import { Button, List, Segment, Tab } from "semantic-ui-react";
import { useSDKContext } from "../../contexts/sdk";
import classnames from "classnames";

export default function Books() {
  const sdk = useSDKContext();
  const [bookId, setBookId] = useState<string>();
  const [books, setBooks] = useState<Book[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    sdk.getBooks().then((books) => setBooks(books));
  }, [sdk]);

  useEffect(() => {
    if (!!bookId) {
      sdk.getChaptersByBook(bookId).then((chapters) => setChapters(chapters));
    }
  }, [sdk, bookId]);

  const selectedBook = useMemo(() => {
    return books?.find(({ _id }) => _id === bookId);
  }, [books, bookId]);

  const selectBook = (bookId: string) => {
    return () => {
      setBookId(bookId);
    };
  };

  return (
    <Segment.Group horizontal className="panel-container">
      <Segment>
        <h2>Books</h2>
        <List>
          {books.map((book) => (
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
      </Segment>
      <Segment>
        <h2>{selectedBook?.name ? `Chapters for ${selectedBook?.name}` : "Select a book"}</h2>
        <List>
          {chapters.map((chapter, i) => (
            <List.Item key={chapter._id}>
              {i + 1}: {chapter.chapterName}
            </List.Item>
          ))}
        </List>
      </Segment>
    </Segment.Group>
  );
}
