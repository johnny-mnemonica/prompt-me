import styled from 'styled-components';

const NotFound = () => {

    return (
        <Wrapper>
            <Container>
                <Span>🕳️</Span>
                <Title>404 error! nothing to see here...</Title>
            </Container>
        </Wrapper>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
height: 100px;
justify-content: space-between;
margin-left: 225px;
margin-top: -225px;
`

const Title = styled.p`
font-size: 22px;
margin-left: 10px;
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

export default NotFound;