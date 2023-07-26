import { myContext } from '../context'
import { useContext, useRef, useState } from 'react';
import axios from 'axios';
import SelectionField from '../../components/selectionField';
import Layout from '../_layout';
import styles from '../../styles/create.module.css'


export default function Create() {
    const userObject = useContext(myContext) as any;
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [choices, setChoices] = useState([]);
    const [storyId, setStoryId] = useState('');
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)


    const handleSubmitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitted(true);
        const formData = new FormData();
        //@ts-ignore
        formData.append('image', fileInputRef.current?.files?.[0]);
        //@ts-ignore
        formData.append('name', event.target.elements.namedItem('CharacterName')?.value);
        setLoading(true);
        let res = await axios.post('http://localhost:8080/api/story', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        let choices = res.data.choices.map((choice: { message: { content: string; }; }, index: number) => {
            return {value: choice.message.content, label: `Story #${index+1}`}
        })
        setLoading(false);
        setChoices(choices);
        setStoryId(res.data.storyId);
    };

    const handleSubmitSelect = async (selectedOption: any) => {    
        let res = await axios('http://localhost:8080/api/story', {
            method: 'PATCH',
            withCredentials: true,
            data: {
                choice: selectedOption,
                story: storyId
            }
        })
        
    };

    return (
        <Layout>
        <main>
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={handleSubmitForm}>
                    <label className={styles.label} htmlFor="name">Character Name</label>
                    <input className={styles.inputField} type="text" name="CharacterName" id="name" />
                    <label className={styles.label} htmlFor="image">Character Board</label>
                    <input className={styles.fileInput} type="file" name="Image" id="image" ref={fileInputRef} />
                    <button className={styles.submitButton} type="submit">Submit</button>
                </form>
            </div>
            {submitted && 
                <div>
                    {loading? <div>Loading</div>: <SelectionField options={choices} onSubmit={handleSubmitSelect}/>}        
                </div>
            }
        </main>
        </Layout>
    )
}

