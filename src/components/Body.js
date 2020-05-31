import React, { Component, createRef } from 'react'
import parse, { domToReact } from 'html-react-parser';
import styled from 'styled-components';

import {
  ANNOTATIONS_FONT_SIZE,
  ANNOTATIONS_LINE_HEIGHT,
  DESKTOP_BREAKPOINT,
  FONT_SIZE,
  HALF_TAB_WIDTH,
  RED,
  TAB_WIDTH
} from '../variables';

const StyedBody = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: ${TAB_WIDTH};
  .body {
    font-family: 'Roboto Slab', serif;
    font-weight: 400;
    position: relative;
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  }
  p {
    display: block;
    font-size: ${FONT_SIZE};
    hyphens: auto;
    margin: 0;
    overflow: hidden;
    ${'' /* position: relative; */}
    text-align: justify;
    text-indent: ${TAB_WIDTH};
    &:first-of-type {
      text-indent: 0;
    }
    a.annotation-mark {
      font-weight: 400;
      font-size: 9px;
      line-height: 0;
      vertical-align: super;
      &.squash {
        margin-left: -2px;
      }
    }
  }
  #annotations {
    font-family: 'Roboto Slab', serif;
    font-size: 14px;
    font-weight: 300;
    grid-row: 2 / span 1;
    @media screen and (min-width: ${DESKTOP_BREAKPOINT}) {
      grid-column: 2 / span 1;
      grid-row: 1 / span 1;
      position: relative;
      ol {
        padding: 0;
      }
      li {
        color: ${RED};
        line-height: ${ANNOTATIONS_LINE_HEIGHT};
        list-style-type: none;
        margin: 0;
        padding: 0;
        position: absolute;
        text-align: left;
        font-size: ${ANNOTATIONS_FONT_SIZE};
        font-weight: 400;
        a:first-of-type {
          color: ${RED};
          display: inline-block;
          min-width: ${HALF_TAB_WIDTH};
          &:after {
            content: '. ';
          }
        }
      }
    }
  }
  #versions {
    ol {
      padding: 0;
    }
    li {
      color: ${RED};
      line-height: ${ANNOTATIONS_LINE_HEIGHT};
      list-style-type: none;
      margin: 0;
      padding: 0;
      position: absolute;
      text-align: left;
      font-size: ${ANNOTATIONS_FONT_SIZE};
      a:first-of-type {
        color: ${RED};
        display: inline-block;
        min-width: ${HALF_TAB_WIDTH};
        &:before {
          content: 'v';
        }
      }
    }
  }
`;

class Body extends Component {
  constructor(props) {
    super(props);
    this.bodyContainer = createRef();
    this.annotationMarks = [];
    this.annotations = [];
    for (let i = 0; i < props.annotationsCount; i++) {
      this.annotationMarks[i] = createRef();
      this.annotations[i] = createRef();
    }
  }

  componentDidMount() {
    let minimum = 0;
    let newTop = minimum;
    let correctedTop = minimum;
    this.annotationMarks.forEach((annotationMark, index) => {
      newTop = annotationMark.current.offsetTop;
      correctedTop = (newTop <= minimum ? minimum : newTop);
      console.log(correctedTop);
      this.annotations[index].current.style.top = `${correctedTop}px`;
      minimum = correctedTop + this.annotations[index].current.offsetHeight;
    });

    const reversedAnnotations = this.annotations.reverse();
    let maximum = this.bodyContainer.current.offsetHeight;
    let newBottom;

    reversedAnnotations.forEach((annotation, index) => {
      newTop = annotation.current.offsetTop;
      newBottom = newTop + annotation.current.offsetHeight;
      correctedTop = newBottom > maximum ? maximum - annotation.current.offsetHeight : newTop;
      this.annotations[index].current.style.top = `${correctedTop}px`;
      maximum = correctedTop;
    });
  }

  render() {
    const { cachedBodyHtml } = this.props;
    const options = { replace:
      ({ attribs, children }) => {
        if (!attribs) return;
        if (attribs.class && attribs.class.includes('annotation-mark')) {
          const index = parseInt(children[0].data, 10);
          return (
            <a class={attribs.class} href={`#annotation-${ index }`} ref={this.annotationMarks[index - 1]} id={`annotation-mark-${ index }`}>
              {domToReact(children, options)}
            </a>
          );
        }
        if (attribs.class === 'annotations-container') {
          return (
              <ol>{children.map((item, index) => (
                <li id={`annotation-${ index + 1 }`} ref={this.annotations[index]}>
                <a href={`#annotation-${ index + 1 }`}>{index + 1}</a>{item.children[0].data}
              </li>
            ))}</ol>
          );
        }
      }};
  
    return <StyedBody ref={this.bodyContainer}>{parse(cachedBodyHtml, options)}</StyedBody>;
  }
}

export default Body;