import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import PageHeader from '../React-Components/PageHeader';
import PageFooter from '../React-Components/PageFooter';

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Codex Blog</title>
        <meta name="description" content="Welcome to Codex!" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageHeader />
      <main className={styles.main}>
          <section className={styles.bodyContainer}>
            <section className={styles.big_hero_centered}>
              <h1>Welcome to Codex</h1>
              <p>Thank you for visiting! Check out all the projects we are working on!</p>
            </section>
            <section className={styles.links}>
              <article className={styles.linkCard}>
                <h1>Whats New!</h1>
                <p>Check out the latest project updates and news here!</p>
                <Link href='/New'>View</Link>
              </article>
              <article className={styles.linkCard}>
                <h1>Our Projects!</h1>
                <p>Check out our projects list here!</p>
                <Link href='/Projects'>View</Link>
              </article>
            </section>
          </section> 
      </main>
      <PageFooter />
    </div>
  )
}

export async function getStaticProps() {
  const data = null;
  return {
    props: {data}
  }
}
