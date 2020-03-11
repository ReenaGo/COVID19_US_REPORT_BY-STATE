const initialState = {
    data: []
}


const Reducer = (state=initialState, action)=>{
    const {type, payload} = action;

    switch(type){
        case "LOAD_DATA":
            console.log("*******")
            console.log(payload)
            return {
                data: [...payload]

            };
        default:
            return state

    }
}

export default Reducer;