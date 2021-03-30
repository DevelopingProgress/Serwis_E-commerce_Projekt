import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {detailsUser} from "../actions/userActions";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";
import LoadingBox from "../components/Loading";
import ErrorBox from "../components/Error";
import {Col, Container, Row} from "react-bootstrap";
import UserData from "../components/UserData";
import UserChangeDetails from "../components/UserChangeDetailsModal";
import UserChangePassword from "../components/UserChangePassword";


export default function Account(props) {


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
        }
    }, [dispatch, userInfo._id, user]);


    return (
        <div style={{marginBottom: "11%"}}>
            {
                userLoading ? <LoadingBox/> : userError ? <ErrorBox variant="danger">{userError}</ErrorBox> : (
                    <Container style={{marginTop: '20px'}}>
                        <Row className="my-3">
                            <Col>
                                {updateLoading && <LoadingBox/>}
                                {updateError && <ErrorBox variant="danger">{updateError}</ErrorBox>}
                                <UserChangeDetails/>
                            </Col>
                            <Col>
                                {updateLoading && <LoadingBox/>}
                                {updateError && <ErrorBox variant="danger">{updateError}</ErrorBox>}
                                <UserChangePassword/>
                            </Col>
                        </Row>
                        <hr/>
                        <UserData/>
                    </Container>
                )
            }
        </div>);
}