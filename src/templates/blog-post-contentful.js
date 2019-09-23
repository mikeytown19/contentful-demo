import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image'

class BlogPostContentfulTemplate extends React.Component {
  render() {
    const data = this.props.data.contentfulPost
    const {author, image, subtite, title} = data
    const contentfulMarkup = documentToReactComponents(this.props.data.contentfulPost.childContentfulPostContentRichTextNode.json)
    const post = this.props.data.contentfulPost
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
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

          <section>
            <Img fluid={image.fluid} />
          </section>
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
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      childContentfulPostContentRichTextNode {
        json
      }

    }
  }
`
