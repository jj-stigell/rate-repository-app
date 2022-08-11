import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';

export const formNumbers = (number) => number > 1000 ? (number / 1000).toFixed(1) + "k" : number;

const cardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    margin: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
    marginRight: 50,
  },
});

const CardHeader = ({ image, author, description }) => {
  return (
    <View style={cardHeaderStyles.container}>
      <View style={cardHeaderStyles.avatarContainer}>
        <Image style={cardHeaderStyles.avatar} source={{ uri: image }} />
      </View>
      <View style={cardHeaderStyles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">{author}</Text>
        <Text color="textSecondary">{description}</Text>
      </View>
    </View>
  );
};

const cardBodyStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
    padding: 6,
    flex: 1,
    borderRadius: 4,
    backgroundColor: '#6495ED',
    width: 100,
    marginBottom: 30,
    marginLeft: 60,
  },
  text: {
    color: 'white',
  },
});

const CardBody = ({ language }) => {
  return (
    <View style={cardBodyStyles.container}>
      <Text style={cardBodyStyles.text}>{language}</Text>
    </View>
  );
};

const cardFooterStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
    textAlign: 'center',
  },
});

const CardFooterAction = ({ children, props }) => {
  return (
    <Text>
      <Text>
        {props}
      </Text>
      <Text color="textSecondary">
        {"\n"}
        {children}
      </Text>
    </Text>
  )
};

const CardFooter = ({ stars, forks, reviews, rating }) => {
  return (
    <View style={cardFooterStyles.container}>
      <CardFooterAction props={formNumbers(stars)}>
        Stars
      </CardFooterAction>
      <CardFooterAction props={formNumbers(forks)}>
        Forks
      </CardFooterAction>
      <CardFooterAction props={formNumbers(reviews)}>
        Reviews
      </CardFooterAction>
      <CardFooterAction props={formNumbers(rating)}>
        Rating
      </CardFooterAction>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  }
});

const Card = ({ repoinfo }) => {
  return (
    <View style={cardStyles.container}>
      <CardHeader image={repoinfo.ownerAvatarUrl} author={repoinfo.fullName} description={repoinfo.description} />
      <CardBody language={repoinfo.language}/>
      <CardFooter stars={repoinfo.stargazersCount} forks={repoinfo.forksCount} reviews={repoinfo.reviewCount} rating={repoinfo.ratingAverage} />
    </View>
  );
};

export default Card
