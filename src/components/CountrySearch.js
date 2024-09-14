import React, { useState, useMemo } from "react";
import countriesData from "../data/countries.json";

const CountrySearch = () => {
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredCountries = useMemo(() => {
    if (!search) return [];
    return countriesData.filter(
      (country) =>
        country.country.toLowerCase().includes(search.toLowerCase()) ||
        country.capital.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <input
        type="text"
        placeholder="Search for a country or capital..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
      />

      {search && (
        <div
          style={{
            height: "200px",
            overflow: "auto",
            border: "1px solid #ccc",
          }}
        >
          {filteredCountries.map((country, index) => (
            <div
              key={index}
              onClick={() => setSelectedCountry(country)}
              style={{ padding: "0.5rem", cursor: "pointer" }}
            >
              <p style={{ fontWeight: "bold" }}>{country.country}</p>
              <p style={{ fontSize: "0.8rem", color: "#666" }}>
                Capital: {country.capital}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedCountry && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            border: "1px solid #ccc",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
            }}
          >
            {selectedCountry.country}
          </h2>
          <p>
            <strong>Capital:</strong> {selectedCountry.capital}
          </p>
          <p>
            <strong>Population:</strong>{" "}
            {selectedCountry.population.toLocaleString()}
          </p>
          <p>
            <strong>Language:</strong>{" "}
            {Array.isArray(selectedCountry.official_language)
              ? selectedCountry.official_language.join(", ")
              : selectedCountry.official_language}
          </p>
          <p>
            <strong>Currency:</strong> {selectedCountry.currency}
          </p>
        </div>
      )}
    </div>
  );
};

export default CountrySearch;
