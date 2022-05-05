import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

import React from "react";
import ReactDOM from "react-dom";

import axios from "axios";

import "./styles.css";

function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    "AIzaSyAyTVukl_eNVYqUrA3p74h8Q_XCqGrDS4U"
  );

  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          " &key" +
          apiKey +
          "&maxResults=40"
      )
      .then((data) => {
        console.log(data.data.items);
        setResult(data.data.items);
      });
  }

  return (
    <div class="container">
      <h1>Buscar livrinhos</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <input
            type="text"
            onChange={handleChange}
            className="input-control mt-10"
            placeholder="Pesquise seu livro"
            autoComplete="off"
          />
        </div>
        <button className="bnt btn-danger">Pesquisar</button>
      </form>

      {result.map((book) => (
        <img
          src={
            book.volumeInfo.imageLinks === undefined
              ? ""
              : `${book.volumeInfo.imageLinks.thumbnail}`
          }
        />
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
