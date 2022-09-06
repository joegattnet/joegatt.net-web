import React, { useRef, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import Header from "../components/Header";
import Body from "../components/Body";

const CITATION_QUERY = gql`
  query CitationQuery($citationId: Int) {
    citation(uid: $citationId) {
      id
      cachedBodyHtml
      cachedHeadline
      cachedSubheadline
      cachedUrl
      role
    }
    activeTagsForNote(noteId: $citationId) {
      nodes {
        name
        slug
      }
    }
    instructionsForNote(noteId: $citationId) {
      nodes
    }
  }
`;

export default ({ match }) => {
  const { loading, error, data } = useQuery(CITATION_QUERY, {
    variables: { citationId: parseInt(match.params.id, 10) },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <article>
      <Header
        headline="Citations"
        subheadline=""
        breadcrumbs={[
          { href: "/citations", isLink: true, label: "citations" },
          { href: null, isLink: false, label: data.id },
        ]}
      />
      <section>
        <div
          dangerouslySetInnerHTML={{ __html: data.citation.cachedBodyHtml }}
        />
        <aside>
          {data.citation.role !== "unregistered" && (
            <p>
              <em>
                This citation is only available to {data.citation.role} users.
              </em>
            </p>
          )}
          <section id="tags">
            <ul>
              {data.activeTagsForNote.nodes.map((tag) => (
                <li>{tag.name} </li>
              ))}
            </ul>
          </section>
          <section id="comments"></section>
        </aside>
      </section>

      {/* <Chart
        chartType="AreaChart"
        data={[["Age", "Weight"], [4, 5.5], [4.5, 3.5], [4.75, 3.5], [4.825, 3.5], [5, 5.9], [5.5, 11], [6, 2.1], [6.5, 2.3], [7, 7.9], [7.5, 4.1], [8, 12], [9.1, 13]]}
        width="100%"
        height="400px"
        legendToggle
      /> */}
    </article>
  );
};
