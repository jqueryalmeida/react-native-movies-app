import React, { PureComponent } from 'react';
import { ActivityIndicator } from 'react-native';
import { List } from '~/components';
import { api } from '~/services';
import { Colors } from '~/theme';
import PopularMovieItem from './PopularMovieItem';

class PopularMovieList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      movies: [],
    };
  }

  componentDidMount() {
    api.get('movie/popular')
      .then(({ data: { results } }) => this.setState({ loading: false, movies: results }))
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading, movies } = this.state;

    if (loading) {
      return (
        <ActivityIndicator
          color={Colors.gold}
          size={30}
        />
      );
    }

    return (
      <List
        data={movies}
        title="Popular Movies"
        subtitle="Most popular movies in the world"
        onViewAllPress={() => {}}
        renderItem={({ item }) => <PopularMovieItem movie={item} />}
      />
    );
  }
}

export default PopularMovieList;