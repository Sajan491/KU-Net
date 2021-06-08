import firebase from "../config/firebase";
const departCollection = firebase.firestore().collection("departments")
let departments=[]
departCollection.get().then((abc)=>{
    
    abc.forEach(function(doc){
        departments.push({label: doc.data()['title'], value:doc.data()['id'], icon:doc.data()['icon']})
    })
    
}).catch((err)=>{
    console.log(err)
})


export default departments;