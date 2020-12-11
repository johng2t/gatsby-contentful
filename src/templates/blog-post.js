import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import ShareButtons from '../components/Share'

import heroStyles from '../components/hero.module.css'


class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    const urls =String(this.props.location.href);

      //For the social share buttons
      const title = post.title;
      //const getImg = post.heroImage.fluid;
      //const showImg = getImg.src;
    //   function removeTags(str) {
    //     if ((str===null) || (str===''))
    //     return false;
    //     else
    //     str = str.toString();
    //     return str.replace( /(<([^>]+)>)/ig, '');
    //  } 
    // const htmlDescription = removeTags(post.body.childMarkdownRemark.html);

      return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <div className={heroStyles.hero}>
            <Img
              className={heroStyles.heroImage}
              alt={post.title}
              fluid={post.heroImage.fluid}
            />
          </div>
          <div className="wrapper">

            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: 'block',
              }}
            >
              {post.publishDate}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
            <ShareButtons title={title} url={urls} />
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {

    contentfulBlogPost(slug: { eq: $slug }) {
      title,
      description {
        description
      }
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
