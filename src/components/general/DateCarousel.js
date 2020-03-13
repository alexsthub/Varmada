import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class DateCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {firstDate, selectedDate} = this.props;
    const first = firstDate ? moment(firstDate) : moment(new Date());
    const selected = selectedDate ? moment(selectedDate) : first;
    const selectedDayIndex = moment.duration(selected.diff(first)).asDays();
    this.setState({selectedDayIndex});

    setTimeout(() => {
      this.setScrollOffset(selectedDayIndex);
    }, 100);
  }

  setScrollOffset = index => {
    if (this.scrollView) {
      const {width, daysInView} = this.props;

      let scrollViewWidth = constants.DAY_SIZE;
      if (width || daysInView) {
        scrollViewWidth = width || daysInView * constants.DAY_SIZE;
      }
      const xOffset =
        constants.DAY_SIZE * index +
        (constants.DAY_SIZE - scrollViewWidth) / 2 +
        (scrollViewWidth % constants.DAY_SIZE) / 2;

      const scrollOffset = {x: xOffset, animated: true};

      this.scrollView.scrollTo(scrollOffset);
    }
  };

  dateSelect = props => {
    // console.log(props);
    const {onDateSelect} = this.props;
    this.setState(
      {selectedDayIndex: props.key},
      this.setScrollOffset(props.key),
    );

    if (typeof onDateSelect === 'function') {
      onDateSelect(props.date);
    }
  };

  generateDates = props => {
    const date = moment(props.firstDate);
    const disabledDates = props.disabledDates ? props.disabledDates : [];

    const first = props.firstDate
      ? moment(props.firstDate)
      : moment(new Date());
    const last = props.lastDate ? moment(props.lastDate) : null;

    const numberOfDays = last
      ? moment.duration(last.diff(first)).asDays() + 1
      : props.numberOfDays;

    const dates = [];
    for (let i = 0; i < numberOfDays; i += 1) {
      const isDisabled = !!disabledDates.includes(date.format('YYYY-MM-DD'));

      dates.push({
        date: date.format('YYYY-MM-DD'),
        day: date.format('D'),
        day_of_week: date.format('dddd'),
        month: date.format('MMMM'),
        disabled: isDisabled,
      });
      date.add(1, 'days');
    }
    return dates;
  };

  render() {
    let days;
    const {selectedDayIndex} = this.state;
    const {
      firstDate,
      lastDate,
      numberOfDays,
      disabledText,
      daysInView,
      disabledDates,
      width,
      paginate,
    } = this.props;

    let scrollWidth = null;
    if (width) {
      scrollWidth = width;
    } else if (daysInView) {
      scrollWidth = daysInView * constants.DAY_SIZE;
    }

    const daysProps = {
      firstDate,
      lastDate,
      numberOfDays: numberOfDays || 30,
      disabledText: disabledText || null,
      disabledDates: disabledDates || null,
    };

    const availableDates = this.generateDates(daysProps);

    if (availableDates) {
      days = availableDates.map((val, key) => {
        const isClosedStyle = val.open ? null : styles.closed;

        const isClosedMonthStyle = val.disabled
          ? styles.monthContainerClosed
          : null;

        const selectedStyle =
          selectedDayIndex === key ? styles.singleContainerSelected : null;

        return (
          <TouchableOpacity
            key={key}
            disabled={val.disabled}
            onPress={() =>
              this.dateSelect({key, date: availableDates[key].date})
            }>
            <View style={[styles.singleContainer, selectedStyle]}>
              <View style={[styles.singleDateBox, selectedStyle]}>
                <View style={[styles.monthContainer, isClosedMonthStyle]}>
                  <Text style={styles.monthText}>{val.month}</Text>
                </View>
                <View style={styles.dateContainer}>
                  <Text style={[styles.dateText, isClosedStyle]}>
                    {val.day}
                  </Text>
                </View>
                <View style={styles.dayContainer}>
                  <Text style={[styles.dayText, isClosedStyle]}>
                    {val.disabled && disabledText
                      ? daysProps.disabledText
                      : val.day_of_week}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      });
    }

    return (
      <View style={{height: constants.DAY_SIZE, width: scrollWidth}}>
        <ScrollView
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
          horizontal
          snapToInterval={
            paginate && scrollWidth % constants.DAY_SIZE === 0
              ? scrollWidth
              : constants.DAY_SIZE
          }
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}>
          <View style={{width: (scrollWidth % constants.DAY_SIZE) / 2}} />
          {days || null}
        </ScrollView>
      </View>
    );
  }
}

DateCarousel.propTypes = {
  firstDate: PropTypes.string,
  lastDate: PropTypes.string,
  selectedDate: PropTypes.string,
  width: PropTypes.number,
  daysInView: PropTypes.number,
  onDateSelect: PropTypes.func,
  numberOfDays: PropTypes.number,
  disabledText: PropTypes.string,
  disabledDates: PropTypes.array,
  paginate: PropTypes.bool,
};

const constants = {
  MONTH_BACKGROUND_COLOR: '#f8443b',
  MONTH_BACKGROUND_COLOR_DISABLED: '#5a5a5a',
  CALENDAR_BACKGROUND_COLOR: '#fff',
  BORDER_RADIUS: 5,
  DAY_SIZE: 120,
};

const styles = StyleSheet.create({
  singleContainer: {
    height: constants.DAY_SIZE,
    width: constants.DAY_SIZE,
    padding: 10,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  singleDateBox: {
    borderRadius: constants.BORDER_RADIUS,
    overflow: 'hidden',
    backgroundColor: constants.CALENDAR_BACKGROUND_COLOR,
    height: 100,
    width: 100,
    flexDirection: 'column',
    elevation: 3,
  },
  singleContainerSelected: {
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 6,
  },
  closed: {
    color: constants.MONTH_BACKGROUND_COLOR_DISABLED,
  },
  monthContainerClosed: {
    backgroundColor: constants.MONTH_BACKGROUND_COLOR_DISABLED,
  },
  monthContainer: {
    height: 25,
    backgroundColor: constants.MONTH_BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
  dateContainer: {
    height: 50,
  },
  dateText: {
    marginTop: Platform.OS === 'ios' ? 4 : 0,
    fontSize: 38,
    textAlign: 'center',
  },
  dayContainer: {
    height: 25,
  },
  dayText: {
    fontSize: Platform.OS === 'ios' ? 16 : 15,
    textAlign: 'center',
    color: '#000',
  },
});
