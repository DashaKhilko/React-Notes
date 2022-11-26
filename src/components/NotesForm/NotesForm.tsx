import { useState } from 'react';
import styles from './NotesForm.module.scss';

type NotesFormProps = {
  addNote: (text: string) => void;
}

const NotesForm: React.FC<NotesFormProps> = ({ addNote }) => {
  const [text, setText] = useState('');

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNote(text);
    setText('');
  };
  return (
    <div className={styles.noteForm}>
      <h1>Notepad</h1>
      <form onSubmit={submitForm}>
        <textarea
          className={styles.form}
          value={text}
          placeholder="Enter text..."
          onChange={(event) => setText(event.target.value)}
        />
        <button title="Add note" type="submit">Add</button>
      </form>
    </div>
  );
};

export default NotesForm;
