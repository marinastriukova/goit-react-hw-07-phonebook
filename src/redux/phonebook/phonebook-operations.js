import axios from 'axios';
import actions from './phonebook-actions';

const {
    fetchItemsRequest,
    fetchItemsSuccess,
    fetchItemsError,
    addContactRequest,
    addContactSuccess,
    addContactError,
    deleteContactRequest,
    deleteContactSuccess,
    deleteContactError
} = actions;


// axios.defaults.baseURL = 'http://localhost:4040';


const fetchItems = () => async dispatch => {
    dispatch(fetchItemsRequest());

    // try {
    //     const {data} = await axios.get('http://localhost:4040/contacts');
    //     dispatch(fetchItemsSuccess(data));
    // } catch (error){
    //     dispatch(fetchItemsError(error))
    // }

    axios
        .get('http://localhost:4040/contacts')
        .then(({ data }) => dispatch(fetchItemsSuccess(data)))
        .catch(error => dispatch(fetchItemsError(error.message)));
}


const addContact = (name, number) => dispatch => {
    const item = {
        name,
        number
    };

    dispatch(addContactRequest());

    axios
        .post('http://localhost:4040/contacts', item)
        .then(({ data }) => dispatch(addContactSuccess(data)))
        .catch(error => dispatch(addContactError(error.message)))
};


const deleteContact = id => dispatch => {
    dispatch(deleteContactRequest());

    axios
        .delete(`http://localhost:4040/contacts/${id}`)
        .then(() => dispatch(deleteContactSuccess(id)))
        .catch(error => dispatch(deleteContactError(error.message)))
};


export default { fetchItems, addContact, deleteContact }
