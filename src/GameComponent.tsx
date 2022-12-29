import React from "react";
import { shuffle } from "./functions/shuffle";

import { GameComponentProps, entryTypes, btnBgTypes } from "./types";

export default function GameComponent(props: GameComponentProps) {
  const [capitals, setCapitals] = React.useState<string[]>([]);
  const [countries, setCountries] = React.useState<string[]>([]);
  const [shuffledMix, setShuffledMix] = React.useState<string[]>([]);

  const [firstEntry, setFirstEntry] = React.useState<string>("");
  const [secondEntry, setSecondEntry] = React.useState<string>("");
  const [entryBg, setEntryBg] = React.useState<btnBgTypes>("");
  const [firstEntryType, setFirstEntryType] =
    React.useState<entryTypes>(undefined);

  React.useEffect(() => {
    let countryCapitals = props.data;
    let countries = Object.keys(countryCapitals);
    let capitals = Object.values(countryCapitals);
    let shuffledEntries = shuffle(countries.concat(capitals));

    setCountries(countries);
    setCapitals(capitals);
    setShuffledMix(shuffledEntries);
  }, []);

  const placeEntry = (e: React.MouseEvent<HTMLButtonElement>) => {
    let entry = e.currentTarget.value;

    if (!firstEntry) {
      setFirstEntry(entry);
      if (countries.includes(entry)) {
        setFirstEntryType("country");
      } else {
        setFirstEntryType("capital");
      }
    }

    if (firstEntry && entry === firstEntry) {
      setFirstEntry("");
      setFirstEntryType(undefined);
    }

    if (firstEntry && !secondEntry) {
      if (entry === firstEntry) return;
      setSecondEntry(entry);
    }

    if (firstEntry && secondEntry) {
      let nextEntryType: entryTypes;
      if (countries.includes(entry)) {
        nextEntryType = "country";
      } else {
        nextEntryType = "capital";
      }
      resetEntries(entry, nextEntryType);
    }
  };

  React.useEffect(() => {
    getBackgroundColor();

    if (!getInvalidPairs() && firstEntry && secondEntry) {
      if (firstEntryType === "country") {
        const filteredCountries = countries.filter(
          (country) => country !== firstEntry
        );
        const filteredCapitals = capitals.filter(
          (capital) => capital !== secondEntry
        );

        setCountries(filteredCountries);
        setCapitals(filteredCapitals);
        setShuffledMix(shuffle(filteredCountries.concat(filteredCapitals)));
        resetEntries();
      } else {
        const filteredCountries = countries.filter(
          (country) => country !== secondEntry
        );
        const filteredCapitals = capitals.filter(
          (capital) => capital !== firstEntry
        );

        setCountries(filteredCountries);
        setCapitals(filteredCapitals);
        setShuffledMix(shuffle(filteredCountries.concat(filteredCapitals)));
        resetEntries();
      }
    }
  }, [secondEntry]);

  function getBackgroundColor() {
    setEntryBg("blue");

    if (getInvalidPairs()) {
      setEntryBg("red");
    }
  }

  function resetEntries(nextEntry?: string, nextEntryType?: entryTypes) {
    setEntryBg("");
    setFirstEntry("");
    setSecondEntry("");
    setFirstEntryType(undefined);

    if (nextEntry) {
      setFirstEntry(nextEntry);
      setFirstEntryType(nextEntryType);
    }
  }

  function getInvalidPairs(): boolean {
    if (firstEntry && secondEntry) {
      if (firstEntryType === "country") {
        let firstEntryIndex = countries.indexOf(firstEntry);

        if (secondEntry !== capitals[firstEntryIndex]) {
          return true;
        }
      } else {
        let firstEntryIndex = capitals.indexOf(firstEntry);

        if (secondEntry !== countries[firstEntryIndex]) {
          return true;
        }
      }
    }

    return false;
  }

  return (
    <div>
      {shuffledMix.length
        ? shuffledMix.map((entry, index) => (
            <button
              style={{
                background:
                  entry === firstEntry || entry === secondEntry ? entryBg : "",
                color:
                  entry === firstEntry || entry === secondEntry
                    ? "#ffffff"
                    : "#000000",
                outline: "none",
                border: "none",
                borderRadius: "3px",
                padding: "1em",
                margin: ".5em",
                cursor: "pointer",
              }}
              key={index}
              value={entry}
              onClick={placeEntry}
            >
              {entry}
            </button>
          ))
        : "Congratulations"}
    </div>
  );
}
