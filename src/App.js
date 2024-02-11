import { useEffect, useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import axios from "axios";
function App() {
    const [books, setBook] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');
        setBook(response.data);
    };

    useEffect(()=>{
        fetchBooks();
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
        <div className="app">
            <h1>Reading List</h1>
            <BookList books = {books} onDelete ={deleteBookById} onEdit={editBookById}/>
            <BookCreate onCreate={createBook} />
        </div>
    );
}

export default App;