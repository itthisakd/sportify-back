const info1 = {
  method: "get",
  path: "/accounts/myaccount",
  pagesToBeUsedIn: ["EditInfoPage", "HomePage", "SettingsPage"],
  purpose: "to give info of MY ACCOUNT",
};
const output_account = {
  id: 1,
  firstName: "Amy",
  gender: "female",
  phoneNumber: "0925419369",
  email: "amy@gmail.com",
  dob: "2001-09-09",
  aboutMe:
    "I am nice because I am veyr very nice and also extremely kind and nice.",
  instagram: "amylee",
  sporify: "samy",
  job: "",
  company: "",
  school: "Clerk County College",
  searchLocation: "",
  searchDistance: 45,
  searchAge: "18-40",
  searchGender: "a",
  currentLocation: "13.741319-100.531151",
  lastActive: "2020-09-0900:00:09",
  showActive: 1,
  showInStack: 1,

  //––––––––––––––––––––––––––JOINED FROM PLANS–––––––––––––––––––––––
  planName: "lite",
  planId: "1",
  //––––––––––––––––––––––––––JOINED FROM SPORT BELONGS TO –––––––––––––––––––––––
  sports: [
    { id: 1, sportName: "Basketball" },
    { id: 3, sportName: "Badminton" },
    { id: 6, sportName: "Tennis" },
    { id: 7, sportName: "Golf" },
    { id: 96, sportName: "Fencing" },
  ],
  //––––––––––––––––––––––––––JOINED FROM MEDIA –––––––––––––––––––––––
  images: [
    {
      image:
        "https://i.picsum.photos/id/1002/600/900.jpg?hmac=4BSgpJzasHKS9vEgQ_Kn3WUjgvc1sUZv-E10bf1bCyA",
    },
    {
      image:
        "https://i.picsum.photos/id/277/600/900.jpg?hmac=0SZDnUgJesoCsIFVR9u9uG9hUC3dQOxx0_pgop-aIoY",
    },
    {
      image:
        "https://i.picsum.photos/id/705/600/900.jpg?hmac=19EE_8IKXcp7maJfLind1IgeEHKHlpbeSbN6o5uydJY",
    },
    //******GIVE IMAGES IN UPLOADED ORDER, order by timestamp, created time
  ],
  //––––––––––––––––––––––––––JOINED/GENERATED FROM MATCHES –––––––––––––––––––––––

  likedMe: 1, //true if match exist & like_returned === false
  superlikedMe: 0,
  
  // matches: [
  //   //find matches where TO ID is that of the user and LIKE RETURNED is FALSE
  //   {
  //     fromId: 1,
  //     toId: 2,
  //     superlike: 0,
  //     like_returned: 0,
  //   },
  //   {
  //     fromId: 5,
  //     toId: 2,
  //     superlike: 0,
  //     like_returned: 1,
  //   },
  // ],
  // //––––––––––––––––––––––––––GENERATED–––––––––––––––––––––––––
  recentlyActive: 1, //show recentelyActive TRUE if lastActive is within 24 users
  age: 18, //DateTime.now().diff(DateTime.fromISO(dob), "years"),
  locationName: "Bangkok, Thailand", //Generated using API ****CONFIRM WITH AUM****
};

const info2 = {
  method: "get",
  path: "/accounts/stack",
  pagesToBeUsedIn: ["HomePage"],
  purpose: "to get stack to display in homepage",
};
const output_stack = [
  {
    id: 1,
    firstName: "Amy",
    gender: "female",
    phoneNumber: "0925419369",
    email: "amy@gmail.com",
    dob: "2001-09-09",
    aboutMe:
      "I am nice because I am veyr very nice and also extremely kind and nice.",
    instagram: "amylee",
    sporify: "samy",
    job: "",
    company: "",
    school: "Clerk County College",

    //WHEN ORGANISING STACK, check that search fields are mutual
    searchLocation: "",
    searchDistance: 45,
    searchAge: "18-40",
    searchGender: "a",
    currentLocation: "13.741319-100.531151",
    lastActive: "2020-09-0900:00:09",
    showActive: 1,
    showInStack: 1,
    //––––––––––––––––––––––––––JOINED FROM SPORT BELONGS TO –––––––––––––––––––––––
    sports: [
      { id: 1, sportName: "Basketball" },
      { id: 3, sportName: "Badminton" },
      { id: 6, sportName: "Tennis" },
      { id: 7, sportName: "Golf" },
      { id: 96, sportName: "Fencing" },
    ],
    //––––––––––––––––––––––––––JOINED FROM MEDIA –––––––––––––––––––––––
    images: [
      {
        image:
          "https://i.picsum.photos/id/1002/600/900.jpg?hmac=4BSgpJzasHKS9vEgQ_Kn3WUjgvc1sUZv-E10bf1bCyA",
      },
      {
        image:
          "https://i.picsum.photos/id/277/600/900.jpg?hmac=0SZDnUgJesoCsIFVR9u9uG9hUC3dQOxx0_pgop-aIoY",
      },
      {
        image:
          "https://i.picsum.photos/id/705/600/900.jpg?hmac=19EE_8IKXcp7maJfLind1IgeEHKHlpbeSbN6o5uydJY",
      },
      //******GIVE IMAGES IN UPLOADED ORDER, order by timestamp
    ],
    //––––––––––––––––––––––––––GENERATED–––––––––––––––––––––––––
    sentLike: true, //TRUE if the account has sent a like to the user
    recentlyActive: 1, //show recentelyActive TRUE if lastActive is within 24 users
    distance: "6km", //generated from currentLocation (OR searchLocation) using isNearby
    //********ONLY SHOW IF MUTUAL */

    age: 18, //DateTime.now().diff(DateTime.fromISO(this.dob), "years"),
    locationName: "Bangkok, Thailand", //Generated using API ****CONFIRM WITH AUM****
  },
];
//––––––––––––-NOT DONE TBC

const info3 = {
  method: "get",
  path: "/matches/mymatches",
  pagesToBeUsedIn: ["MatchesPage"],
  purpose: "to get my matches and display them",
};

//FILTER THROUGH ALL MATCHES AND FIND ID OF THOSE THAT HAVE LIKE_RETURNED = TRUE & TO_ID = req.user.id or  FROM_ID = req.user.id
const output_myMatches = [
  {
    id: 1,
    firstName: "Amy",
    gender: "female",
    phoneNumber: "0925419369",
    email: "amy@gmail.com",
    dob: "2001-09-09",
    aboutMe:
      "I am nice because I am veyr very nice and also extremely kind and nice.",
    instagram: "amylee",
    sporify: "samy",
    job: "",
    company: "",
    school: "Clerk County College",

    //WHEN ORGANISING STACK, check that search fields are mutual
    currentLocation: "13.741319-100.531151",
    lastActive: "2020-09-0900:00:09",
    showActive: 1,
    showInStack: 1,
    //––––––––––––––––––––––––––JOINED FROM SPORT BELONGS TO –––––––––––––––––––––––
    sports: [
      { id: 1, sportName: "Basketball" },
      { id: 3, sportName: "Badminton" },
      { id: 6, sportName: "Tennis" },
      { id: 7, sportName: "Golf" },
      { id: 96, sportName: "Fencing" },
    ],
    //––––––––––––––––––––––––––JOINED FROM MEDIA –––––––––––––––––––––––
    images: [
      {
        image:
          "https://i.picsum.photos/id/1002/600/900.jpg?hmac=4BSgpJzasHKS9vEgQ_Kn3WUjgvc1sUZv-E10bf1bCyA",
      },
      {
        image:
          "https://i.picsum.photos/id/277/600/900.jpg?hmac=0SZDnUgJesoCsIFVR9u9uG9hUC3dQOxx0_pgop-aIoY",
      },
      {
        image:
          "https://i.picsum.photos/id/705/600/900.jpg?hmac=19EE_8IKXcp7maJfLind1IgeEHKHlpbeSbN6o5uydJY",
      },
      //******GIVE IMAGES IN UPLOADED ORDER, order by timestamp
    ],
    //––––––––––––––––––––––––––GENERATED–––––––––––––––––––––––––
    recentlyActive: 1, //show recentelyActive TRUE if lastActive is within 24 users
    distance: "6km", //generated from currentLocation (OR searchLocation) using isNearby
    //********ONLY SHOW IF MUTUAL */
    age: 18, //DateTime.now().diff(DateTime.fromISO(this.dob), "years"),
    locationName: "Bangkok, Thailand", //Generated using API ****CONFIRM WITH AUM AGAIN LATER ****
  },
];

const info4 = {
  method: "get",
  path: "/sports",
  pagesToBeUsedIn: ["RegisterPage", "EditInfoPage", "SettingsPage"],
  purpose: "to get sports to allow users to select",
  table: "get from SPORTS",
};
const output_sports = [
  { id: 1, sportName: "Basketball" },
  { id: 2, sportName: "Badminton" },
  { id: 3, sportName: "Tennis" },
  { id: 4, sportName: "Golf" },
  { id: 5, sportName: "Fencing" },
];




// COMBINE 5&6 into 1 controller to post and delete in one api
const info5 = {
  method: "post & delete",
  path: "/sports",
  pagesToBeUsedIn: ["RegisterPage", "EditInfoPage", "SettingsPage"],
  purpose: "to let users select sports, allow bulk create",
  table: "post & delete in SPORTBELONGSTO",
};
const body5 = {
  add: [
    { sportId: 1, accountId: 1 },
    { sportId: 5, accountId: 1 },
  ],
  remove: [{ sportId: 1, accountId: 1 }]
};






const info7 = {
  method: "post",
  path: "/match",
  pagesToBeUsedIn: ["HomePage"],
  // purpose: "to let users deselect sports allow bulk create",
  table: "post in MATCHES",
};
const body7 = {
  fromId: 1,
  toId: 2,
  superlike: 0,
  like_returned: 0,
};


const info7 = {
  method: "patch",
  path: "/match",
  pagesToBeUsedIn: ["HomePage"],
  purpose: "to return a like",
  table: "patch in MATCHES",
};
const body7 = {
  like_returned: 1,
};

const info7 = {
  method: "delete",
  path: "/match",
  pagesToBeUsedIn: ["MatchesPage"],
  purpose: "to unmatch",
  table: "delete in MATCHES",
};
const body7 = {
  id: 1,
};
