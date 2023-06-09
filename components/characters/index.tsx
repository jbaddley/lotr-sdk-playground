import { Character, Quote } from "baddley-lotr-sdk";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Container,
  Dimmer,
  Divider,
  List,
  Loader,
  Message,
  Pagination,
  Search,
  Segment,
  Tab,
} from "semantic-ui-react";
import { useSDKContext } from "../../contexts/sdk";
import classnames from "classnames";
import { Quotes } from "../quotes";
import { startCase } from "lodash";
import { useQuery } from "react-query";

export default function Characters({ authorized }: { authorized: boolean }) {
  const sdk = useSDKContext();
  const [characterId, setCharacterId] = useState<string>();
  const [search, setSearch] = useState<string>();
  const [pageNum, setPageNum] = useState<number>(1);

  const {
    data: { docs: characters, pages } = {},
    error: charactersError,
    refetch: refetchCharactersError,
    isLoading: isLoadingCharacters,
  } = useQuery(["characters", search, pageNum, authorized], async () => {
    if (authorized) {
      if (search) {
        const docs = await sdk.getCharacters(search);
        return {
          docs,
          pages: 0,
        };
      }
      return sdk.getCharactersByPage(pageNum);
    }
  });

  const {
    data: quotes = [],
    error: quotesError,
    isLoading: isLoadingQuotes,
    refetch: refetchQuotesError,
  } = useQuery(["quotes", characterId, authorized], () => {
    if (authorized && characterId) {
      return sdk.getQuotesByCharacter(characterId);
    }
  });

  const selectedCharacter = useMemo(() => {
    return characters?.find(({ _id }) => _id === characterId);
  }, [characters, characterId]);

  const selectCharacter = (characterId: string) => {
    return () => {
      setCharacterId(characterId);
    };
  };

  return (
    <Container>
      {charactersError && (
        <Message warning onDismiss={() => refetchCharactersError()}>
          <Message.Header>Books API Error</Message.Header>
          <Message.Content>{String(charactersError)}</Message.Content>
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
          <Dimmer active={isLoadingCharacters} inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Container>
            <h2>Characters</h2>
            <Search placeholder="search" value={search} onSearchChange={(e, data) => setSearch(data.value)} />
            {authorized ? (
              <Container style={{ marginTop: 24 }}>
                {pages > 0 && (
                  <Pagination
                    boundaryRange={0}
                    activePage={pageNum}
                    defaultActivePage={1}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    siblingRange={3}
                    totalPages={pages}
                    onPageChange={(p, data) => setPageNum(+data.activePage)}
                  />
                )}
                <List>
                  {characters?.map((character) => (
                    <List.Item key={character._id}>
                      <Button
                        onClick={selectCharacter(character._id)}
                        primary={character._id === characterId}
                        className={classnames("list-item-button", {
                          selected: character._id === characterId,
                        })}
                      >
                        {character.name}
                      </Button>
                    </List.Item>
                  ))}
                </List>
              </Container>
            ) : (
              <h3>Requires an api token.</h3>
            )}
          </Container>
        </Segment>
        <Segment>
          <Dimmer active={isLoadingQuotes} inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Container>
            {selectedCharacter ? (
              <>
                <h2>{selectedCharacter.name}</h2>
                <h3>Information</h3>
                {Object.entries(selectedCharacter).map(([key, value]) => (
                  <dl key={key}>
                    <dt>{startCase(key)}</dt>
                    <dd>{value}</dd>
                  </dl>
                ))}
                <Divider />
                <h3>Quotes</h3>
                <Quotes quotes={quotes} emptyText={`No quotes for ${selectedCharacter.name}`} />
              </>
            ) : (
              <h2>Select a Character</h2>
            )}
          </Container>
        </Segment>
      </Segment.Group>
    </Container>
  );
}
