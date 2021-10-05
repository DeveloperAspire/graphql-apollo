import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ bookid }) => {
  const { data, loading, error } = useQuery(getBookQuery, {
    variables: { id: bookid },
  });

  let book;
  let outputText;

  if (!loading) {
    book = data.book;
  }

  if (book && !loading) {
    outputText = (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author</p>
        <ul className="other-books">
          {book.author.books.map((book) => (
            <li key={book.id}>{book.name}</li>
          ))}
        </ul>
      </div>
    );
  } else if (loading) {
    outputText = <p>Loading...</p>;
  } else {
    outputText = <p>No book selected</p>;
  }

  console.log(data);
  return <div id="book-details">{outputText}</div>;
};

export default BookDetails;
