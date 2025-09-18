import Book from "../model/book.model.js";

// ✅ renamed function from searchUsers → searchBooks
export const searchBooks = async (req, res) => {
    try {
        // ✅ changed query param from "name" → "q"
        const query = req.query.q; 
        if (!query) {
            return res.status(400).json({ error: 'Query parameter q is required' });
        }

        // ✅ changed variable "users" → "books"
        // ✅ search both title & author (instead of only title)
        const books = await Book.find({
            $or: [
                { title: new RegExp(query, 'i') },
                { author: new RegExp(query, 'i') }
            ]
        });

        // ✅ updated log
        console.log('Books found:', books);

        if (books.length > 0) {
            res.json(books);
        } else {
            // ✅ changed message from "No users found" → "No books found"
            res.status(404).json({ message: 'No books found' });
        }
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};
