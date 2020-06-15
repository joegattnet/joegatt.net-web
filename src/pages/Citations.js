import { Link } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import React from "react";
import Header from "../components/Header";

const CITATIONS_QUERY = gql`
  query CitationsQuery {
    citations {
      nodes {
        id
        cachedUrl
        cachedBlurbHtml
      }
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(CITATIONS_QUERY);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <section>
      <Header
        headline="Citations"
        breadcrumbs={[
          { href: "/citations", isLink: false, label: "citations" },
        ]}
      />
      <section class="citations">
        <header>
          <h3>Citations</h3>
        </header>
        <ul>
          {data.citations.nodes.map((citation, index) => {
            if (!citation.cachedUrl) {
              return null;
            }
            return (
              <li key={citation.id}>
                <Link
                  to={citation.cachedUrl}
                  dangerouslySetInnerHTML={{ __html: citation.cachedBlurbHtml }}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
};
