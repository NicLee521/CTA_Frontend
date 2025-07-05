import { useRef, useState } from 'react';
import SelectionField from '../../components/selectionField';
import Layout from '../_layout';
import styles from '../../styles/create.module.css'
import { authenticatedFetch } from '../../lib/user';
import { useAuth } from '../context'; // Import useAuth hook
import { headers } from 'next/dist/client/components/headers.js';

export default function Create() {
    const auth = useAuth();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [choices, setChoices] = useState([]);
    const [storyId, setStoryId] = useState('');
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)


    const handleSubmitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        if(!auth.loggedIn) {
            window.alert('You are not logged in');
            return;
        }
        setSubmitted(true);
        const formData = new FormData();
        //@ts-ignore
        formData.append('image', fileInputRef.current?.files?.[0]);
        //@ts-ignore
        formData.append('name', event.target.elements.namedItem('CharacterName')?.value);
        setLoading(true);
        let data;
        try {
            const res = await authenticatedFetch('/api/story', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${await auth.getToken()}`,
                },
                credentials: 'include',
            });
            data = await res.json();
        } catch (err) {
            console.error('Error in posting story request', err)
            setLoading(false);
            setSubmitted(false);
            return;
        }
        
        
        let choices = data.choices.map((choice: { message: { content: string; }; }, index: number) => {
            return {value: choice.message.content, label: `Story #${index + 1}`};
        });
        setLoading(false);
        setChoices(choices);
        setStoryId(data.storyId);
    };

    const handleSubmitSelect = async (selectedOption: any) => {
        try {
            const res = await authenticatedFetch('/api/story', {
                method: 'PATCH',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await auth.getToken()}`,
                },
                body: JSON.stringify({
                    choice: selectedOption,
                    story: storyId
                }), 
            });
        } catch (error) {
            console.error('Error submitting choice', error);
        } finally {
            setSubmitted(false); 
        }
    };

    return (
        <Layout>
            <main className={styles.mainContainer}>
            {!submitted && 
                <div className={styles.formContainer}>
                    <form className={styles.form} onSubmit={handleSubmitForm}>
                        <fieldset>
                            <legend aria-label="Character Information">Character Information</legend>
                            <label className={styles.label} htmlFor="name">Character Name: </label>
                            <input className={styles.inputField} type="text" name="CharacterName" id="name" placeholder="Enter character name" />
                            <label className={styles.label} htmlFor="image">Character Board:</label>
                            <input className={styles.fileInput} type="file" name="Image" id="image" ref={fileInputRef} />
                            <button className={styles.submitButton} type="submit">Submit</button>
                        </fieldset>
                    </form>
                </div>
            }
            {submitted && 
                <div>
                    {loading? 
                    <div className={styles.loadingContainer}>
                        <img src="/fantasySpinner.svg" alt="Loading" className={styles.loadingSpinner} aria-label="Loading spinner"/>
                        <p className={styles.loadingText}>Preparing Your Story...</p>
                    </div>
                    :
                    <div>
                        <SelectionField options={choices} onSubmit={handleSubmitSelect}/>        
                    </div>
                    }
                </div>
            }
            </main>
        </Layout>
    )
}

