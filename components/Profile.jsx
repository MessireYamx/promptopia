import { PromptCard } from "@components/PromptCard";

const Profile = ({ name, data, handleDelete, handleEdit, desc }) => {
    return (
        <section className="w-full">
            <h1 className="text-left text-4xl font-bold"><span className="blue_gradient">{name}</span> Profile</h1>
            <p className="desc text-left">{desc}</p>
            <div className="mt-10 prompt_layout">
                {data.map((post) => (
                    <PromptCard key={post._id} post={post} handleEdit={() => handleEdit && handleEdit(post)} handleDelete={() => handleDelete && handleDelete(post)} />
                ))}
            </div>
        </section>
    );
};

export default Profile;
