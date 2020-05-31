import { Link } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
// import { UserContext } from '../helpers/UserContext';
import Header from '../components/Header';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import { LINE_HEIGHT, RED } from '../variables';

const TAGS_QUERY = gql`
  query TagsQuery {
    activeTags {
      totalCount
      nodes {
        activeTagsCount
        name
        slug
      }
    }
  }
`;

const StyedTagsList = styled.section`
  margin-bottom: ${LINE_HEIGHT};
  ul {
    columns: 4;
  }
`;

const Count = styled.span`
  color: ${RED};
  &::before {
    content: ' ';
  }
`;

export default () => {
  const { loading, error, data, } = useQuery(TAGS_QUERY);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <section>
      <Header
        headline="Tags" // i18n
      />
      <StyedTagsList>
        <ul>
          {data.activeTags.nodes.map((tag, index) => (
            <li key={tag.slug}>
              <Link to={`/tags/${tag.slug}`}>{tag.name}</Link>
              <Count>{tag.activeTagsCount}</Count>
            </li>
          ))}
        </ul>
      </StyedTagsList>
      <aside class="statistics">
        {data.activeTags.totalCount} tags
      </aside>
    </section>
  );
}
