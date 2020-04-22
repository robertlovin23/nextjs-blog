import Layout from '../../components/layout'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import Head from 'next/Head'
import { getAllPostIds,getPostData } from '../../lib/posts'

export default function Post({ postsData }) {
    return (
      <Layout>
        <Head>
          <title>{postsData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postsData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postsData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postsData.contentHtml }} />
        </article>
      </Layout>
    )
  }

export function getStaticPaths(){
    const paths = getAllPostIds()
    return{
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}){
    const postsData = await getPostData(params.id)
    return{
        props: {
            postsData
        }
    }
}
