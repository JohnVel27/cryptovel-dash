import { Link } from "react-router";

const NotFoundPage = () => {

    const styles = {
        container: {
            textAlign: 'center',
            padding: '80px 20px',
            color: '#fff'
        },
        title: {
            fontSize: '72px',
            marginBottom: '20px'
        },
        message: {
            fontSize: '18px',
            marginBottom: '30px'
        },
        link: {
            textDecoration: 'none',
            color: '#007bff',
            fontWeight: 'bold'
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>404</h1>

            <p style={styles.message}>
                Oops! The page you're looking for does not exist
            </p>

            <Link to='/' style={styles.link}>
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFoundPage;