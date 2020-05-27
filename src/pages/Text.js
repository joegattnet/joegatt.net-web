import React, { useRef } from 'react'
// import { Chart } from 'react-google-charts';
// import { Link } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
// import { UserContext } from '../helpers/UserContext';
import gql from 'graphql-tag';
import parse from 'html-react-parser';

import Header from '../components/Header';
import Text from '../components/Text';

const TEXT_QUERY = gql`
  query TextsQuery($textId: Int) {
    text(uid: $textId) {
      id
      body
      cachedBodyHtml
      cachedHeadline
      cachedSubheadline
      distance
      introduction
      wordCount
      annotationsCount
    }
  }
`;

export default ({ match }) => {
  const { loading, error, data, } = useQuery(TEXT_QUERY, { variables: { textId: parseInt(match.params.id, 10) } });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  // const annotationsContainer = new Array(data.text.annotationsCount);
  // if (!!data.text.annotationsCount) {
    let annotationMarks = new Array(data.text.annotationsCount).map(item => item = useRef());
  // }
  return (
    <article>
      <h1>{data.text.annotationsCount} || {annotationMarks.length}</h1>
      <Header
        headline={data.text.cachedHeadline}
        subheadline={data.text.cachedSubheadline}
      />
      {/* <Text dangerouslySetInnerHTML={{ __html: data.text.cachedBodyHtml }} /> */}
      <Text>{parse(data.text.cachedBodyHtml)}</Text>
      {/* <Text>
        <section className="body">
          <section>
          <p>On this site, whenev~er the code is re~ferred to, as in hin~ter~land, there are no links ex~plain~ing the terms. No “What is Rails?” or “What is a serv~er?” link. This is not a pop~u~lar sci~ence pro~ject. I don’t over-ex~plain the prose so why ex~plain this?<a href="#annotation-1" ref={annotationMarks[0]} id="annotation-mark-1">1</a> Elab~or~at~ing these terms and then not elab~or~at~ing on lit~er~ary terms would sug~gest a pre~sumed kind of read~er. (Then again, the spir~it of the in~ter~net is that everything is ex~plained down to the low~est—“highest”—level. Even the most ar~cane tech~nic~al dis~cus~sions provide links that would cas~cade to an in~tro~duc~tion for ab~so~lute be~gin~ners.) An un~in~ten~ded con~sequence of this may be that the sec~tion comes across as though it’s meant to dazzle the read~er.<a class="squash" href="#annotation-2" ref={annotationMarks[1]} id="annotation-mark-2">2</a></p>
          </section>
        </section>
      </Text> */}

      {/* <Chart
        chartType="AreaChart"
        data={[["Age", "Weight"], [4, 5.5], [4.5, 3.5], [4.75, 3.5], [4.825, 3.5], [5, 5.9], [5.5, 11], [6, 2.1], [6.5, 2.3], [7, 7.9], [7.5, 4.1], [8, 12], [9.1, 13]]}
        width="100%"
        height="400px"
        legendToggle
      /> */}
    </article>
  );
}
