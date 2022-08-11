import { render } from '@testing-library/react-native';
import RepositoryItem from './RepositoryItem';
import { formNumbers } from './Card'

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {

    const repositories = {
      totalCount: 8,
      pageInfo: {
        hasNextPage: true,
        endCursor:
          'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
        startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
      },
      edges: [
        {
          node: {
            id: 'jaredpalmer.formik',
            fullName: 'jaredpalmer/formik',
            description: 'Build forms in React, without the tears',
            language: 'TypeScript',
            forksCount: 1619,
            stargazersCount: 21856,
            ratingAverage: 88,
            reviewCount: 3,
            ownerAvatarUrl:
              'https://avatars2.githubusercontent.com/u/4060187?v=4',
          },
          cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        {
          node: {
            id: 'async-library.react-async',
            fullName: 'async-library/react-async',
            description: 'Flexible promise-based React data loader',
            language: 'JavaScript',
            forksCount: 69,
            stargazersCount: 1760,
            ratingAverage: 72,
            reviewCount: 3,
            ownerAvatarUrl:
              'https://avatars1.githubusercontent.com/u/54310907?v=4',
          },
          cursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
        },
      ],
    };

    const repos = repositories.edges.map(edge => edge.node);

    it('renders first repository information correctly', () => {
      const repo = repos[0];
      const { debug, getByText } = render(<RepositoryItem repoinfo={repo} />);
      //debug();
      expect(getByText(repo.fullName)).toBeDefined();
      expect(getByText(repo.description)).toBeDefined();
      expect(getByText(repo.language)).toBeDefined();
      expect(getByText(formNumbers(repo.forksCount).toString())).toBeDefined();
      expect(getByText(formNumbers(repo.stargazersCount).toString())).toBeDefined();
      expect(getByText(formNumbers(repo.ratingAverage).toString())).toBeDefined();
      expect(getByText(formNumbers(repo.reviewCount).toString())).toBeDefined();
    });

    it('renders second repository information correctly', () => {
      const repo = repos[1];
      const { debug, getByText } = render(<RepositoryItem repoinfo={repo} />);
      //debug();
      expect(getByText(repo.fullName)).toBeDefined();
      expect(getByText(repo.description)).toBeDefined();
      expect(getByText(repo.language)).toBeDefined();
      expect(getByText(formNumbers(repo.forksCount).toString())).toBeDefined();
      expect(getByText(formNumbers(repo.stargazersCount).toString())).toBeDefined();
      expect(getByText(formNumbers(repo.ratingAverage).toString())).toBeDefined();
      expect(getByText(formNumbers(repo.reviewCount).toString())).toBeDefined();
    });
  });
});
