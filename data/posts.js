export const posts=[
    {   
        id:1,
        username: 'Sajan Mahat',
        userImg:require("../assets/sajan.png"),
        postTime: '1 day ago',
        postTitle:"Hiring a full stack ReactJs developer!",
        content:"We are looking for a great JavaScript developer who is proficient with React.js. Your primary focus will be on developing user interface components and implementing them following well-known React.js workflows (such as Flux or Redux). You will coordinate with the rest of the team working on different layers of the infrastructure. Therefore, a commitment to collaborative problem solving, sophisticated design, and quality product is important. Please leave a comment if you are interested!",

        postImgs:[
            {uri: require("../assets/react.png"), id:1},
            {uri: require("../assets/sajan.png"),id:2},
            {uri: require("../assets/aisec.png"),id:3},
            {uri: require("../assets/aalu.jpg"),id:4}
             ],
        liked:true,
        likesCount:22,
        comments: [
            {id:1, user:{name:'Myakuri', userImg:require("../assets/sajan.png")}, comment: 'Wow! Amazing Stuff.', time:'24 mins ago'},
            {id:2, user:{name:'Thakuri', userImg:require("../assets/sajan.png")}, comment: 'I am interested in web development with React. How do I apply?', time:'1 day ago'},
            {id:3, user:{name:'Lyakuri', userImg:require("../assets/sajan.png")}, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', time:'2 days ago'},
            {id:4, user:{name:'Sabin', userImg:require("../assets/sajan.png")}, comment: '@Janesh dai. Eta herna paryo.', time:'2 days ago'},
            {id:5, user:{name:'Myakuri', userImg:require("../assets/sajan.png")}, comment: 'Wow! Amazing Stuff.', time:'24 mins ago'},
            {id:6, user:{name:'Thakuri', userImg:require("../assets/sajan.png")}, comment: 'I am interested in web development with React. How do I apply?', time:'1 day ago'},
            
        ]
    },
    {
        id:2,
        username: 'Sabin Thapa',
        userImg:require("../assets/sajan.png"),
        postTime: '4 hours ago',
        postTitle:"Hello! hau u?",
        content:"subtitle1",
        postImgs:[],
        liked:false,
        likesCount:2,
        comments: []
    },
    {
        id:3,
        username: 'Nripesh Karmacharya',
        userImg:require("../assets/sajan.png"),
        postTime: '34 days ago',
        postTitle:"Aalu lelo!",
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        ,postImgs:[
            {uri: require("../assets/aalu.jpg"),id:1},
            {uri: require("../assets/aisec.png"),id:2}, 
            {uri: require("../assets/react.png"),id:3 }
            
        ],
        liked:false,
        likesCount:8,
        comments: []
    },
    {
        id:4,
        username: 'Rojan Thapa',
        userImg:require("../assets/sajan.png"),
        postTime: '1 day ago',
        postTitle:"Join AISEC. I beg you!",
        content:"subtitle1",
        postImgs:[{uri: require("../assets/aisec.png"),id:1}],
        liked:true,
        likesCount:1,
        comments: []
    },
    {
        id:5,
        username: 'Hero Keto',
        userImg:require("../assets/sajan.png"),
        postTime: '14 days ago',
        postTitle:"Please Like!",
        content:"subtitle1",
        postImgs:[
            {uri: require("../assets/aisec.png"),id:1}, 
            {uri: require("../assets/react.png"),id:2},
        ],
        liked:true,
        likesCount:5,
        comments: []
    }
    
    
]