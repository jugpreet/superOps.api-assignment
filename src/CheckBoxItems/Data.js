export const data = [
  {
    name: "Participants",
    id:1,
    parent:null,
    checked: false,
    property: [
      {
        id:2,
        name: "Name",
        property: [],
        checked: false,
        parent:1
      },
      {
        id:3,
        name: "country",
        property: [],
        checked: false,
        parent:1
      },
      {
        id:4,
        name: "languages",
        property: [],
        checked: false,
        parent:1
      },
    ],
  },
  {
    id:5,
    name: "GameOfChoice",
    checked: false,
    parent:null,
    property: [
      {id:6, name: "Game Name", property: [],checked: false, parent:5},
      { id:7,name: "Bought", property: [],checked: false, parent:5},
    ],
  },
  {
    id:8,
    name: "Performance",
    checked: false,
    parent:null,
    property: [
      {id:9,
        name: "Bank Balance",
        property: [],
        checked: false,
        parent:8
      },
      {
        id:10,
        name: "Extra Info",
        property: [],
        checked: false,
        parent:8
      },
    ],
  },
];



