import axios from "axios";
import { createContext, useCallback, useState } from "react";

const BooksContext =  createContext();

function Provider({ children  }) {

    const [books, setBook] = useState([]);

    const fetchBooks = useCallback(async () => {
        const response = await axios.get('http://localhost:3001/books');
        setBook(response.data);
    }, []);

    const deleteBookById = async (id) => {
        await  axios.delete(`http://localhost:3001/books/${id}`);
        let newBooks = books.filter((book) => book.id !== id);
        setBook(newBooks);
    };

    const createBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books', { title });
        const updatedBooks = [
            ...books,
            response.data
        ];
        setBook(updatedBooks);
    };


    const editBookById = async (id, newTitle) => {
        const response = await axios.put(`http://localhost:3001/books/${id}`, { title : newTitle});
        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return { ...book, ...response.data };
            }
            return book;
        });
        setBook(updatedBooks);
    };

    return (
    <BooksContext.Provider value={{ books, fetchBooks, deleteBookById, createBook, editBookById }}>
        {children}
    </BooksContext.Provider>
    );
}

export { Provider };
export default  BooksContext;