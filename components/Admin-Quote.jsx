'use client';
import { useEffect, useState } from "react";
import { getAllQuote } from "@/actions/page";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QuoteBox from "./QuoteBox";

const AdminQuotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchQuotes = async () => {
        const response = await getAllQuote();
        if (response.success) {
            setQuotes(response.data);
        } else {
            console.log(response.message);
        }
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    const selectedQuote = quotes.find((q) => q.email === selectedUser);
    return (
        <div className="p-4 flex flex-col justify-between gap-20">
            <div className="grid grid-cols-2 gap-4">
                {quotes.map((quote, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedUser(quote.email)}
                        className="p-4 border rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                        <div className="flex items-center justify-between w-44">
                            <AccountCircleIcon sx={{ fontSize: 30 }} />
                            <p className="text-center">
                                {quote.name || quote.email}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedUser && (
                <QuoteBox
                    quote={selectedQuote}
                    onClose={() => setSelectedUser(null)}
                />
            )}

            {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            )}
        </div>
    );
};

export default AdminQuotes;
