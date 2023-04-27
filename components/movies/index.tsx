import { Movie, Quote } from "baddley-lotr-sdk";
import { useEffect, useMemo, useState } from "react";
import { Button, Container, Divider, List, Segment, Tab } from "semantic-ui-react";
import { useSDKContext } from "../../contexts/sdk";
import classnames from "classnames";
import { Quotes } from "../quotes";
import { startCase } from "lodash";

export default function Movies() {
  const sdk = useSDKContext();
  const [moviesId, setMovieId] = useState<string>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    sdk.getMovies().then((moviess) => setMovies(moviess));
  }, [sdk]);

  useEffect(() => {
    if (!!moviesId) {
      sdk.getMovieQuotes(moviesId).then((quotes) => setQuotes(quotes));
    }
  }, [sdk, moviesId]);

  const selectedMovie = useMemo(() => {
    return movies?.find(({ _id }) => _id === moviesId);
  }, [movies, moviesId]);

  const selectMovie = (moviesId: string) => {
    return () => {
      setMovieId(moviesId);
    };
  };

  return (
    <Segment.Group horizontal className="panel-container">
      <Segment>
        <h2>Movies</h2>
        <List>
          {movies.map((movies) => (
            <List.Item key={movies._id}>
              <Button
                onClick={selectMovie(movies._id)}
                primary={movies._id === moviesId}
                className={classnames("list-item-button", { selected: movies._id === moviesId })}
              >
                {movies.name}
              </Button>
            </List.Item>
          ))}
        </List>
      </Segment>
      <Segment>
        {selectedMovie ? (
          <Container>
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
          </Container>
        ) : (
          <h2>Select a Movie</h2>
        )}
      </Segment>
    </Segment.Group>
  );
}
