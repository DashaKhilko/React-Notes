import styles from './Hashtags.module.scss';
import { IHashtags } from '../../App';
import Hashtag from '../Hashtag/Hashtag';

type HashtagsProps = {
  hashtags: IHashtags;
  filterBy: string;
  setFilterBy: (tag: string) => void
}

const Hashtags: React.FC<HashtagsProps> = ({ hashtags, filterBy, setFilterBy }) => {

  return (
    <div className={styles.hashtags}>
      <ul>
        {!!Object.keys(hashtags).length && (
          <li
            className={`${filterBy === '' ? styles.allNotesActive : styles.allNotes}`}
            onClick={() => setFilterBy('')}>
            All notes
          </li>
        )}
        {Object.keys(hashtags).map((tag) => (
          <li
            className={`${filterBy === tag ? styles.active : ''}`}
            key={tag}
            onClick={() => setFilterBy(tag)}>
            <Hashtag tag={tag} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hashtags;
