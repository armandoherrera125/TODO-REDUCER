export const reducer = (state = [], action) => {
    switch (action.type) {
        case 'add':
            return [...state, action.payload];
        case 'delete':
            return state.filter(findingIndex => findingIndex.id !== action.payload);
        case 'done':
            // return state.map( (value) => value.id === action.payload && !value.done);
            return state.map( (value)=>{
                if (value.id === action.payload) {
                    return {
                        ...value,
                        done: !value.done
                    }
                } else {
                    return value;
                }
            } );
        default:
            return state;
    }
}