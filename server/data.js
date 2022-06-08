const { v4: uuidv4 } = require("uuid");

const data = [
    {   
        _id: "60d0fe4f5311236168a109ca",
        posts:[
            {  
                _id: uuidv4(),
                postAuthorId: "60d0fe4f5311236168a109ca",
                postAuthor: "Sara Anderson",
                timestamp: "2022-02-01T18:00",
                postTitle: "my day today",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                mood: "at ease",
                comments: [
                    {
                        _id: uuidv4(),
                        author: "60d0fe4f5311236168a109cd",
                        body: "that sounds so fun!"
                    }
                ],
                likedBy: ["60d0fe4f5311236168a109cd", "60d0fe4f5311236168a109d3"]
            },

            {   
                _id: uuidv4(),
                postAuthorId: "60d0fe4f5311236168a109ca",
                postAuthor: "Sara Anderson",
                timestamp: "2022-02-23T17:00",
                postTitle: "feeling blah",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                mood: "apathetic",
                comments: [],
                likedBy: ["60d0fe4f5311236168a109cd"]
            }
        ]
    },

    {   
        _id: "60d0fe4f5311236168a109cc",
        posts:[
            {  
                _id: uuidv4(),
                postAuthorId: "60d0fe4f5311236168a109cc",
                postAuthor: "Adina Barbosa",
                timestamp: "2022-05-23T21:33",
                postTitle: "Can anyone else relate to this?",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                mood: "sleepy",
                comments: [
                    {
                        _id: uuidv4(),
                        author: "60d0fe4f5311236168a109cd",
                        body: "i can relate!"
                    },
                    {
                        _id: uuidv4(),
                        author: "60d0fe4f5311236168a109d2",
                        body: "i had this happen to a friend once! hope you're ok"
                    }
                ],
                likedBy: ["60d0fe4f5311236168a109d2"]
            }
        ]
    },

    {   
        _id: "60d0fe4f5311236168a109cd",
        posts:[
            {  
                _id: uuidv4(),
                postAuthorId: "60d0fe4f5311236168a109cd",
                postAuthor: "Roberto Vega",
                timestamp: "2022-06-02T01:57",
                postTitle: "Another day, another dollar",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                mood: "tranquil",
                comments: [],
                likedBy: []
            },

            {  
                _id: uuidv4(),
                postAuthorId: "60d0fe4f5311236168a109cd",
                postAuthor: "Roberto Vega",
                timestamp: "2022-06-05T17:59",
                postTitle: "Not feeling so hot today...",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                mood: "drained",
                comments: [],
                likedBy: []
            },

            {  
                _id: uuidv4(),
                postAuthorId: "60d0fe4f5311236168a109cd",
                postAuthor: "Roberto Vega",
                timestamp: "2022-06-07T11:11",
                postTitle: "Finally some good news!",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                mood: "optimistic",
                comments: [],
                likedBy: ["60d0fe4f5311236168a109cc"]
            }
        ]
    },

    {   
        _id: "60d0fe4f5311236168a109d0",
        posts:[
            {  
                _id: uuidv4(),
                postAuthorId: "60d0fe4f5311236168a109d0",
                postAuthor: "Emre Asikoglu",
                timestamp: "2022-04-11T15:30",
                postTitle: "I got the job!!",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                mood: "esctatic",
                comments: [
                    {   
                        _id: uuidv4(),
                        author: "60d0fe4f5311236168a109d2",
                        body: "congrats friend!"
                    }
                ],
                likedBy: ["60d0fe4f5311236168a109d2", "60d0fe4f5311236168a109d3", "60d0fe4f5311236168a109cd"]
            },

            {   
                _id: uuidv4(),
                postAuthorId: "60d0fe4f5311236168a109d0",
                postAuthor: "Emre Asikoglu",
                timestamp: "2022-04-13T17:00",
                postTitle: "feeling nervous...",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                mood: "restless",
                comments: [],
                likedBy: []
            }
        ]
    },
    
    {   
        _id: "60d0fe4f5311236168a109d2",
        posts:[
            {  
                _id: uuidv4(),
                postAuthorId: "60d0fe4f5311236168a109d2",
                postAuthor: "Evan Carlson",
                timestamp: "2022-05-22T14:20",
                postTitle: "what the heck, i have no idea",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                mood: "stressed",
                comments: [],
                likedBy: []
            }
        ]
    },

    {   
        _id: "60d0fe4f5311236168a109d3",
        posts:[
            {  
                _id: uuidv4(),
                postAuthorId: "60d0fe4f5311236168a109d3",
                postAuthor: "Friedrich-Karl Brand",
                timestamp: "2022-06-07T12:10",
                postTitle: "My first post!",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                mood: "pleasant",
                comments: [],
                likedBy: ["60d0fe4f5311236168a109d2"]
            }
        ]
    },

    {   
        _id: "60d0fe4f5311236168a109cb",
        posts:[]
    },

    {   
        _id: "60d0fe4f5311236168a109ce",
        posts:[]
    },

    {   
        _id: "60d0fe4f5311236168a109cf",
        posts:[]
    },

    {   
        _id: "60d0fe4f5311236168a109d1",
        posts:[]
    }
]

module.exports = {
    data
}