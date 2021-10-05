import { useQuery } from "@apollo/client";
import { useState } from "react";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selected, setSelected] = useState(null);

  const updateSelected = (id) => {
    setSelected(id);
  };
  if (loading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => (
          <li key={book.id} onClick={updateSelected.bind(this, book.id)}>
            {book.name}
          </li>
        ))}
      </ul>
      <BookDetails bookid={selected} />
    </div>
  );
};

export default BookList;
