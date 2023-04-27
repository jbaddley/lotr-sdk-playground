import { Movie, Quote } from "baddley-lotr-sdk";
import { useEffect, useMemo, useState } from "react";
import { Button, Container, Dimmer, Divider, List, Loader, Message, Segment, Tab } from "semantic-ui-react";
import { useSDKContext } from "../../contexts/sdk";
import classnames from "classnames";
import { Quotes } from "../quotes";
import { startCase } from "lodash";
import { useQuery } from "react-query";

export default function Movies({ authorized }: { authorized: boolean }) {
  const sdk = useSDKContext();
  const [movieId, setMovieId] = useState<string>();

  const {
    data: movies,
    error: moviesError,
    refetch: refetchMoviesError,
    isLoading: isLoadingMovies,
  } = useQuery(["movies", authorized], () => {
    if (authorized) {
      return sdk.getMovies();
    }
  });

  const {
    data: quotes = [],
    error: quotesError,
    refetch: refetchQuotesError,
    isLoading: isLoadingMovieQuotes,
  } = useQuery(["quotes", movieId, authorized], () => {
    if (authorized && movieId) {
      return sdk.getMovieQuotes(movieId);
    }
  });

  const selectedMovie = useMemo(() => {
    return movies?.find(({ _id }) => _id === movieId);
  }, [movieId, movies]);

  const selectMovie = (movieId: string) => {
    return () => {
      setMovieId(movieId);
    };
  };

  return (
    <Container>
      {moviesError && (
        <Message warning onDismiss={() => refetchMoviesError()}>
          <Message.Header>Books API Error</Message.Header>
          <Message.Content>{String(moviesError)}</Message.Content>
        </Message>
      )}
      {quotesError && (
        <Message warning onDismiss={() => refetchQuotesError()}>
          <Message.Header>Books API Error</Message.Header>
          <Message.Content>{String(quotesError)}</Message.Content>
        </Message>
      )}
      <Segment.Group horizontal className="panel-container">
        <Segment>
          <Dimmer active={isLoadingMovies} inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Container>
            <h2>Movies</h2>
            {authorized ? (
              <List>
                {movies?.map((movies) => (
                  <List.Item key={movies._id}>
                    <Button
                      onClick={selectMovie(movies._id)}
                      primary={movies._id === movieId}
                      className={classnames("list-item-button", { selected: movies._id === movieId })}
                    >
                      {movies.name}
                    </Button>
                  </List.Item>
                ))}
              </List>
            ) : (
              <h3>Requires an api token.</h3>
            )}
          </Container>
        </Segment>
        <Segment>
          <Dimmer active={isLoadingMovieQuotes} inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Container>
            {selectedMovie ? (
              <>
                <h2>{selectedMovie.name}</h2>
                <h3>Information</h3>
                {Object.entries(selectedMovie).map(([key, value]) => (
                  <dl key={key}>
                    <dt>{startCase(key)}</dt>
                    <dd>{value}</dd>
                  </dl>
                ))}
                <Divider />
                <h3>Quotes</h3>
                <Quotes quotes={quotes} emptyText={`No quotes for ${selectedMovie.name}`} />
              </>
            ) : (
              <h2>Select a Movie</h2>
            )}
          </Container>
        </Segment>
      </Segment.Group>
    </Container>
  );
}
