"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile"; // Importing Profile correctly

const MyProfile = () => {
    const { data: session } = useSession();
    const Router = useRouter();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        };

        if (session?.user.id) fetchPosts();
    }, [session?.user.id]); // Adding session?.user.id as a dependency

    const handleEdit = (post) => {
        Router.push(`/update-prompt?id=${post._id}`);
    };

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this post?");
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                });

                const filteredPosts = posts.filter((p) => p._id !== post._id);
                setPosts(filteredPosts);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const currentUser = session?.user.id;

    return (
        <>
            {currentUser ? (
                <Profile
                    name="My"
                    desc="Welcome to your personalized profile page"
                    data={posts}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ) : (
                <Profile
                    name="My"
                    desc="Welcome to your personalized profile page"
                    data={posts}
                />
            )}
        </>
    );
};

export default MyProfile;
