import firebase from 'firebase'
import Parse from 'parse'

Parse.initialize('ParseServerAzzalin');
Parse.serverURL = 'http://localhost:1337/parse'

const commesse = 'commesse'
const impiegati = 'impiegati'
const articoli = 'articoli'
const preventivo = 'preventivo'
const lavori = 'lavori'

const config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  projectId: "db-azalin",
  apiKey: "AIzaSyAWjivdMsTcAC1i0FdWkWHhmNISEs6zjmE",
  authDomain: "db-azalin.firebaseapp.com",
  databaseURL: "https://db-azalin.firebaseio.com",
  storageBucket: "db-azalin.appspot.com",
  messagingSenderId: "556055520031",
  appId: "1:556055520031:web:17044b44a605c3d437862a"
};

/*
prova()

async function prova(){
  const obj = new Parse.Object('GameScore');
  obj.set('score',1338);
  obj.set('playerName','Past');
  await obj.save();
  console.log(obj.toJSON());

  const query = new Parse.Query('GameScore');
  const objAgain = await query.get(obj.id);
  console.log(objAgain.toJSON());
}
*/

function strToDate(date){
  console.log(date)
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
export {commesse, impiegati, articoli, lavori, preventivo, strToDate, dateToStr, Parse}
