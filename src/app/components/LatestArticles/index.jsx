'use client';

import { useState } from 'react';




export default function LatestArticles() {
    const [email, setEmail] = useState('');

    const articles = [
        {
            title: 'Nutrition Tips for a Healthier Lifestyle',
            description: 'Explore expert nutrition advice to fuel your body right. Learn about balanced meals and healthy eating habits.',
        },
        {
            title: 'Delicious and Healthy Recipes',
            description: 'Try these nutritious and easy-to-make recipes that will make healthy eating enjoyable and satisfying.',
        },
        {
            title: 'Comprehensive Fitness Advice for Every Level',
            description: 'From beginners to pros, get fitness tips that will help you achieve your goals effectively and safely.',
        },
        {
            title: 'The Power of Consistency in Fitness',
            description: 'Fitness goals aren’t just about intensity; it’s about consistency. Regular efforts can yield impressive results over time.',
        },
    ];

    return (
        <div className="bg-dark text-white py-12 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-yellow-400">Latest Articles</h2>
                <p className="mt-2 text-gray-300">Discover our recent articles on nutrition tips, healthy recipes, and fitness advice. Subscribe to stay updated!</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-6xl mx-auto">
                {articles.map((article, index) => (
                    <div key={index} className="bg-gray-200 text-black p-6 rounded-lg border border-yellow-400">
                        <h3 className="text-lg font-bold">{article.title}</h3>
                        <p className="mt-2 text-gray-600">{article.description}</p>
                        <a href="#" className="text-yellow-600 font-semibold mt-2 inline-block">Read More</a>
                    </div>
                ))}
            </div>

            <div className="text-center mt-10">
                <h3 className="text-lg font-semibold">Subscribe to receive updates on the latest articles!</h3>
                <button className="mt-3 px-6 py-2 bg-yellow-500 text-black rounded-md font-semibold hover:bg-yellow-600">Subscribe Now</button>
            </div>

            <div className="bg-white text-black py-12 mt-12 text-center">
                <h2 className="text-2xl font-bold text-yellow-600">Stay Updated!</h2>
                <p className="mt-2 text-gray-700">Subscribe to our newsletter for exclusive tips, recipes, and offers tailored to help you reach your fitness goals.</p>
                <div className="mt-4 flex justify-center gap-2">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="px-6 py-2 bg-yellow-500 text-black rounded-md font-semibold hover:bg-yellow-600">Subscribe Now</button>
                </div>
            </div>

            
        </div>
    );
}
