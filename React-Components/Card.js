import styles from '../styles/Card.module.css';

const Card = (props) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{props.title}</h1>
            <p className={styles.text}>{props.text}</p>
        </div>
    );
};

export default Card;
