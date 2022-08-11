import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';

const cardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    margin: 10,
  },
  rating: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    borderWidth: 2,
    borderColor: '#6495ED',
    color: '#6495ED',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ratingContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
    marginRight: 50,
  },
});

const CardHeader = ({ name, rating, date }) => {
  const dt = new Date(date);
  return (
    <View style={cardHeaderStyles.container}>
      <View style={cardHeaderStyles.ratingContainer}>
        <Text style={cardHeaderStyles.rating}>{rating}</Text>
      </View>
      <View style={cardHeaderStyles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">{name}</Text>
        <Text color="textSecondary">{`${dt.getDate()}.${(dt.getMonth() + 1)}.${dt.getFullYear()}`}</Text>
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
    marginBottom: 30,
    marginLeft: 60,
  },
  text: {
    color: 'black',
    textAlign: 'left',
  },
});

const CardBody = ({ text }) => {
  return (
    <View style={cardBodyStyles.container}>
      <Text style={cardBodyStyles.text}>{text}</Text>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  }
});

const ReviewCard = ({ review }) => {
  return (
    <View style={cardStyles.container}>
      <CardHeader name={review.user.username} rating={review.rating} date={review.createdAt} />
      <CardBody text={review.text}/>
    </View>
  );
};

export default ReviewCard;
