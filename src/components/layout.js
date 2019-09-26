import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import { motion, AnimatePresence} from 'framer-motion'

const timeDuration = 0.3

const variants = {
  initial: {
    x: 0,
    y: 200,
    opacity: 0,
  },
  enter: {
    x: 0,
    delay: timeDuration,
    y: 0,
    opacity: 1,
    transition: {
      opactiy: 1,
      duration: timeDuration,
      delay: timeDuration,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    transition: { timeDuration: .1 },
  },
}

const Layout = (props) =>  {
    const { location, title, children } = props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1>
          <Link to={`/`} >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link to={`/`}>
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>

          <AnimatePresence>
            <motion.main
              key={location.pathname}
              variants={variants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              {children}
            </motion.main>
        </AnimatePresence>



      </div>
    )
  }


export default Layout
