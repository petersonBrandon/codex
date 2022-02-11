import dbConnect from '../../../lib/connectDB';
import Project from '../../../models/project';
import Post from '../../../models/post';
import Head from 'next/head';
import Link from 'next/link'


import styles from '../../../styles/searchResults.module.css'
import PageHeader from '../../../React-Components/PageHeader';
import PageFooter from '../../../React-Components/PageFooter';

export async function getServerSideProps({ params }) {

    await dbConnect();

    try {
        let words = [];
        let tmpStr = "";
        for (let i of params.search) {
            if(i === " ") {
                words.push(tmpStr);
                tmpStr = "";
            } else {
                tmpStr += i.toLowerCase();
            }
        }
        words.push(tmpStr);
        tmpStr = "";

        console.log(words);

        let searchResults = await Post.find({});
        searchResults = searchResults.filter(post => {
            const tmpTitle = post.title.toLowerCase();
            if (tmpTitle === params.search.toLowerCase()) {
                return true;
            } else {
                for(let word of words) {
                    if ( tmpTitle.search(word) !== -1 ) {
                        return true;
                    }
                }        
            }
        })
        
        console.log(searchResults);
        searchResults.sort((a, b) => {
            return new Date(b.dateCreated) - new Date(a.dateCreated);
        })
        searchResults = JSON.stringify(searchResults);
        
        return {
            props: { searchResults }
        }
    } catch (error) {
        return {
            props: {}
        }
    }
}

const searchResults = ({searchResults}) => {
    let results = null;
    if (searchResults !== null) {
        results = JSON.parse(searchResults);
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Testing</title>
                <meta name="description" content="Check out this post!" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader />
            <main className={styles.main}>
                <section className={styles.bodyContainer}>
                    <section className={styles.resultHeading}>
                        <h1>Search Results:</h1>
                        <h2>Items found: {results.length}</h2>
                    </section>
                    <section className={styles.results}>
                        <div className={styles.resultsWrapper}>
                            {results.map((post) => (
                                <Link key={post._id} href={`/dynamicRoutes/posts/${post._id}`} passHref>
                                    <div className={styles.post}>
                                        <h1 className={styles.postTitle}>{post.title}</h1>
                                        <div className={styles.postContent}>
                                            <p className={styles.postText}>{post.excerpt}</p>
                                            <p className={styles.postDate}>Date Created: {post.dateCreated}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </section>
            </main>
            <PageFooter />
        </div>
    )
}

export default searchResults