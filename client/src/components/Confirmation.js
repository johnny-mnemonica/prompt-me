import { Link } from "react-router-dom";
import styled from 'styled-components';

const Confirmation = () => {

    return (
        <Wrapper>
            <Container>
                <Span>🙌 </Span>
                <Title>success! you made a new blog post</Title>
                <Link to='/home'>go back home</Link>
            </Container>
        </Wrapper>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
height: 150px;
justify-content: space-between;
margin-left: 225px;
margin-top: -225px;
`

const Title = styled.p`
font-size: 22px;
`

const Span = styled.span`
font-size: 80px;
`

const Wrapper = styled.div`
width: 100%;
min-height: calc(100vh - 50px);
display: flex;
align-items: center;
`

export default Confirmation;

