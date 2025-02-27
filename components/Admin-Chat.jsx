'use client';
import { useEffect, useState, useRef } from "react";
import { getAllQuotesHistory, getUser, sendQuoteAction } from "@/actions/page";
import { useAppContext } from "@/custom-hooks/Context";
import ChatBox from "@/components/ChatBox";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AdminChat = () => {
    const [quotes, setQuotes] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const { userEmail } = useAppContext();
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    const fetchQuotes = async () => {
        const response = await getAllQuotesHistory();
        if (response.success) {
            const quotesWithUserDetails = await Promise.all(
                response.data.map(async (quote) => {
                    const userDetails = await getUser(quote.userEmail);
                    return {
                        ...quote,
                        userDetails: userDetails.success ? userDetails.data : null,
                    };
                })
            );
            setQuotes(quotesWithUserDetails);
        } else {
            console.log(response.message);
        }
    };

    useEffect(() => {
        fetchQuotes();
        const interval = setInterval(fetchQuotes, 10000);
        return () => clearInterval(interval);
    }, [userEmail]);

    const handleResponse = async (receiver, responseMessage, files = []) => {
        if (!responseMessage.trim() && files.length === 0) return;
        const response = await sendQuoteAction({
            userEmail: receiver,
            senderEmail: adminEmail,
            message: responseMessage,
            files
        });
        if (response.success) {
            fetchQuotes();
        } else {
            console.log("Failed to send response:", response.message);
        }
    };

    const selectedQuote = quotes.find((q) => q.userEmail === selectedUser);

    return (
        <div className="p-4 flex flex-col justify-between gap-20">
            <div className="grid grid-cols-2 gap-4">
                {quotes.map((quote, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedUser(quote.userEmail)}
                        className="p-4 border rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                        <div className="flex items-center justify-between w-44">
                            <AccountCircleIcon sx={{ fontSize: 30 }} />
                            <p className="text-center">
                                {quote.userDetails?.name || quote.userEmail}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedUser && (
                <ChatBox
                    userEmail={selectedUser}
                    userName={selectedQuote?.userDetails?.name || selectedUser}
                    messages={selectedQuote?.messages || []}
                    onSend={handleResponse}
                    onClose={() => setSelectedUser(null)}
                />
            )}

            {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            )}
        </div>
    );
};

export default AdminChat;
