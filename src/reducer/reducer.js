const initialTodos = {
    record:[{age: "12",
    city: "3",
    country: "100",
    email: "yasminjejani@gmail.com",
    firstName: "asu",
    lastName: "jejani",
    password: "12",
    state: "10"}]
};

const formRecordReducer = (state = initialTodos, action) => {
    // console.log("state", state, action)
    switch (action.type) {
        case 'add/addRecord':
            console.log("New redux state wil be:", { ...state, record: action.data });
           return { ...state, record: action.data };
        default:
            return state;
    }
}
export default formRecordReducer;