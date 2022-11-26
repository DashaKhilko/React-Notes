import styles from './Hashtag.module.scss';

type HashtagProps = {
  tag: string
}

const Hashtag: React.FC<HashtagProps> = ({ tag }) => {
  return <span className={styles.hashtag}>{tag}</span>;
};

export default Hashtag;
