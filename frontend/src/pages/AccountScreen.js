import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {detailsUser, updateUserProfile} from "../actions/userActions";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";
import LoadingBox from "../components/Loading";
import ErrorBox from "../components/Error";
import {Form} from "react-bootstrap";


export default function Account(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const {loading: userLoading, error: userError, user} = userDetails;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success: updateSuccess, error: updateError, loading: updateLoading} = userUpdateProfile;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch({type: USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Hasła muszą być takie same!');
        } else {
            dispatch(updateUserProfile({userId: user._id, name, email, password}));
        }
    }

    return (
        <div>
            {
                userLoading ? <LoadingBox/> : userError ? <ErrorBox variant="danger">{userError}</ErrorBox> : (
                    <div style={{marginTop: '20px'}}>
                        {updateLoading && <LoadingBox/>}

                            <Form onSubmit={submitHandler} action="/">
                                <h1>Profil Użytkownika</h1>
                                {updateError && <ErrorBox variant="danger">{updateError}</ErrorBox>}
                                {updateSuccess &&
                                <ErrorBox variant="success">Profil został pomyślnie zaktualizowany!</ErrorBox>}
                                <br/>
                                <Form.Label htmlFor='for'>Imię i Nazwisko</Form.Label>
                                <Form.Control type='text' id="name" placeholder="Wprowadź Imię i Nazwisko" value={name}
                                           onChange={e => setName(e.target.value)}/>
                                <Form.Label htmlFor='for'>Email</Form.Label>
                                <Form.Control type='text' id="email" placeholder="Wprowadź Email" value={email}
                                           onChange={e => setEmail(e.target.value)}/>
                                <h1>Zmiana hasła</h1><br/>
                                <Form.Label htmlFor='for'>Hasło</Form.Label>
                                <Form.Control type='password' id="password" placeholder="Wprowadź Hasło"
                                           onChange={e => setPassword(e.target.value)}/>
                                <Form.Label htmlFor='for'>Powtórz Hasło</Form.Label>
                                <Form.Control type='password' id="confirmPassword" placeholder="Powtórz Hasło"
                                           onChange={e => setConfirmPassword(e.target.value)}/>
                                <button type="submit">
                                    Edytuj Profil
                                </button>
                            </Form>

                    </div>
                )
            }
        </div>);
}