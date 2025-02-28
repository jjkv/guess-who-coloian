import { useEffect, useState } from "react";
import "./Game.scss";
import PersonCard from "./PersonCard";
import Button from "./Button";
import { choosingPerson, initialPeopleData } from "./PeopleData";
import { POSSIBLE, ELIMINATED, generateRandomFromArray } from "./utils";

const Game = () => {
  const [isChoosingPerson, setIsChoosingPerson] = useState(false);
  const [chosenPerson, setChosenPerson] = useState(null);
  const [board, setBoard] = useState(initialPeopleData);

  // Runs once on initial page load to determine the letter options
  useEffect(() => {
    setChosenPerson(generateRandomFromArray(initialPeopleData));
  }, []);

  const toggleStatus = (personToToggle) =>
    setBoard(
      board.map((person) =>
        person.name === personToToggle.name
          ? {
              ...person,
              status: person.status === POSSIBLE ? ELIMINATED : POSSIBLE,
            }
          : { ...person }
      )
    );

  const getNumberOfRemainingPossibilities = () =>
    board.filter((person) => person.status === POSSIBLE).length;

  return (
    <div className="Game">
      <div className="Game-sidebar">
        <div className="Game-yourPerson">
          <h2>Your Person</h2>
          {isChoosingPerson ? (
            <div className="Game-yourPerson--isChoosing">
              Choose a person from the grid →
            </div>
          ) : (
            <PersonCard person={chosenPerson} />
          )}
        </div>
        <div className="Game-actions">
          <Button onClick={() => setIsChoosingPerson(true)}>
            Choose Person
          </Button>
          <Button
            onClick={() =>
              setChosenPerson(generateRandomFromArray(initialPeopleData))
            }
          >
            Choose Random Person
          </Button>
          <Button
            onClick={() => {
              setBoard(initialPeopleData);
              setIsChoosingPerson(true);
            }}
          >
            Clear Board
          </Button>
        </div>
        <p>
          Possibilities Remaining:
          <br />
          {`${getNumberOfRemainingPossibilities()} / ${board.length}`}
        </p>
      </div>
      <div className="Game-board">
        {board.map((person, index) => (
          <div className="Game-board-card" key={`${person}-${index}`}>
            <PersonCard
              person={person}
              onClick={() => {
                if (isChoosingPerson) {
                  setChosenPerson(person);
                  setIsChoosingPerson(false);
                } else {
                  toggleStatus(person);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
