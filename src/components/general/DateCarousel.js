import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

// TODO: Should i start with current date in the middle with whitespace to the left or just start with current date all the way to the left?
// TODO: If i did the latter, I should probably get rid of the Left Blur on the first mount
// TODO: Llysa likes the latter better but I kind of like the former.
const pageWidth = Dimensions.get('window').width;
export default class DateCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedDayIndex: 0};
  }

  componentDidMount() {
    const {firstDate, selectedDate} = this.props;
    const first = firstDate ? moment(firstDate) : moment(new Date());
    const selected = selectedDate ? selectedDate : first;
    const selectedDayIndex = selected.diff(first, 'days');
    this.setState({selectedDayIndex});
    setTimeout(() => {
      this.setScrollOffset(selectedDayIndex);
    }, 100);
  }

  // TODO: If new selectedDayIndex from calendar is greater than the available days in the scroll, we need to regenerate dates up to the
  // TODO: new date +10 or something?
  static getDerivedStateFromProps(nextProps, prevState) {
    const selectedDate = nextProps.selectedDate.startOf('day');
    const first = nextProps.firstDate
      ? moment(nextProps.firstDate).startOf('day')
      : moment(new Date()).startOf('day');
    const selectedDayIndex = Math.round(
      moment.duration(selectedDate.diff(first)).asDays(),
    );
    if (prevState.selectedDayIndex !== selectedDayIndex) {
      return {selectedDayIndex: selectedDayIndex};
    } else {
      return null;
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    this.setScrollOffset(this.state.selectedDayIndex);
  };

  setScrollOffset = index => {
    if (this.scrollView) {
      const {width, daysInView} = this.props;

      let scrollViewWidth = constants.DAY_WIDTH;
      if (width || daysInView) {
        scrollViewWidth = width || daysInView * constants.DAY_WIDTH;
      }
      let xOffset =
        constants.DAY_WIDTH * index +
        (constants.DAY_WIDTH - scrollViewWidth) / 2 +
        (scrollViewWidth % constants.DAY_WIDTH) / 2;

      if (xOffset + constants.DAY_WIDTH > pageWidth / 2) {
        const scrollOffset = {
          x: xOffset - pageWidth / 2 + constants.DAY_WIDTH / 2,
          animated: true,
        };
        this.scrollView.scrollTo(scrollOffset);
      } else {
        const scrollOffset = {
          x: 0,
          animation: true,
        };
        this.scrollView.scrollTo(scrollOffset);
      }
    }
  };

  dateSelect = props => {
    const {onDateSelect} = this.props;
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
        day_of_week: date.format('ddd'),
        month: date.format('MMM'),
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
      scrollWidth = daysInView * constants.DAY_WIDTH;
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
        let selectedStyle;
        let selectedText;
        if (selectedDayIndex === key) {
          selectedStyle = styles.singleContainerSelected;
          selectedText = styles.selectedText;
        }
        return (
          <TouchableOpacity
            key={key}
            disabled={val.disabled}
            onPress={() =>
              this.dateSelect({key, date: availableDates[key].date})
            }>
            <View style={styles.singleContainer}>
              <View style={[styles.singleDateBox, selectedStyle]}>
                <Text style={[styles.monthText, selectedText]}>
                  {val.month}
                </Text>
                <Text style={[styles.dateText, isClosedStyle, selectedText]}>
                  {val.day}
                </Text>
                <Text style={[styles.dayText, isClosedStyle, selectedText]}>
                  {val.disabled && disabledText
                    ? daysProps.disabledText
                    : val.day_of_week}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      });
    }

    return (
      <View style={{height: constants.DAY_WIDTH, width: scrollWidth}}>
        <ScrollView
          ref={scrollView => (this.scrollView = scrollView)}
          horizontal
          snapToInterval={
            paginate && scrollWidth % constants.DAY_WIDTH === 0
              ? scrollWidth
              : constants.DAY_WIDTH
          }
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}>
          <View style={{width: (scrollWidth % constants.DAY_WIDTH) / 2}} />
          {days || null}
        </ScrollView>

        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.fadeLeft}
          colors={['rgba(255, 255, 255, 1.0)', 'rgba(255, 255, 255, 0.2)']}
          pointerEvents={'none'}
        />
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.fadeRight}
          colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 1.0)']}
          pointerEvents={'none'}
        />
      </View>
    );
  }
}

DateCarousel.propTypes = {
  firstDate: PropTypes.string,
  lastDate: PropTypes.string,
  selectedDate: PropTypes.object,
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
  DAY_WIDTH: 100,
  DAY_HEIGHT: 120,
};

const styles = StyleSheet.create({
  singleContainer: {
    height: constants.DAY_HEIGHT,
    width: constants.DAY_WIDTH,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  singleDateBox: {
    borderRadius: constants.BORDER_RADIUS,
    backgroundColor: constants.CALENDAR_BACKGROUND_COLOR,
    overflow: 'hidden',
    marginHorizontal: 10,
    elevation: 5,
    alignItems: 'center',
  },
  singleContainerSelected: {
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 5,
    backgroundColor: '#5c636e',
  },
  closed: {
    color: constants.MONTH_BACKGROUND_COLOR_DISABLED,
  },
  monthContainerClosed: {
    backgroundColor: constants.MONTH_BACKGROUND_COLOR_DISABLED,
  },
  selectedText: {
    color: '#FFFFFF',
  },
  monthText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
  },
  dateText: {
    marginTop: Platform.OS === 'ios' ? 4 : 0,
    fontSize: 38,
    textAlign: 'center',
  },
  dayText: {
    fontSize: Platform.OS === 'ios' ? 16 : 15,
    textAlign: 'center',
    color: '#000',
  },
  fadeLeft: {
    position: 'absolute',
    top: 0,
    width: 100,
    height: 100,
    zIndex: 1,
  },
  fadeRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    zIndex: 1,
  },
});
