import { Character, Quote } from "baddley-lotr-sdk";
import { useEffect, useMemo, useState } from "react";
import { Button, Container, Divider, List, Search, Segment, Tab } from "semantic-ui-react";
import { useSDKContext } from "../../contexts/sdk";
import classnames from "classnames";
import { Quotes } from "../quotes";
import { startCase } from "lodash";

export default function Characters() {
  const sdk = useSDKContext();
  const [characterId, setCharacterId] = useState<string>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    sdk.getCharacters(search).then((characters) => setCharacters(characters));
  }, [sdk, search]);

  useEffect(() => {
    if (!!characterId) {
      sdk.getQuotesByCharacter(characterId).then((quotes) => setQuotes(quotes));
    }
  }, [sdk, characterId]);

  const selectedCharacter = useMemo(() => {
    return characters?.find(({ _id }) => _id === characterId);
  }, [characters, characterId]);

  const selectCharacter = (characterId: string) => {
    return () => {
      setCharacterId(characterId);
    };
  };

  return (
    <Segment.Group horizontal className="panel-container">
      <Segment>
        <h2>Characters</h2>
        <Search placeholder="search" value={search} onSearchChange={(e, data) => setSearch(data.value)} />
        <List>
          {characters.map((character) => (
            <List.Item key={character._id}>
              <Button
                onClick={selectCharacter(character._id)}
                primary={character._id === characterId}
                className={classnames("list-item-button", { selected: character._id === characterId })}
              >
                {character.name}
              </Button>
            </List.Item>
          ))}
        </List>
      </Segment>
      <Segment>
        {selectedCharacter ? (
          <Container>
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
          </Container>
        ) : (
          <h2>Select a Character</h2>
        )}
      </Segment>
    </Segment.Group>
  );
}
