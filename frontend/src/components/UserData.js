import {Col, Container, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import LoadingBox from "./Loading";
import ErrorBox from "./Error";

export default function UserData() {

    const userDetails = useSelector(state => state.userDetails);
    const {loading: userLoading, error: userError, user} = userDetails;

    return (
      <>

          <h1>Dane Użytkownika</h1>
          <Container className="my-5">
              {userLoading && <LoadingBox/>}
              {userError && <ErrorBox variant="danger">{userError}</ErrorBox>}
              <Row>
                  <Col>
                      <h3>E-mail:</h3><p style={{fontSize: '1.4rem'}}>{user.email}</p>
                      <h3>Imię i Nazwisko:</h3><p style={{fontSize: '1.4rem'}}>{user.name} {user.surname}</p>
                  </Col>
                  <Col>
                      <h3 className="mb-4">Adres:</h3>
                      <p style={{fontSize: '1.4rem'}}><h5>Ulica i numer domu:</h5> {user.address}</p>
                      <p style={{fontSize: '1.4rem'}}><h5>Kod pocztowy i miasto:</h5>{user.zip}, {user.city}</p>
                      <p style={{fontSize: '1.4rem'}}><h5>Województwo:</h5> {user.state}</p>
                  </Col>
              </Row>



          </Container>

      </>
    );
}