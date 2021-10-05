import { useQuery, useMutation } from "@apollo/client";
import { useRef } from "react";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

const AddBook = () => {
  const { data, loading, error } = useQuery(getAuthorsQuery);
  const [addBook, { data: bookData, loading: isLoading, error: bookError }] =
    useMutation(addBookMutation);
  let AUTHORS;

  const bookRef = useRef();
  const genreRef = useRef();
  const authorRef = useRef();

  if (loading) {
    AUTHORS = <option>Loading</option>;
  } else {
    AUTHORS = data.authors.map((author) => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  }

  const submitForm = (e) => {
    e.preventDefault();
    const enteredBook = bookRef.current.value;
    const enteredGenre = genreRef.current.value;
    const enteredAuthor = authorRef.current.value;
    console.log(enteredAuthor, enteredBook, enteredGenre);

    addBook({
      variables: {
        name: enteredBook,
        genre: enteredGenre,
        authorId: enteredAuthor,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" ref={bookRef} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" ref={genreRef} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select ref={authorRef}>
          <option>Select author</option>
          {AUTHORS}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
