import { useState } from 'react';
import styles from '../styles/selection.module.css'

export default function SelectionField(props: any) {
    const { options, onSubmit } = props;

    const [selectedOption, setSelectedOption] = useState(options[0].value ||'');

    const handleFormSubmit = (event:any) => {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(selectedOption);
        }
    };

    const handleSelectionChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
        <select className={styles.select} value={selectedOption} onChange={handleSelectionChange}>
            {options.map((option: any) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
            ))}
        </select>
        <button className={styles.button} type="submit">Submit</button>
        <p className={styles.p}>{selectedOption}</p>
        </form>
        </div>
    );
}