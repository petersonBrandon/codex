import dbConnect from '../../../lib/connectDB';
import Project from '../../../models/project';
import Post from '../../../models/post';
import Head from 'next/head';
import Link from 'next/link'

import { withIronSessionSsr } from 'iron-session/next'

import styles from '../../../styles/searchResults.module.css'
import postStyles from '../../../styles/ProjectInfo.module.css'
import PageHeader from '../../../React-Components/PageHeader';
import PageFooter from '../../../React-Components/PageFooter';
import LikeButton from '../../../React-Components/Post/LikeButton';

export const getServerSideProps = withIronSessionSsr (
    async ({params, req}) => {
        await dbConnect();

        if(!req.session.isLoggedIn) {
            req.session.isLoggedIn = false;
            req.session.clearance = 0;
            await req.session.save()
        }

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
                props: { 
                    searchResults,
                    isLoggedIn: req.session.isLoggedIn,
                    userClearance: req.session.clearance,
                    user: req.session
                }
            }
        } catch (error) {
            return {
                props: {}
            }
        }
    },
    {
        cookieName: "CODEXAPPCOOKIE",
        cookieOptions : {
            secure: process.env.NODE_ENV === "production" 
        },
        password: process.env.SESSION_PASS
    }   
)

const searchResults = ({searchResults, isLoggedIn, userClearance, user}) => {
    let results = null;
    if (searchResults !== null) {
        results = JSON.parse(searchResults);
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Search Results</title>
                <meta name="description" content="Check out this post!" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader isLoggedIn={isLoggedIn} clearance={userClearance} />
            <main className={styles.main}>
                <section className={styles.bodyContainer}>
                    <section className={styles.resultHeading}>
                        <h1>Search Results:</h1>
                        <h2>Items found: {results.length}</h2>
                    </section>
                    {results.map((post) => (
                        <div className={postStyles.post} key={post._id}>
                            <Link href={`/dynamicRoutes/posts/${post._id}`} passHref>
                                <div className={postStyles.postLink}>
                                    <h1 className={postStyles.postTitle}>{post.title}</h1>
                                    <div className={postStyles.postContent}>
                                        <p className={postStyles.postText}>{post.excerpt}</p>
                                    </div>
                                </div>
                            </Link>
                            <div className={postStyles.postFooter}>
                                <LikeButton post={post} user={user} />
                                <p className={postStyles.postDate}>Date Created: {post.dateCreated}</p>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
            <PageFooter />
        </div>
    )
}

export default searchResults