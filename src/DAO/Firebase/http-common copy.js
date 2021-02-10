import firebase from 'firebase'

const commesse = 'commesse-test'
const employee = 'employee-test'
const articoli = 'articoli-test'
const jobs = 'jobs-test'

const config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  projectId: "db-azalin",
  apiKey: "AIzaSyAWjivdMsTcAC1i0FdWkWHhmNISEs6zjmE",
  authDomain: "db-azalin.firebaseapp.com",
  databaseURL: "https://db-azalin.firebaseio.com",
  storageBucket: "db-azalin.appspot.com",
  messagingSenderId: "556055520031",
  appId: "1:556055520031:web:17044b44a605c3d437862a"
};


function strToDate(date){
  if(date === ''){
      return ''
  }
  const [dd,mm,yyyy] = date.split('/')
  const str = mm + '/' + (parseInt(dd)+1) + '/' + yyyy
  return new Date(str).toISOString()
}

function dateToStr(date){
  if(date === ''){
      return ''
  }
  const arr = date.split('T')
  const [yyyy, mm, dd] = arr[0].split('-')
  return dd + '/' + mm + '/' + yyyy
}

const fire = firebase.initializeApp(config).firestore()
export default fire
export {commesse, employee, articoli, jobs, strToDate, dateToStr}
