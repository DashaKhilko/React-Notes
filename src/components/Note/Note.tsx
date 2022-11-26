import { useState } from 'react';
import { HighlightWithinTextarea } from 'react-highlight-within-textarea';
import { AiFillDelete, AiFillCheckSquare } from 'react-icons/ai';
import { GoPencil } from 'react-icons/go';
import styles from './Note.module.scss';
import { filterHashtagsFromText } from '../../utils/filterHashtagsFromText';
import { makeUniqueHashtags } from '../../utils/makeUniqueHashtags';
import { INote } from '../../App';
import Hashtag from '../Hashtag/Hashtag';

type NoteProps = {
  note: INote,
  notes: INote[],
  deleteNote: (id: string) => void,
  setNotes: (note: INote[]) => void,
  addHashtag: (text: string) => void,
  removeHashtag: (tagsList: string[]) => void,
};

const Note: React.FC<NoteProps> = ({
  note,
  notes,
  deleteNote,
  setNotes,
  addHashtag,
  removeHashtag,
}) => {
  const [edit, setEdit] = useState('');
  const [newText, setNewText] = useState(note.text);

  const editNote = (id: string, text: string) => {
    setEdit(id);
    setNewText(text);
  };

  const checkHashtagsDifference = (filteredTags: string[], filteredBy: string[]) => {
    return filteredTags.filter((tag) => !filteredBy.includes(tag));
  };

  const saveNote = (id: string) => {
    let uniqueHashtags = makeUniqueHashtags(filterHashtagsFromText(newText));

    if (checkHashtagsDifference(note.hashtags, uniqueHashtags).length) {
      removeHashtag(checkHashtagsDifference(note.hashtags, uniqueHashtags));
    }
    if (checkHashtagsDifference(uniqueHashtags, note.hashtags).length) {
      addHashtag(checkHashtagsDifference(uniqueHashtags, note.hashtags).join(' '));
    }

    note.hashtags = [...uniqueHashtags];

    setNotes(notes.map((note) => (note.id === id ? { ...note, text: newText } : { ...note })));

    setEdit('');
  };

  return (
      <div className={styles.note}>
        <div className={styles.mainContent}>
          {edit === note.id ? (
            <>
              <div className={styles.textEdit}>
                <HighlightWithinTextarea
                  value={newText}
                  highlight={[...note.hashtags]}
                  onChange={(value) => setNewText(value)}
                />
              </div>
              <AiFillCheckSquare
                className={styles.check}
                onClick={() => saveNote(note.id)}
              />
            </>
          ) : (
            <>
              <AiFillDelete
                className={styles.delete}
                onClick={() => deleteNote(note.id)}
              />
              <div className={styles.text}>{note.text}</div>
              <GoPencil
                className={styles.edit}
                onClick={() => editNote(note.id, note.text)}
              />
            </>
          )}
        </div>
        <div className={styles.hashtags}>
          {note.hashtags.map((tag) => (
            <li key={tag}>
              <Hashtag tag={tag} />
            </li>
          ))}
        </div>
      </div>
  );
};

export default Note;
