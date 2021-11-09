import gql from 'graphql-tag';

import useBasicQuery from '@/hooks/query';

import { getHomeType } from '@/apis/type';

export const getHome = () =>
	useBasicQuery<getHomeType, never>(
		gql`
			query getHome {

			}
		`
	);
