import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const fetchTweet = async () => {
            try {
                const res = await axios.get('/api/tweets');
                setTweets(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTweet();
    }, []);

    return (
        <div>
            <h1>Home</h1>
            {tweets.map(tweet => (
                <div key={tweet.id}>
                    <p>{tweet.content}</p>
                    <small>By: {tweet.user.username}</small>
                </div>
            ))}
        </div>
    );
}

export default Home;
