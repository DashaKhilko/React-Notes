import { useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid';
import './App.scss';
import { filterHashtagsFromText } from './utils/filterHashtagsFromText';
import { makeUniqueHashtags } from './utils/makeUniqueHashtags';
import { setNotesStore } from './store/store';
import Note from './components/Note/Note';
import NotesForm from './components/NotesForm/NotesForm';
import Hashtags from './components/Hashtags/Hashtags';


export interface IHashtags {
  [key: string]: number;
}

export interface INote {
  text: string;
  id: string;
  hashtags: string[];
}

const App = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [hashtags, setHashtags] = useState({});
  const [filterBy, setFilterBy] = useState('');

  let updatedHashtags = useRef<IHashtags>({});

  useEffect(() => {
    if (notes.length) {
      setNotesStore(JSON.stringify(notes));
    }
  }, [notes]);

  const addHashtag = (text: string) => {
    const uniqueHashtags: string[] = makeUniqueHashtags(filterHashtagsFromText(text));
    uniqueHashtags.map((hashtag) => ++updatedHashtags.current[hashtag] || (updatedHashtags.current[hashtag] = 1));
    setHashtags({ ...updatedHashtags.current });

  };

  const removeHashtag = (tagsList: string[]) => {
    tagsList.map((tag) => --updatedHashtags.current[tag] || delete updatedHashtags.current[tag]);
    if(!updatedHashtags.current[filterBy]) setFilterBy('');
    setHashtags({ ...updatedHashtags.current });
  };

  const addNote = (text: string) => {
    const hashtags: string[] = filterHashtagsFromText(text);
    setNotes([
      ...notes,
      {
        text: text,
        id: uuid(),
        hashtags: makeUniqueHashtags([...hashtags]),
      },
    ]);

    addHashtag(text);
  };

  const deleteNote = (id: string) => {
    removeHashtag(notes.find((note: INote) => note.id === id)!.hashtags);
    setNotes(notes.filter((note: INote) => note.id !== id));
  };

  return (
    <div>
      <NotesForm addNote={addNote} />
      <Hashtags
        hashtags={hashtags}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />
      <div className="notes">
        {(filterBy ? notes.filter((note: INote) => note.hashtags.includes(filterBy)) : notes).map(
          (note: INote) => (
            <Note
              key={note.id}
              deleteNote={() => deleteNote(note.id)}
              note={note}
              notes={notes}
              setNotes={setNotes}
              addHashtag={addHashtag}
              removeHashtag={removeHashtag}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default App;
