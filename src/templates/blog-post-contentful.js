import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image'
import { motion, AnimatePresence, useViewportScroll, useTransform  } from 'framer-motion'
import styled from '@emotion/styled'


const BlogPostContentfulTemplate = (props) => {

    const { scrollYProgress } = useViewportScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);

    const data = props.data.contentfulPost
    const {author, image, subtite, title} = data
    const contentfulMarkup = documentToReactComponents(props.data.contentfulPost.childContentfulPostContentRichTextNode.json)
    const post = props.data.contentfulPost
    const siteTitle = props.data.site.siteMetadata.title
    const { previous, next } = props.pageContext

    return (
      <Layout location={props.location} title={siteTitle}>
        <SEO
          title={post.title}
          description={post.subtite}
        />
        <article>
          <header>
            <h1>
              {post.title}
            </h1>

          </header>
          <motion.div
          initial={{ scale: .5 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: .6
          }}>

              <section>
              <Img fluid={image.fluid} />
            </section>
          </motion.div>


          <section>
              {contentfulMarkup}
          </section>
        </article>
        <div>
          written by - {author}
        </div>




        <nav>
          <ul>
            <li>
              {previous && (
                <Link to={previous.slug} rel="prev">
                  ← {previous.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.slug} rel="next">
                  {next.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
}

export default BlogPostContentfulTemplate

export const pageQuery = graphql`
  query ContentfulBlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    contentfulPost(slug: {eq: $slug }) {
      title
      author
      subtite
      image {
        fluid(maxWidth: 700) {
          tracedSVG
        }
      }
      childContentfulPostContentRichTextNode {
        json
      }

    }
  }
`
