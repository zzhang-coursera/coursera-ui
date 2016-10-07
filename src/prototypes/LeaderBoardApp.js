const React = require('react');
const classNames = require('classnames');
const _ = require('underscore');
const courseraLeaderboard = require('./courseraLeaderboard');

const courseCache = {
  learn: {
    courseName: 'Learning How to Learn',
    school: 'University of Califronia, San Diego',
    photoUrl: 'https://s3.amazonaws.com/coursera-university-assets/leaderboard/thumb_howtolearn_80.png',
  },
  machineLearning: {
    courseName: 'Machine Learning',
    school: 'Stanford University',
    photoUrl: 'https://s3.amazonaws.com/coursera-university-assets/leaderboard/thumb_machine_learning_80.png',
  },
  dog: {
    courseName: 'Dog Emotion and Cognition',
    school: 'Duke University',
    photoUrl: 'https://s3.amazonaws.com/coursera-university-assets/leaderboard/thumb_dog_80.png',
  },
};
const cardStyles = {
  card: {
    minWidth: 706,
    minHeight: 196,
    padding: 32,
    borderBottom: '1px solid #c4c4c4'
  },
  mainCardContentBox: {
    marginRight: 32,
    marginLeft: 45,
  },
  numberBox: {
    minWidth: 80,
    marginTop: 20,
    position: "relative",
  },
  avatar: {
    borderRadius: '50%',
    width: 140,
    height: 140,
  },
  avatarcontainer: {
    position: 'relative',
  },
  pointsBox: {
    minWidth: 80,
    textAlign: "left",
  },
  pointsTitle: {
    color: "#969696",
    fontSize: 12,
    fontFace: 'OpenSans-SemiBold',
  },
  pointsNumber: {
    color: "#48CFAD",
    fontSize: 64,
    fontFace: 'OpenSans',
    character: '-0.5px',
    line: '87px'
  },
  numberCircle: {
    float: 'right',
    width: 55,
    height: 55,
    borderRadius: '50%',
    textAlign: "center",
    backgroundColor: "#48CFAD",
    color: "white",
    fontSize: 20,
    lineHeight: '280%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  mainCardName: {
    fontSize: 24,
    fontFace: 'OpenSans-SemiBold',
    marginBottom: 8,
  },
  mainCardCompleted: {
    fontSize: 12,
    color: "#969696",
    fontFace: 'OpenSans-SemiBold',
  },
  mainCardCurrent: {
    fontSize: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  mainCardCurrentTitle: {
    fontSize: 18,
  },
  mainCardCurrentSchool: {
    fontSize: 12,
    color: "#c4c4c4",
  },
  coursePicture: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  progressBar: {
    width: 240,
    height: 11,
    display: 'block',
    borderRadius: 6,
  },
  progressStyle: {
    width: '50%',
    height: 12,
    borderRadius: 6,
    margin: '8px 0',
  }
};

class ProgressBarWidget extends React.Component {
  // static propTypes = {
  //   isDanger: React.PropTypes.bool,
  //   percentComplete: React.PropTypes.number
  // }

  // static defaultProps = {
  //   isDanger: false,
  //   percentComplete: 0,
  // }

  render() {
    const {isDanger, percentComplete} = this.props;
    let percentCompleteLocal = percentComplete;
    if (percentComplete < 0) {
      percentCompleteLocal = 0;
    } else if (percentComplete > 100) {
      percentCompleteLocal = 100;
    }
    const progressClasses = classNames(
        'progress-completed',
        {'bgcolor-success': !isDanger},
        {'bgcolor-danger': isDanger},
      );
    const progressStyles = {
      width: percentCompleteLocal + '%'
    };

    return (
      <div className="rc-ProgressBarWidget bgcolor-black-g1">
        <div className={progressClasses} style={cardStyles.progressStyle}></div>
      </div>
    );
  }
}

ProgressBarWidget.defaultProps = {
    isDanger: false,
    percentComplete: 0,
}
ProgressBarWidget.propTypes = {
    isDanger: React.PropTypes.bool,
    percentComplete: React.PropTypes.number
}

const Card = ({data}) => {
  const percent = 10;
  data.photoUrl = ('0' + data.rank).slice(-2) + '_' + data.userName.toLowerCase().replace(' ', '_') + '.png';

  return (
      <div className="rc-Card horizontal-box" style={cardStyles.card}>
        <div className="number-box horizontal-box align-items-absolute-center" style={cardStyles.numberBox}>
          <div clasesName="number-circle" style={cardStyles.numberCircle}>
            {data.rank}
          </div>
          <div className="avatar-container" style={cardStyles.avatarContainer}>
            <img src={'https://s3.amazonaws.com/coursera-university-assets/leaderboard/' + data.photoUrl} alt="CourseraAlt" style={cardStyles.avatar} />
          </div>
        </div>
        <div className="main-card-content-box vertical-box-box flex-1" style={cardStyles.mainCardContentBox}>
          <div className="text-content-container main-card-top">
            <div className="main-card-name" style={cardStyles.mainCardName}>{data.userName}</div>
            <div className="main-card-courses-completed" style={cardStyles.mainCardCompleted}>{data.numCoursesCompleted} COURSES COMPLETED</div>
            <div className="main-card-current-course" style={cardStyles.mainCardCurrent}>CURRENT COURSE</div>
          </div>
          <div className="text-content-container main-card-bottom horizontal-box">
            <div className="course-picture">
              <img src={courseCache[data.course].photoUrl} alt="CourseraAlt" style={cardStyles.coursePicture} />
            </div>
            <div className="course-description">
              <div className="main-card-current-course-title" style={cardStyles.mainCardCurrentTitle}>{courseCache[data.course].courseName}</div>
              <div className="main-card-current-course-school" style={cardStyles.mainCardCurrentSchool}>{courseCache[data.course].school}</div>
              <div className="main-card-current-course-title label-text color-black-g2">PROGRESS</div>
              <ProgressBarWidget
                style={cardStyles.progressBar}
                percentComplete={50}
              />
            </div>
          </div>
        </div>
        <div className="points-box vertical-box" style={cardStyles.pointsBox}>
            <p className="points-title" style={cardStyles.pointsTitle}>Points</p>
            <div className="points-number" style={cardStyles.pointsNumber}>{data.score}</div>
          </div>
      </div>
    );
};

const appStyles = {
  main: {
    marginTop: -50
  },
  title: {
    display: 'block',
    color: '#FFFFFF',
    fontSize: 64,
    fontFamily: "OpenSans-Light",
    lineHeight: 87
  },
  timeExpiry: {
    display: 'block',
    fontSize: 20,
    fontFamily: 'OpenSans',
    lineHeight: 27,
    color: 'white'
  },
  headerContainer: {
    background: 'linear-gradient(to bottom right, #4FC1E9, #4A89DC)',
    height: 500,
  },
  leftCardContainer: {
    marginLeft:100,
    marginRight: 32,
  },
  profileContainer: {
    width: 400,
    marginRight: 100
  },
  courseContainer: {
    width: 400,
    marginRight: 32,
    marginTop: 40,
  },
  textSpacing: {
    padding: 16,
  },
  selectedOverall: {
    fontWeight: 800,
    borderBottom: '2px solid #FFFFFF',
    lineHeight: 25,
  },
  thisMonth: {
    marginLeft: 60,
    lineHeight: 25,
  },
  nav: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'OpenSans',
    height: 60,
    marginTop:-50,
  },
  courseSpacing: {
    marginTop: 20
  }
};

class LeaderBoardApp extends React.Component {
  render() {
    const leaderboardData = [
      {
        "userName": "April Pascua",
        "score": 381,
        "numCoursesCompleted": 2,
        "course": "learn",
        "rank": 1
      },
      {
        "userName": "Jerry Charumilind",
        "score": 343,
        "numCoursesCompleted": 2,
        "course": "machineLearning",
        "rank": 2
      },
      {
        "userName": "Audrey Li",
        "score": 315,
        "numCoursesCompleted": 2,
        "course": "machineLearning",
        "rank": 3
      },
      {
        "userName": "Giovanni Dubois",
        "score": 304,
        "numCoursesCompleted": 2,
        "course": "machineLearning",
        "rank": 4
      },
      {
        "userName": "Brandon Tram",
        "score": 295,
        "numCoursesCompleted": 2,
        "course": "machineLearning",
        "rank": 5
      },
      {
        "userName": "Zhaojun Zhang",
        "score": 280,
        "numCoursesCompleted": 2,
        "course": "dog",
        "rank": 6
      },
      {
        "userName": "Kara Behnke",
        "score": 274,
        "numCoursesCompleted": 1,
        "course": "learn",
        "rank": 7
      },
      {
        "userName": "Emily Sands",
        "score": 251,
        "numCoursesCompleted": 1,
        "course": "machineLearning",
        "rank": 8
      },
      {
        "userName": "Ian Stuart",
        "score": 233,
        "numCoursesCompleted": 1,
        "course": "machineLearning",
        "rank": 9
      },
      {
        "userName": "Kurt Apen",
        "score": 229,
        "numCoursesCompleted": 1,
        "course": "dog",
        "rank": 10
      }
    ];

    const topCourses = ['learn', 'machineLearning', 'dog'];
    return (
      <div className="rc-LeaderBoardApp">
        <div className="vertical-box align-items-absolute-center" style={appStyles.headerContainer}>
            <h1 className="display-text-1" style={{color: 'white', fontSize: 60, fontWeight: 'normal', marginBottom: 48}}>Coursera Leaderboard</h1>
            <h2 className="headline-text-4" style={{color: 'white'}}>21 DAYS LEFT</h2>
        </div>

        <div className="main horizontal-box" style={appStyles.main}>
          <div className="left-card-container card-no-action flex-2" style={appStyles.leftCardContainer}>
            <div className="horizontal-box" style={{marginTop: -64}}>
              <div className="horizontal-box" style={{marginRight: 64}}>
                <h2 className="headline-text-4" style={{color: '#fff', borderBottom: '2px solid #fff', paddingBottom: 16}}>Overall Progress</h2>
              </div>
              <div className="horizontal-box">
                <h2 className="headline-text-4" style={{color: '#fff', paddingBottom: 16, fontWeight: 'normal'}}>This Month</h2>
              </div>
            </div>
            {leaderboardData.map((item, index) =>
              <Card key={index} data={item} />
            )}
          </div>
          <div className="right-card-container">
            <img src="https://s3.amazonaws.com/coursera-university-assets/leaderboard/profile.png"/>
            <div className="card-no-action vertical-box" style={appStyles.courseContainer}>
              <div style={appStyles.textSpacing}>
                <h2 className="headline-text-3">Top Courses</h2>
                {topCourses.map(course => (
                  <div className="text-content-container main-card-bottom horizontal-box" style={appStyles.courseSpacing}>
                    <div className="course-picture">
                      <img src={courseCache[course].photoUrl} alt="CourseraAlt" style={cardStyles.coursePicture} />
                    </div>
                    <div className="course-description">
                      <div className="main-card-current-course-title" style={cardStyles.mainCardCurrentTitle}>{courseCache[course].courseName}</div>
                      <div className="main-card-current-course-school" style={cardStyles.mainCardCurrentSchool}>{courseCache[course].school}</div>
                      <div className="main-card-current-course-title" style={cardStyles.mainCardCurrentSchool}>126 learners enrolled</div>
                      
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LeaderBoardApp;
